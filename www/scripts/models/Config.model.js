define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Config = (function () {
        function Config(_a) {
            var projectName = _a.projectName, projectId = _a.projectId, projectVersion = _a.projectVersion;
            this.projectName = projectName;
            this.projectId = projectId;
            this.projectVersion = projectVersion;
        }
        return Config;
    }());
    exports.Config = Config;
});
//# sourceMappingURL=Config.model.js.map