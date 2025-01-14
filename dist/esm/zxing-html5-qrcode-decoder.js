import * as ZXing from "../third_party/zxing-js.umd";
import { QrcodeResultFormat, Html5QrcodeSupportedFormats } from "./core";
var ZXingHtml5QrcodeDecoder = (function () {
    function ZXingHtml5QrcodeDecoder(requestedFormats, verbose, logger) {
        this.formatMap = new Map([
            [Html5QrcodeSupportedFormats.QR_CODE, ZXing.BarcodeFormat.QR_CODE],
            [Html5QrcodeSupportedFormats.AZTEC, ZXing.BarcodeFormat.AZTEC],
            [Html5QrcodeSupportedFormats.CODABAR, ZXing.BarcodeFormat.CODABAR],
            [Html5QrcodeSupportedFormats.CODE_39, ZXing.BarcodeFormat.CODE_39],
            [Html5QrcodeSupportedFormats.CODE_93, ZXing.BarcodeFormat.CODE_93],
            [
                Html5QrcodeSupportedFormats.CODE_128,
                ZXing.BarcodeFormat.CODE_128
            ],
            [
                Html5QrcodeSupportedFormats.DATA_MATRIX,
                ZXing.BarcodeFormat.DATA_MATRIX
            ],
            [
                Html5QrcodeSupportedFormats.MAXICODE,
                ZXing.BarcodeFormat.MAXICODE
            ],
            [Html5QrcodeSupportedFormats.ITF, ZXing.BarcodeFormat.ITF],
            [Html5QrcodeSupportedFormats.EAN_13, ZXing.BarcodeFormat.EAN_13],
            [Html5QrcodeSupportedFormats.EAN_8, ZXing.BarcodeFormat.EAN_8],
            [Html5QrcodeSupportedFormats.PDF_417, ZXing.BarcodeFormat.PDF_417],
            [Html5QrcodeSupportedFormats.RSS_14, ZXing.BarcodeFormat.RSS_14],
            [
                Html5QrcodeSupportedFormats.RSS_EXPANDED,
                ZXing.BarcodeFormat.RSS_EXPANDED
            ],
            [Html5QrcodeSupportedFormats.UPC_A, ZXing.BarcodeFormat.UPC_A],
            [Html5QrcodeSupportedFormats.UPC_E, ZXing.BarcodeFormat.UPC_E],
            [
                Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
                ZXing.BarcodeFormat.UPC_EAN_EXTENSION
            ]
        ]);
        this.reverseFormatMap = this.createReverseFormatMap();
        if (!ZXing) {
            throw "Use html5qrcode.min.js without edit, ZXing not found.";
        }
        this.verbose = verbose;
        this.logger = logger;
        var formats = this.createZXingFormats(requestedFormats);
        var hints = new Map();
        hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
        this.hints = hints;
    }
    ZXingHtml5QrcodeDecoder.prototype.decodeAsync = function (canvas) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                resolve(_this.decode(canvas));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    ZXingHtml5QrcodeDecoder.prototype.decode = function (canvas) {
        var zxingDecoder = new ZXing.MultiFormatReader(this.verbose, this.hints);
        var luminanceSource = new ZXing.HTMLCanvasElementLuminanceSource(canvas);
        var binaryBitmap = new ZXing.BinaryBitmap(new ZXing.HybridBinarizer(luminanceSource));
        var result = zxingDecoder.decode(binaryBitmap);
        return {
            text: result.text,
            format: QrcodeResultFormat.create(this.toHtml5QrcodeSupportedFormats(result.format))
        };
    };
    ZXingHtml5QrcodeDecoder.prototype.createReverseFormatMap = function () {
        var result = new Map();
        this.formatMap.forEach(function (value, key, _) {
            result.set(value, key);
        });
        return result;
    };
    ZXingHtml5QrcodeDecoder.prototype.toHtml5QrcodeSupportedFormats = function (zxingFormat) {
        if (!this.reverseFormatMap.has(zxingFormat)) {
            throw "reverseFormatMap doesn't have ".concat(zxingFormat);
        }
        return this.reverseFormatMap.get(zxingFormat);
    };
    ZXingHtml5QrcodeDecoder.prototype.createZXingFormats = function (requestedFormats) {
        var zxingFormats = [];
        for (var _i = 0, requestedFormats_1 = requestedFormats; _i < requestedFormats_1.length; _i++) {
            var requestedFormat = requestedFormats_1[_i];
            if (this.formatMap.has(requestedFormat)) {
                zxingFormats.push(this.formatMap.get(requestedFormat));
            }
            else {
                this.logger.logError("".concat(requestedFormat, " is not supported by")
                    + "ZXingHtml5QrcodeShim");
            }
        }
        return zxingFormats;
    };
    return ZXingHtml5QrcodeDecoder;
}());
export { ZXingHtml5QrcodeDecoder };
//# sourceMappingURL=zxing-html5-qrcode-decoder.js.map