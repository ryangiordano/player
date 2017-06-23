var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
            this.fileNameEl = document.getElementById('file-name');
            this.fileContentEl = document.getElementById('text-area');
            //setTimeout(() => {
            //    //console log the file once found
            //    console.log(this.getFile(filename));
            //}, 3000);
            this.setEventListeners();
        }
        FileManipulator.prototype.setEventListeners = function () {
            var _this = this;
            document.getElementById("createFile").addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var fileName, fileContent;
                return __generator(this, function (_a) {
                    fileName = this.fileNameEl.value;
                    fileContent = this.fileContentEl.value;
                    this.createFile(fileName, fileContent);
                    return [2 /*return*/];
                });
            }); });
            //document.getElementById("writeFile").addEventListener("click", async () => {
            //    let fileName = this.fileNameEl.value;
            //    let fileContent = this.fileContentEl.value;
            //    this.writeFile(fileName, fileContent);
            //});
            //document.getElementById("readFile").addEventListener("click", async () => {
            //    let fileName = this.fileNameEl.value;
            //    this.readFile(fileName);
            //});
            document.getElementById("removeFile").addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var fileName;
                return __generator(this, function (_a) {
                    fileName = this.fileNameEl.value;
                    this.removeFile(fileName);
                    return [2 /*return*/];
                });
            }); });
        };
        FileManipulator.prototype.createFile = function (fileName, fileContent) {
            var _this = this;
            var type = window.PERSISTENT;
            var size = 5 * 1024 * 1024;
            var limit = 3;
            return new Promise(function (resolve, reject) {
                if (fileName.length < limit) {
                    var err = "File names must be at least " + limit + " characters long";
                    reject(err);
                }
                window.requestFileSystem(type, size, function (fs) {
                    //cordova.file.externalDataDirectory
                    fs.root.getFile(fileName + '.txt', { create: true, exclusive: false }, function (fileEntry) {
                        console.log("The full path of the file entry:", fileEntry.fullPath);
                        _this.writeFile(fileEntry, fileContent);
                    }, function (err) { return reject(err); });
                }, function (err) { return reject(err); });
            });
        };
        FileManipulator.prototype.writeFile = function (fileEntry, content) {
            var _this = this;
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function () {
                    alert("Successful file write...");
                    _this.readFile(fileEntry);
                };
                fileWriter.onerror = function (err) { return _this.handleError; };
                var dataObj = new Blob([content], { type: 'text/plain' });
                fileWriter.write(dataObj);
            });
        };
        FileManipulator.prototype.readFile = function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    $('#found-file-name').html(fileEntry.fullPath);
                    $('#found-file-content').html(reader.result);
                };
                reader.readAsText(file);
            });
        };
        FileManipulator.prototype.removeFile = function (fileName) {
            var type = window.PERSISTENT;
            var size = 5 * 1024 * 1024;
            return new Promise(function (resolve, reject) {
                window.requestFileSystem(type, size, function (fs) {
                    fs.root.getFile(cordova.file.externalDataDirectory + fileName, { create: true, exclusive: false }, function (fileEntry) {
                        fileEntry.remove(function () {
                            alert("file removed");
                        }, function (err) { return reject(err); });
                    }, function (err) { return reject(err); });
                }, function (err) { return reject(err); });
            });
        };
        FileManipulator.prototype.handleError = function (err) {
            alert(err);
        };
        return FileManipulator;
    }());
    exports.FileManipulator = FileManipulator;
});
//# sourceMappingURL=FileManipulator.module.js.map