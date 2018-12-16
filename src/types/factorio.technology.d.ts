import { PrototypeHasIcon } from "./factorio.prototype";

export interface Technology extends PrototypeHasIcon {
  effects: Effect[];
  enabled: boolean;
  level: number | null;
  max_level: null | string;
  prerequisites: string[];
  title: string;
  unit: Unit;
  upgrade: boolean;
}

export interface Effect {
  ammo_category: null | string;
  count: null;
  effect_description: null;
  item: null;
  modifier: boolean | number | null;
  recipe: null | string;
  turret_id: null | string;
  type: string;
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
  scale: null;
  shift: null;
  tint: null;
}

export interface Unit {
  count: number;
  count_formula: null | string;
  ingredients: Ingredient[];
  time: number;
}

export interface Ingredient {
  amount: number;
  amount_max: null;
  amount_min: null;
  name: string;
  probability: null;
  type: string;
}
