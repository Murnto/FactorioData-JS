export interface Container {
  corpse?: string;
  fast_replaceable_group?: string;
  flags: Flag[];
  flammability: number;
  healing_per_tick: number;
  icon: string;
  icon_size: number;
  inventory_size: number;
  localised_name?: string[];
  max_health: number;
  minable?: Minable;
  name: string;
  order?: string;
  repair_speed_modifier: number;
  subgroup?: string;
  title: string;
  type: Type;
}

export enum Flag {
  PlaceableNeutral = "placeable-neutral",
  PlaceablePlayer = "placeable-player",
  PlayerCreation = "player-creation"
}

export interface Minable {
  count?: number;
  mining_particle?: string;
  mining_time: number;
  result: string;
}

export enum Type {
  Container = "container"
}
