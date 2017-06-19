import { Config } from '../models/Config.model';
export class ConfigService {
    constructor() {
    }
    get(): Promise<Config>{
        
        let promise = new Promise((resolve, reject) => {
            //respond with mock config data
            $.ajax({
                url: 'https://api.myjson.com/bins/hzxqf',//houses dummy data config for kiosk
                method: "GET",
                success: (data) => {
                    resolve(new Config(data))
                },
                error: (err) => {
                    reject(err)
                }
            });


        })
        return promise;
    }
}