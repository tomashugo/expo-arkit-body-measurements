"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMeasurement = startMeasurement;
exports.stopMeasurement = stopMeasurement;
exports.getMeasurements = getMeasurements;
exports.addMeasurementProgressListener = addMeasurementProgressListener;
exports.addMeasurementCompleteListener = addMeasurementCompleteListener;
const expo_modules_core_1 = require("expo-modules-core");
// Tentar carregar o módulo nativo com tratamento de erro
// O nome do módulo no Swift é "ExpoArkitBodyMeasurements" (sem "Module")
let ExpoArkitBodyMeasurementsModule = null;
try {
    ExpoArkitBodyMeasurementsModule = (0, expo_modules_core_1.requireNativeModule)("ExpoArkitBodyMeasurements");
}
catch (error) {
    console.warn("ExpoArkitBodyMeasurementsModule não está disponível:", error);
}
function startMeasurement() {
    if (!ExpoArkitBodyMeasurementsModule) {
        return Promise.reject(new Error("ExpoArkitBodyMeasurementsModule is not available"));
    }
    return ExpoArkitBodyMeasurementsModule.startMeasurement();
}
function stopMeasurement() {
    if (!ExpoArkitBodyMeasurementsModule) {
        return Promise.reject(new Error("ExpoArkitBodyMeasurementsModule is not available"));
    }
    return ExpoArkitBodyMeasurementsModule.stopMeasurement();
}
function getMeasurements() {
    if (!ExpoArkitBodyMeasurementsModule) {
        return Promise.resolve(null);
    }
    return ExpoArkitBodyMeasurementsModule.getMeasurements();
}
// Criar EventEmitter apenas se o módulo estiver disponível
const emitter = ExpoArkitBodyMeasurementsModule
    ? new expo_modules_core_1.EventEmitter(ExpoArkitBodyMeasurementsModule)
    : null;
function addMeasurementProgressListener(listener) {
    if (!emitter) {
        // Retornar um subscription vazio se o módulo não estiver disponível
        return { remove: () => { } };
    }
    return emitter.addListener("onMeasurementProgress", listener);
}
function addMeasurementCompleteListener(listener) {
    if (!emitter) {
        // Retornar um subscription vazio se o módulo não estiver disponível
        return { remove: () => { } };
    }
    return emitter.addListener("onMeasurementComplete", listener);
}
//# sourceMappingURL=ExpoArkitBodyMeasurements.js.map