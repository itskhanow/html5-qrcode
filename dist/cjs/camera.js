"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraManager = void 0;
var CameraManager = (function () {
    function CameraManager() {
    }
    CameraManager.hasCameraPermissions = function () {
        if (window.Fatdeck &&
            window.Capacitor &&
            window.Fatdeck.ClientStore.nativeContext &&
            window.Capacitor.getPlatform() === "android") {
            return new Promise(function (resolve, _) {
                window.Fatdeck.ClientStore.enumerateDevices().then(function (devices) {
                    if (devices.length > 0) {
                        resolve(true);
                    }
                });
            });
        }
        else {
            return new Promise(function (resolve, _) {
                navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    devices.forEach(function (device) {
                        if (device.kind === "videoinput" && device.label) {
                            resolve(true);
                        }
                    });
                    resolve(false);
                });
            });
        }
    };
    return CameraManager;
}());
exports.CameraManager = CameraManager;
//# sourceMappingURL=camera.js.map