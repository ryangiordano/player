define(["require", "exports", "../models/Config.model"], function (require, exports, Config_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfigService = (function () {
        function ConfigService() {
        }
        ConfigService.prototype.get = function () {
            var promise = new Promise(function (resolve, reject) {
                //respond with mock config data
                $.ajax({
                    url: 'https://api.myjson.com/bins/hzxqf',
                    method: "GET",
                    success: function (data) {
                        resolve(new Config_model_1.Config(data));
                    },
                    error: function (err) {
                        reject(err);
                    }
                });
            });
            return promise;
        };
        return ConfigService;
    }());
    exports.ConfigService = ConfigService;
});
//# sourceMappingURL=Config.service.js.map