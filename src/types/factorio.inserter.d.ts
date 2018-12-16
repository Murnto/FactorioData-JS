export interface Inserter {
  allow_custom_vectors: boolean;
  corpse: Corpse;
  energy_per_movement: number;
  energy_per_rotation: number;
  energy_source: EnergySource;
  extension_speed: number;
  fast_replaceable_group: FastReplaceableGroup;
  flags: Flag[];
  flammability: number;
  hand_size: number;
  healing_per_tick: number;
  icon: string;
  icon_size: number;
  max_health: number;
  minable: Minable;
  name: string;
  repair_speed_modifier: number;
  rotation_speed: number;
  title: string;
  type: InserterType;
}

export enum Corpse {
  SmallRemnants = "small-remnants"
}

export interface EnergySource {
  connections: any[];
  drain?: string;
  effectivity?: number;
  fuel_category?: string;
  fuel_inventory_size?: number;
  render_no_network_icon: boolean;
  render_no_power_icon: boolean;
  type: EnergySourceType;
  usage_priority?: UsagePriority;
}

export enum EnergySourceType {
  Burner = "burner",
  Electric = "electric"
}

export enum UsagePriority {
  SecondaryInput = "secondary-input"
}

export enum FastReplaceableGroup {
  Inserter = "inserter",
  LongHandedInserter = "long-handed-inserter"
}

export enum Flag {
  PlaceableNeutral = "placeable-neutral",
  PlaceablePlayer = "placeable-player",
  PlayerCreation = "player-creation"
}

export interface Minable {
  hardness: number;
  mining_time: number;
  result: string;
}

export enum InserterType {
  Inserter = "inserter"
}
