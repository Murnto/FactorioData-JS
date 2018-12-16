export interface TransportBelt {
  corpse: string;
  fast_replaceable_group: string;
  flags: Flag[];
  flammability: number;
  healing_per_tick: number;
  icon: string;
  icon_size: number;
  max_health: number;
  minable: Minable;
  name: string;
  repair_speed_modifier: number;
  speed: number;
  title: string;
  type: string;
}

export enum Flag {
  PlaceableNeutral = "placeable-neutral",
  PlayerCreation = "player-creation"
}

export interface Minable {
  hardness: number;
  mining_time: number;
  result: string;
}
