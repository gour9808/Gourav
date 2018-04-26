export namespace Vehicle {

    export interface Price {
        exShowroomPrice: number;
        currencySymbol: string;
    }

    export interface Dimensions {
        length: number;
        width: number;
        height: number;
        wheelbase: number;
        groundClearance: number;
        kerbWeight: number;
    }

    export interface Service {
        serviceNumber: number;
        distance: number;
        serviceType: string;
        jobs: any[];
        price: number;
    }

    export interface Capacity {
        doors: number;
        seating: number;
        seatingRows: number;
        bootspace: number;
        fuelTankCapacity: number;
    }

    export interface CompressionRatio {
        max: number;
        min: number;
    }

    export interface Charger {
        chargerType: string;
        configuration: string;
    }

    export interface MaxPower {
        bhp: number;
        rpm: number;
    }

    export interface MaxTorque {
        torque: number;
        rpm: number;
    }

    export interface Cylinder {
        numberOfCylinders: number;
        cylinderConfiguration: string;
    }

    export interface EngineTransmission {
        description: string;
        topSpeed: number;
        acceleration_0_to_100: number;
        compressionRatio: CompressionRatio;
        displacement: number;
        engineType: string;
        mileageARAI: number;
        charger: Charger;
        valve: number;
        cylinderConfiguration: string;
        bore: number;
        stroke: number;
        driveTrain: string;
        clutchType: string;
        dualClutch: boolean;
        sportsMode: boolean;
        alternateFuel: boolean;
        fuelType: string;
        fuelSystem: string;
        maxPower: MaxPower;
        maxTorque: MaxTorque;
        numberOfGears: number;
        cylinder: Cylinder;
        transmissionType: string;
        manualShiftingForAutomatic: boolean;
        drivingModes: any[];
        engineStartStopFunction: boolean;
    }

    export interface Suspension {
        frontSuspension: string;
        rearSuspension: string;
    }

    export interface Brakes {
        frontBrakeType: string;
        rearBrakeType: string;
    }

    export interface Steering {
        steeringType: string;
        minTurningRadius: number;
    }

    export interface FrontTyres {
        width: number;
        aspectRatio: number;
        diameter: number;
        radial: boolean;
    }

    export interface RearTypes {
        width: number;
        aspectRatio: number;
        diameter: number;
        radial: boolean;
    }

    export interface Wheel {
        suspension: Suspension;
        brakes: Brakes;
        steering: Steering;
        wheelType: string;
        frontTyres: FrontTyres;
        rearTypes: RearTypes;
    }

    export interface Safety {
        airbags: number;
        seatBeltWarning: boolean;
    }

    export interface LockSecurity {
        engineImmobilizer: boolean;
        centralLocking: boolean;
        speedSensingDoorLock: boolean;
        childSafetyLock: boolean;
    }

    export interface ComfortConvenience {
        airConditioner: boolean;
        PowerOutlets12V: boolean;
        steeringAdjustment: boolean;
        headLightOffReminder: boolean;
        ignitionKeyOffReminder: boolean;
        antiGlareMirrors: boolean;
        vanityMirrorsOnSunVisor: boolean;
        heater: boolean;
    }

    export interface SeatUpholstery {
        seatUpholstery: string;
        driverSeatAdjustment: boolean;
        headRest: boolean;
        frontPassangerSeatAdjustment: boolean;
        rearPassengerSeats: string;
        interiors: string;
        interiorColors: string;
        foldingRearSeat: boolean;
        adjustableHeadRest: boolean;
        cupHolders: boolean;
    }

    export interface DoorsWindowsMirrors {
        powerWindows: boolean;
        outsideRearViewMirrors: boolean;
        adjustableORVM: boolean;
        exteriorDoorHandles: boolean;
        interiorDoorHandles: boolean;
        doorPockets: boolean;
        bootLidOpener: boolean;
    }

    export interface Exterior {
        roofMountedAntenna: boolean;
        bodyColoredBumpers: boolean;
    }

    export interface Lighting {
        headLamps: string;
        automaticHeadlamp: boolean;
        tailLamps: string;
        cabinLamps: string;
        headLightHeightAdjuster: boolean;
        gloveBoxLamp: boolean;
        lightsOnVanityMirrors: boolean;
        dayLightRunninglight: boolean;
        fogLamps: boolean;
        rearReadingLamp: boolean;
        followMeHomeHeadLamps: boolean;
    }

    export interface Instrumentation {
        instrumentCluster: string;
        tripMeter: boolean;
        averageFuelConsumption: boolean;
        clock: string;
        lowFuelLevelWarning: boolean;
        doorAjarWarning: boolean;
        gearIndicator: boolean;
        shiftIndicator: boolean;
        headsUpDisplay: boolean;
        tachometer: string;
        instantaneousConsumption: boolean;
    }

    export interface ManufacturerWarranty {
        yearsOfWarranty: number;
        kmsOfWarranty: number;
    }

    export interface VehicleDetail {
        id: string;
        name: string;
        make: string;
        model: string;
        variant: string;
        bodyType: string;
        price: Price;
        dimensions: Dimensions;
        service: Service;
        capacity: Capacity;
        engineTransmission: EngineTransmission;
        wheel: Wheel;
        safety: Safety;
        lockSecurity: LockSecurity;
        comfortConvenience: ComfortConvenience;
        seatUpholstery: SeatUpholstery;
        doorsWindowsMirrors: DoorsWindowsMirrors;
        exterior: Exterior;
        lighting: Lighting;
        instrumentation: Instrumentation;
        manufacturerWarranty: ManufacturerWarranty;
        createTime: string;
        updateTime: string;
        createdBy: string;
        updatedBy: string;
        deleted: boolean;
    }

}

