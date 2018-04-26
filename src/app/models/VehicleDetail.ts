import { TestBed } from '@angular/core/testing';
export module Vehicle {

    class Serializable {
        fillFromJSON(json: any) {
            var jsonObj = json;
            for (var propName in jsonObj) {
                this[propName] = typeof jsonObj[propName] == 'object' ? this.fillFromJSON(jsonObj[propName]) : jsonObj[propName]
                this[propName] = jsonObj[propName]
            }
        }
    }

    enum EngineType {
        HYDROGEN, ELECTRICITY, LPG, PETROL_ETHANOL, FLEXI_FUEL, NG, DIESEL, PETROL
    }
    enum BodyType {
        HATCHBACK, SEDAN, MUV, SUV, TUV, LUV,
        SPORTS, MUSCLE, LUXURY, RACING,
        OFFROAD, SUPERCAR, COUPE,
        CONVERTIBLE, WAGON, VAN, JEEP,
        TRUCKS_TRUCK, CUSTOMIZABLE, TRUCKS_TIPPER, TRUCKS_TRAILER,
        TRACTOR_TRACTOR, TRUCKS_MINITRUCK, TRUCKS_PICKUP, CARAVAN_MOTORHOME,
        BUS_CLASSIC, BUS_MINIBUS, BUS_SINGLEDECK, BUS_DOUBLEDECK,
        BUS_ARTICULATEDBUS, BUS_LUXURYBUS, BUS_TOURERBUS, BUS_BUS,
        TWOWHEELER_STANDARD, TWOWHEELER_SPORTSBIKE, TWOWHEELER_SCOOTER, TWOWHEELER_OFFROAD,
        TWOWHEELER_CRUISER, TWOWHEELER_TOURING, TWOWHEELER_NAKED, TWOWHEELER_SPORTSTOURING,
        TWOWHEELER_DUALSPORTS, THREEWHEELER_OPEN, THREEWHEELER_CLOSED
    }

    enum ChargerType {
        SUPERCHARGER, TURBOCHARGER
    }

    enum DriveTrain {
        FRONTWHEELDRIVE, REARWHEELDRIVE, FOURWHEELDRIVE, ALLWHEELDRIVE, PARTTIMEALLWHEELDRIVE, OTHERS
    }

    enum InstrumentType {
        ANALOG, DIGITAL, HYBRID, NONE
    }

    enum ServiceType {
        FREE,
        PAID
    }

    enum TransmissionType {
        MANUAL, AUTOMATIC, CONTINOUS_VARIABLE, SEMI_AUTOMATIC, TRIP_TRONIC, DIRECT_SHIFT_GEARBOX
    }

    export class Price {
        exShowroomPrice: number;
        currencySymbol: string;
        constructor(data?: any) {
        }
    }

    export class Dimensions {
        length: number;
        width: number;
        height: number;
        wheelbase: number;
        groundClearance: number;
        kerbWeight: number;
        constructor(data?: any) {
        }
    }

    export class ServiceDetail {
        serviceNumber: number;
        distanceFrom: number;
        distanceTo: number;
        days: number;
        serviceType: ServiceType;
        jobs: any[];
        price: number;
        parts: Part[];
        constructor(data?: any) {
            this.parts = new Array<Part>();
        }
    }

    export class Capacity {
        doors: number;
        seating: number;
        seatingRows: number;
        bootspace: number;
        fuelTankCapacity: number;
        constructor(data?: any) {
        }
    }

    export class CompressionRatio {
        max: number;
        min: number;
        constructor(data?: any) {
        }
    }

    export class Charger {
        chargerType: ChargerType;
        configuration: string;
        constructor(data?: any) {
        }
    }

    export class MaxPower {
        bhp: number;
        rpm: number;
        constructor(data?: any) {
        }
    }

    export class MaxTorque {
        torque: number;
        rpm: number;
        constructor(data?: any) {
        }
    }

    export class Cylinder {
        numberOfCylinders: number;
        cylinderConfiguration: string;
        constructor(data?: any) {
        }
    }

    export class EngineTransmission {
        description: string;
        topSpeed: number;
        acceleration_0_to_100: number;
        compressionRatio: CompressionRatio;
        displacement: number;
        engineType: EngineType;
        mileageARAI: number;
        charger: Charger;
        valve: number;
        cylinderConfiguration: string;
        bore: number;
        stroke: number;
        driveTrain: DriveTrain;
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
        transmissionType: TransmissionType;
        manualShiftingForAutomatic: boolean;
        gradeabilityInPercent: number;
        emissionNorms: string;
        cruiseControl: boolean;
        drivingModes: any[];
        engineStartStopFunction: boolean;
        constructor(data?: any) {
            this.compressionRatio = new CompressionRatio();
            this.charger = new Charger();
            this.maxPower = new MaxPower();
            this.maxTorque = new MaxTorque();
            this.cylinder = new Cylinder();
        }
    }

    export class Suspension {
        frontSuspension: string;
        rearSuspension: string;
        constructor(data?: any) {
        }
    }

    export class Brakes {
        frontBrakeType: string;
        rearBrakeType: string;
        parkingBrakeType: string;
        hillHolder: boolean;

        constructor(data?: any) {
        }
    }

    export class Steering {
        steeringType: string;
        minTurningRadius: number;
        constructor(data?: any) {
        }
    }

    export class FrontTyres {
        width: number;
        aspectRatio: number;
        diameter: number;
        radial: boolean;
        constructor(data?: any) {
        }
    }

    export class Tyre {
        width: number;
        aspectRatio: number;
        diameter: number;
        radial: boolean;
        constructor(data?: any) {
        }
    }

    export class RearTypes {
        width: number;
        aspectRatio: number;
        diameter: number;
        radial: boolean;
        constructor(data?: any) {
        }
    }

    export class Wheel {
        suspension: Suspension;
        brakes: Brakes;
        steering: Steering;
        wheelType: string;
        frontTyres: Tyre;
        rearTypes: Tyre;

        constructor(data?: any) {
            this.suspension = new Suspension();
            this.brakes = new Brakes();
            this.steering = new Steering();
            this.frontTyres = new Tyre();
            this.rearTypes = new Tyre();
        }
    }

    export class Safety {
        airbags: number;
        seatBeltWarning: boolean;
        constructor(data?: any) {
        }
    }

    export class LockSecurity {
        engineImmobilizer: boolean;
        centralLocking: boolean;
        speedSensingDoorLock: boolean;
        childSafetyLock: boolean;
        constructor(data?: any) {
        }
    }

    export class ComfortConvenience {
        airConditioner: boolean;
        powerOutlets12V: boolean;
        steeringAdjustment: boolean;
        headLightOffReminder: boolean;
        ignitionKeyOffReminder: boolean;
        antiGlareMirrors: boolean;
        vanityMirrorsOnSunVisor: boolean;
        heater: boolean;
        constructor(data?: any) {
        }
    }

    export class SeatUpholstery {
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
        constructor(data?: any) {
        }
    }

    export class DoorsWindowsMirrors {
        powerWindows: boolean;
        outsideRearViewMirrors: boolean;
        adjustableORVM: boolean;
        exteriorDoorHandles: boolean;
        interiorDoorHandles: boolean;
        doorPockets: boolean;
        bootLidOpener: boolean;
        constructor(data?: any) {
        }
    }

    export class Exterior {
        roofMountedAntenna: boolean;
        bodyColoredBumpers: boolean;
        constructor(data?: any) {
        }
    }

    export class Lighting {
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
        constructor(data?: any) {
        }
    }

    export class Instrumentation {
        instrumentCluster: InstrumentType;
        tripMeter: boolean;
        averageFuelConsumption: boolean;
        clock: InstrumentType;
        lowFuelLevelWarning: boolean;
        doorAjarWarning: boolean;
        gearIndicator: boolean;
        shiftIndicator: boolean;
        headsUpDisplay: boolean;
        tachometer: InstrumentType;
        instantaneousConsumption: boolean;
        constructor(data?: any) {
        }
    }

    export class ManufacturerWarranty {
        yearsOfWarranty: number;
        kmsOfWarranty: number;
        constructor(data?: any) {
        }
    }

    export class EnergySystem {
        solarPanel: boolean;
        batteryCapacity: number;
        constructor(data?: any) {
        }

    }

    export class WaterCapacity {
        freshWaterCapacity: number;
        wasteWaterTankCapacity: number;
        constructor(data?: any) {
        }

    }

    export class Bed {
        length: number;
        width: number;
        height: number;
        constructor(data?: any) {
        }
    }


    export class SeatingArrangement {

        upholsteryFabrics: any[];
        occupantLimit: number;
        additionalSeats: number;
        numberOfFrontBeds: number;
        frontBed: Bed;
        numberOfRearBeds: number;
        rearBed: Bed;
        numberOfAdditionalBeds: number;
        constructor(data?: any) {
            this.frontBed = new Bed();
            this.rearBed = new Bed();
        }
    }

    export class BusFeatures {
        passengerDoors: number;
        sideWindows: boolean;
        emergencyExit: boolean;
        firstAidKit: boolean;
        hatrack: boolean;
        luggageBootSpaceAvailibility: boolean;
        luggageBootSpaceCapacity: number;
        constructor(data?: any) {
        }

    }

    export class Kitchen {
        refrigerator: boolean;
        microwave: boolean;
        extractorHood: boolean;
        constructor(data?: any) {
        }

    }

    export class Infotainment {
        musicSystem: String;
        numberOfSpeakers: number;
        auxCompatibility: boolean;
        mp3Playback: boolean;
        usbCompatibility: boolean;
        radio: boolean;
        dvdPlayback: boolean;
        cdPlayer: boolean;
        ipodCompatibility: boolean;
        tvCompartment: boolean;
        alarmSystem: boolean;
        constructor(data?: any) {
        }
    }

    export class CaravanInterior {
        numberOfBicycleHolders: number
        kitchen: Kitchen;
        infotinment: Infotainment;
        toiletVentilation: boolean;
        heatingSystemType: String;
        wallThickness: number;
        roofThickness: number;
        floorThickness: number;
        energySystem: EnergySystem;
        waterCapacity: WaterCapacity;
        seatingArrangement: SeatingArrangement;
        amenities: any[];
        floorType: String;
        constructor(data?: any) {
            this.energySystem = new EnergySystem();
            this.infotinment = new Infotainment();
            this.kitchen = new Kitchen();
            this.waterCapacity = new WaterCapacity();
            this.seatingArrangement = new SeatingArrangement();
        }
    }

    export class Axle {
        axleConfiguration: String;
        frontAxleType: String;
        rearAxleType: String;
        constructor(data?: any) {
        }
    }

    export class Cabin {
        cabinType: String;
        tiltableCabin: boolean;
        trailerCoupling: boolean;
        cabinetLighting: boolean;
        constructor(data?: any) {
        }
    }


    export class PartPrice {
        id: string;
        partId: string;
        price: number;
        labourcharges: number;
        createTime: string;
        constructor(data?: any) {
        }
    }

    export class Validity {
        validityInYears: number;
        validityInKms: number;
        constructor(data?: any) {
        }
    }

    export class Part {
        partName: string;
        partPrice: PartPrice;
        quantity: number;
        validity: Validity;
        partId: string;
        constructor(data?: any) {
            this.partPrice = new PartPrice();
            this.validity = new Validity();
        }
    }


    export class VehicleDetail {
        id: string;
        name: string;
        make: string;
        model: string;
        chassisType: string;
        countryCode: string;
        variant: string;
        bodyType: BodyType;
        colors: any[];
        price: Price;
        dimensions: Dimensions;
        serviceDetailList: ServiceDetail[];
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
        parts: Part[];
        createTime: string;
        updateTime: string;
        createdBy: string;
        updatedBy: string;
        deleted: boolean;
        axle: Axle;
        cabin: Cabin;
        caravanInteriors: CaravanInterior;
        busFeatures: BusFeatures;
        numberOfTyres: number;

        constructor() {
            this.price = new Price();
            this.dimensions = new Dimensions();
            this.serviceDetailList = new Array<ServiceDetail>();
            this.capacity = new Capacity();
            this.engineTransmission = new EngineTransmission();
            this.wheel = new Wheel();
            this.safety = new Safety();
            this.lockSecurity = new LockSecurity();
            this.comfortConvenience = new ComfortConvenience();
            this.seatUpholstery = new SeatUpholstery();
            this.doorsWindowsMirrors = new DoorsWindowsMirrors();
            this.exterior = new Exterior();
            this.lighting = new Lighting();
            this.instrumentation = new Instrumentation();
            this.manufacturerWarranty = new ManufacturerWarranty();
            this.parts = new Array<Part>();
            this.busFeatures = new BusFeatures();
            this.caravanInteriors = new CaravanInterior();
            this.axle = new Axle();
            this.cabin = new Cabin();


        }

        public jsonToData(data?: any) {
            this.price = new Price();
            this.dimensions = data.dimensions ? data.dimensions : new Dimensions();
            this.serviceDetailList = data.service ? data.service : new Array<ServiceDetail>();
            this.capacity = data.capacity ? data.capacity : new Capacity();
            this.engineTransmission = data.engineTransmission ? data.engineTransmission : new EngineTransmission();
            this.wheel = data.wheel ? data.wheel : new Wheel();
            this.safety = data.safety ? data.safety : new Safety();
            this.lockSecurity = data.lockSecurity ? data.lockSecurity : new LockSecurity();
            this.comfortConvenience = data.comfortConvenience ? data.comfortConvenience : new ComfortConvenience();
            this.seatUpholstery = data.seatUpholstery ? data.seatUpholstery : new SeatUpholstery();
            this.doorsWindowsMirrors = data.doorsWindowsMirrors ? data.doorsWindowsMirrors : new DoorsWindowsMirrors();
            this.exterior = data.exterior ? data.exterior : new Exterior();
            this.lighting = data.lighting ? data.lighting : new Lighting();
            this.instrumentation = data.instrumentation ? data.instrumentation : new Instrumentation();
            this.manufacturerWarranty = data.manufacturerWarranty ? data.manufacturerWarranty : new ManufacturerWarranty();
            this.parts = data.parts ? data.parts : new Array<Part>();
            this.busFeatures = data.busFeatures ? data.busFeatures : new BusFeatures();

            this.cabin = data.cabin ? data.cabin : new Cabin();

            this.axle = data.axle ? data.axle : new Axle();
            this.caravanInteriors = data.caravanInteriors ? data.caravanInteriors : new CaravanInterior();

        }
    }
}

