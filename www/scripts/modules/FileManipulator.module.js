define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FileManipulator = (function () {
        function FileManipulator() {
            //cordova.file.applicationStorageDirectory - Root directory of the application's sandbox; on iOS & windows this location is read-only (but specific subdirectories [like /Documents on iOS or /localState on windows] are read-write). All data contained within is private to the app. (iOS, Android, BlackBerry 10, OSX)
            //console.log('files stored here:', cordova.file.dataDirectory);
            //console.log('root dir of the app:', cordova.file.applicationDirectory)
            //console.log(window.LocalFileSystem);
            //window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, fs => {
            //    console.log(fs.name)
            //    fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false },
            //        (fileEntry) => {
            //            //fileEntry.createWriter(writer => {
            //            //    console.log(writer)
            //            //}, err => {
            //            //    console.error(err)
            //            //    })
            //            fileEntry.file(file => {
            //                console.log(file)
            //            })
            //        });
            //});
            //let filename = "config.json";
            ////save a file
            //this.saveFile(filename)
            //setTimeout(() => {
            //    //console log the file once found
            //    console.log(this.getFile(filename));
            //}, 3000);
            this.setEventListeners();
        }
        FileManipulator.prototype.getFile = function (fileName) {
            var returnFile;
            //TODO: Research what gets returned with a file get request
            window.requestFileSystem(window.LocalFileSystem.PERSISTEN, 0, function (fs) {
                console.log(fs.root);
                fs.root.getFile(fileName, { create: false, exclusive: false }, function (fileEntry) {
                    console.log(fileEntry);
                    fileEntry.file(function (file) {
                        returnFile = file;
                    });
                });
            });
            return returnFile;
        };
        FileManipulator.prototype.saveFile = function (fileName) {
            var returnFile;
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function (fs) {
                console.log(fs.name);
                fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                    fileEntry.createWriter(function (writer) {
                        console.log(writer);
                    }, function (err) {
                        console.error(err);
                    });
                    fileEntry.file(function (file) {
                        returnFile = file;
                    });
                });
            });
            return returnFile;
        };
        FileManipulator.prototype.unzipFile = function () {
        };
        FileManipulator.prototype.setEventListeners = function () {
            document.getElementById("createFile").addEventListener("click", this.createFile);
            document.getElementById("writeFile").addEventListener("click", this.writeFile);
            document.getElementById("readFile").addEventListener("click", this.readFile);
            document.getElementById("removeFile").addEventListener("click", this.removeFile);
        };
        FileManipulator.prototype.createFile = function () {
            var _this = this;
            var type = window.TEMPORARY;
            var size = 5 * 1024 * 1024;
            alert("Clicked");
            window.requestFileSystem(type, size, function (fs) {
                alert("where're in fs");
                fs.root.getFile('log.txt', { create: true, exclusive: true }, function (fileEntry) {
                    alert('File creation successfull!');
                }, _this.handleError);
            }, function (err) {
                _this.handleError(err);
            });
        };
        FileManipulator.prototype.writeFile = function () {
            var type = window.TEMPORARY;
            var size = 5 * 1024 * 1024;
            window.requestFileSystem(type, size, function (fs) {
            }, function (err) {
            });
        };
        FileManipulator.prototype.readFile = function () {
        };
        FileManipulator.prototype.removeFile = function () {
        };
        FileManipulator.prototype.handleError = function (err) {
            alert(err);
        };
        return FileManipulator;
    }());
    exports.FileManipulator = FileManipulator;
});
//# sourceMappingURL=FileManipulator.module.js.map