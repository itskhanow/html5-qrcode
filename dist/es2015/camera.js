export class CameraManager {
    static hasCameraPermissions() {
        if (window.Fatdeck &&
            window.Capacitor &&
            window.Fatdeck.ClientStore.nativeContext &&
            window.Capacitor.getPlatform() === "android") {
            return new Promise((resolve, _) => {
                window.Fatdeck.ClientStore.enumerateDevices().then((devices) => {
                    if (devices.length > 0) {
                        resolve(true);
                    }
                });
            });
        }
        else {
            return new Promise((resolve, _) => {
                navigator.mediaDevices.enumerateDevices().then((devices) => {
                    devices.forEach((device) => {
                        if (device.kind === "videoinput" && device.label) {
                            resolve(true);
                        }
                    });
                    resolve(false);
                });
            });
        }
    }
}
//# sourceMappingURL=camera.js.map