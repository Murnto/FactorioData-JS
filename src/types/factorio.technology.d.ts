import {PrototypeHasIcon} from "./factorio.prototype";

export interface Technology extends PrototypeHasIcon {
    unit: Unit;
    effects: Effect[];
    upgrade: boolean;
    prerequisites: string[];
    max_level: null | string;
    level: number | null;
    enabled: boolean;
    title: string;
}

export interface Effect {
    type: string;
    modifier: boolean | number | null;
    ammo_category: null | string;
    item: null;
    count: null;
    turret_id: null | string;
    recipe: null | string;
    effect_description: null;
}

// export enum EffectType {
//     AmmoDamage = "ammo-damage",
//     ArtilleryRange = "artillery-range",
//     AutoCharacterLogisticTrashSlots = "auto-character-logistic-trash-slots",
//     CharacterInventorySlotsBonus = "character-inventory-slots-bonus",
//     CharacterLogisticSlots = "character-logistic-slots",
//     CharacterLogisticTrashSlots = "character-logistic-trash-slots",
//     GhostTimeToLive = "ghost-time-to-live",
//     GunSpeed = "gun-speed",
//     InserterStackSizeBonus = "inserter-stack-size-bonus",
//     LaboratorySpeed = "laboratory-speed",
//     MaximumFollowingRobotsCount = "maximum-following-robots-count",
//     MiningDrillProductivityBonus = "mining-drill-productivity-bonus",
//     QuickBarCount = "quick-bar-count",
//     StackInserterCapacityBonus = "stack-inserter-capacity-bonus",
//     TrainBrakingForceBonus = "train-braking-force-bonus",
//     TurretAttack = "turret-attack",
//     UnlockRecipe = "unlock-recipe",
//     WorkerRobotSpeed = "worker-robot-speed",
//     WorkerRobotStorage = "worker-robot-storage",
// }

export interface Icon {
    icon: string;
    tint: null;
    scale: null;
    shift: null;
}

export interface Unit {
    count: number;
    time: number;
    ingredients: Ingredient[];
    count_formula: null | string;
}

export interface Ingredient {
    type: string;
    name: string;
    amount: number;
    amount_min: null;
    amount_max: null;
    probability: null;
}
