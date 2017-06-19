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
        let filename = "config.json";
        //save a file
        this.saveFile(filename)

        setTimeout(() => {
            //console log the file once found
            console.log(this.getFile(filename));
        }, 3000);
    }

    getFile(fileName: string): File {

        let returnFile: File;
        //TODO: Research what gets returned with a file get request
        window.requestFileSystem(window.LocalFileSystem.PERSISTEN, 0, fs => {
            console.log(fs.root)
            fs.root.getFile(fileName, { create: false, exclusive: false },
                (fileEntry) => {
                    console.log(fileEntry)
                    fileEntry.file(file => {
                        returnFile = file;
                    })
                })
        });
        return returnFile;
    }
    saveFile(fileName: string): File {
        let returnFile:File;
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, fs => {
            console.log(fs.name)
            fs.root.getFile(fileName, { create: true, exclusive: false },
                (fileEntry) => {
                    fileEntry.createWriter(writer => {
                        console.log(writer)
                    }, err => {
                        console.error(err)
                    })
                    fileEntry.file(file => {
                        returnFile = file;
                    })
                });
        });
        return returnFile;
    }
    unzipFile() {
    }
}