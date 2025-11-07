import { EventSubscription } from "expo-modules-core";
export interface BodyMeasurements {
    shoulderToShoulder: number;
    waist: number;
    shirtLength: number;
}
export interface MeasurementProgress {
    step: "shoulder" | "waist" | "shirtLength";
    progress: number;
}
export declare function startMeasurement(): Promise<void>;
export declare function stopMeasurement(): Promise<void>;
export declare function getMeasurements(): Promise<BodyMeasurements | null>;
export declare function addMeasurementProgressListener(listener: (event: MeasurementProgress) => void): EventSubscription;
export declare function addMeasurementCompleteListener(listener: (event: {
    measurements: BodyMeasurements;
}) => void): EventSubscription;
//# sourceMappingURL=ExpoArkitBodyMeasurements.d.ts.map