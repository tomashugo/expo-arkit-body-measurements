import {
  EventEmitter,
  EventSubscription,
  requireNativeModule,
} from "expo-modules-core";

// Tentar carregar o módulo nativo com tratamento de erro
// O nome do módulo no Swift é "ExpoArkitBodyMeasurements" (sem "Module")
let ExpoArkitBodyMeasurementsModule: any = null;
try {
  ExpoArkitBodyMeasurementsModule = requireNativeModule(
    "ExpoArkitBodyMeasurements"
  );
} catch (error) {
  console.warn("ExpoArkitBodyMeasurementsModule não está disponível:", error);
}

export interface BodyMeasurements {
  shoulderToShoulder: number; // cm
  waist: number; // cm
  shirtLength: number; // cm
}

export interface MeasurementProgress {
  step: "shoulder" | "waist" | "shirtLength";
  progress: number; // 0-100
}

export function startMeasurement(): Promise<void> {
  if (!ExpoArkitBodyMeasurementsModule) {
    return Promise.reject(
      new Error("ExpoArkitBodyMeasurementsModule is not available")
    );
  }
  return ExpoArkitBodyMeasurementsModule.startMeasurement();
}

export function stopMeasurement(): Promise<void> {
  if (!ExpoArkitBodyMeasurementsModule) {
    return Promise.reject(
      new Error("ExpoArkitBodyMeasurementsModule is not available")
    );
  }
  return ExpoArkitBodyMeasurementsModule.stopMeasurement();
}

export function getMeasurements(): Promise<BodyMeasurements | null> {
  if (!ExpoArkitBodyMeasurementsModule) {
    return Promise.resolve(null);
  }
  return ExpoArkitBodyMeasurementsModule.getMeasurements();
}

// Criar EventEmitter apenas se o módulo estiver disponível
const emitter = ExpoArkitBodyMeasurementsModule
  ? new EventEmitter(ExpoArkitBodyMeasurementsModule as any)
  : null;

export function addMeasurementProgressListener(
  listener: (event: MeasurementProgress) => void
): EventSubscription {
  if (!emitter) {
    // Retornar um subscription vazio se o módulo não estiver disponível
    return { remove: () => {} } as EventSubscription;
  }
  return (emitter as any).addListener("onMeasurementProgress", listener);
}

export function addMeasurementCompleteListener(
  listener: (event: { measurements: BodyMeasurements }) => void
): EventSubscription {
  if (!emitter) {
    // Retornar um subscription vazio se o módulo não estiver disponível
    return { remove: () => {} } as EventSubscription;
  }
  return (emitter as any).addListener("onMeasurementComplete", listener);
}
