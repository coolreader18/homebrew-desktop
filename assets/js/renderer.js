document.querySelector("body").addEventListener("load", function(event) {
  require("electron")
    .remote.getCurrentWindow()
    .show();
  console.log("load");
});
angular
  .module("homebrew-desktop", ["ngMaterial", "ngSanitize"])
  .controller("main", async function($scope, $mdDialog) {
    var repo = "http://wiiubru.com/appstore",
      remote = require("electron").remote,
      configPath = `${remote
        .require("electron")
        .app.getPath("userData")}/config.json`;
    Object.assign($scope, {
      repo,
      config: {},
      async getHomebrew(i) {
        var app = this.directory.apps[i],
          dir = `${this.config.dir}/wiiu/apps/${app.directory}`,
          repoDir = `${repo}/apps/${app.directory}`,
          getFiles = (...files) => {
            files.forEach(fileName => {
              fetch(`${repoDir}/${fileName}`)
                .then(async res => new Uint8Array(await res.arrayBuffer()))
                .then(file => {
                  fs.writeFile(`${dir}/${fileName}`, file, console.error);
                });
            });
          };
        fs.mkdirpSync(dir);
        getFiles(app.binary, "icon.png", "meta.xml");
      },
      openInfo(id) {
        var elem = document.querySelector(`#app${id}`).parentElement,
          info = $scope.directory.apps[id];
        $mdDialog.show({
          templateUrl: "info-template.html",
          openFrom: elem,
          closeTo: elem,
          controller($scope, $sanitize) {
            Object.assign($scope, { info });
          },
          clickOutsideToClose: true
        });
      },
      folderSelect() {
        remote.require("electron").dialog.showOpenDialog(
          remote.getCurrentWindow(),
          {
            properties: ["openDirectory"]
          },
          dir => {
            if (dir) {
              let isDir;
              try {
                isDir = fs.isDirectorySync(`${dir[0]}/wiiu`);
              } catch (err) {
                if (err.code == "ENOENT") {
                  isDir = false;
                }
              }
              if (!isDir) {
                if (
                  confirm(
                    "No wiiu directory detected, this will create one. Is that ok?"
                  )
                ) {
                  try {
                    fs.mkdirpSync(`${dir}/wiiu/`);
                  } catch (err) {
                    alert("An error occurred");
                    remote.app.quit();
                  }
                } else {
                  alert("Please choose a directory with a wiiu subdirectory.");
                  this.folderSelect();
                  return;
                }
              }
              $scope.config.dir = dir[0];
              $scope.init = false;
              $scope.$apply();
            } else {
              alert("Please choose a directory");
              this.folderSelect();
            }
          }
        );
      },
      init: null
    });
    try {
      $scope.config = jsonfile.readFileSync(configPath);
    } catch (err) {
      if (err.code == "ENOENT") {
        jsonfile.writeFileSync(configPath, $scope.config, {
          spaces: 2,
          EOL: "\r\n"
        });
      }
    }
    if ($scope.config.dir) {
      $scope.init = false;
    } else {
      $scope.init = true;
    }
    $scope.$watch(
      "config",
      newConfig => {
        jsonfile.writeFileSync(configPath, newConfig);
      },
      true
    );
    fetch(`${repo}/directory.json`)
      .then(res => res.json())
      .then(json => {
        $scope.directory = json;
        $scope.$apply();
        json.apps.forEach((app, i) => {
          fetch(`${repo}/apps/${app.directory}/meta.xml`)
            .then(res => res.text())
            .then(xml =>
              new DOMParser().parseFromString(xml, "application/xml")
            )
            .then(doc =>
              Array.from(doc.firstElementChild.children).reduce(
                (obj, cur) =>
                  Object.assign(obj, { [cur.nodeName]: cur.textContent }),
                {}
              )
            )
            .then(meta => {
              Object.assign(meta, {
                long_description_br: meta.long_description.replace(
                  /\n/g,
                  "<br>"
                )
              });
              Object.assign($scope.directory.apps[i], {
                meta,
                install() {
                  $scope.getHomebrew(i);
                },
                openUrl() {
                  shell.openExternal(meta.url);
                }
              });
            });
        });
      });
  });
