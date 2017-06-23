export class FileManipulator {
    constructor() {
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
    public fileNameEl: HTMLInputElement = (<HTMLInputElement>document.getElementById('file-name'));
    public fileContentEl: HTMLInputElement = (<HTMLInputElement>document.getElementById('text-area'));

    setEventListeners() {
        document.getElementById("createFile").addEventListener("click", async () => {
            let fileName = this.fileNameEl.value;
            let fileContent = this.fileContentEl.value;
            this.createFile(fileName, fileContent);
        });
        //document.getElementById("writeFile").addEventListener("click", async () => {
        //    let fileName = this.fileNameEl.value;
        //    let fileContent = this.fileContentEl.value;
        //    this.writeFile(fileName, fileContent);
        //});
        //document.getElementById("readFile").addEventListener("click", async () => {
        //    let fileName = this.fileNameEl.value;
        //    this.readFile(fileName);
        //});
        document.getElementById("removeFile").addEventListener("click", async () => {
            let fileName = this.fileNameEl.value;
            this.removeFile(fileName);
        });
    }
    createFile(fileName: string, fileContent: string): Promise<any> {
        let type = window.PERSISTENT;
        let size = 5 * 1024 * 1024;
        let limit = 3;
        return new Promise((resolve, reject) => {
            if (fileName.length < limit) {
                let err = `File names must be at least ${limit} characters long`;
                reject(err);
            }
            window.requestFileSystem(type, size,
                (fs) => {
                    //cordova.file.externalDataDirectory
                    fs.root.getFile(fileName+'.txt',
                        { create: true, exclusive: false },
                        (fileEntry) => {
                            console.log("The full path of the file entry:", fileEntry.fullPath);
                            this.writeFile(fileEntry, fileContent);
                        }, err => reject(err))
                }, err => reject(err));
        });
    }
    writeFile(fileEntry: FileEntry, content: string) {
        fileEntry.createWriter(fileWriter => {
            fileWriter.onwriteend = () => {
                alert("Successful file write...");
                this.readFile(fileEntry)
            }

            fileWriter.onerror = err => this.handleError;
            let dataObj = new Blob([content], { type: 'text/plain' });

            fileWriter.write(dataObj);
        });
    }
    readFile(fileEntry: FileEntry) {
        fileEntry.file(file => {
            let reader = new FileReader();
            reader.onloadend = () => {
                $('#found-file-name').html(fileEntry.fullPath);
                $('#found-file-content').html(reader.result);
            }
            reader.readAsText(file);
        })
    }
    removeFile(fileName: string) {
        let type = window.PERSISTENT;
        let size = 5 * 1024 * 1024;
        return new Promise((resolve, reject) => {
            window.requestFileSystem(type, size,
                (fs) => {
                    fs.root.getFile(cordova.file.externalDataDirectory + fileName,
                        { create: true, exclusive: false },
                        (fileEntry) => {
                            fileEntry.remove(() => {
                                alert("file removed");
                            }, err => reject(err))
                        }, err => reject(err))
                }, err => reject(err));
        });
    }
    handleError(err) {
        alert(err);
    }
}