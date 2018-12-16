export interface Pipe {
  corpse: Corpse;
  fast_replaceable_group: FastReplaceableGroup;
  flags: Flag[];
  flammability: number;
  fluid_box: FluidBox;
  healing_per_tick: number;
  icon: string;
  icon_size: number;
  max_health: number;
  minable: Minable;
  name: string;
  repair_speed_modifier: number;
  title: string;
  type: FastReplaceableGroup;
}

export interface PipeToGround extends Pipe {}

export enum Corpse {
  SmallRemnants = "small-remnants"
}

export enum FastReplaceableGroup {
  Pipe = "pipe"
}

export enum Flag {
  PlaceableNeutral = "placeable-neutral",
  PlayerCreation = "player-creation"
}

export interface FluidBox {
  base_area: number;
  pipe_connections: PipeConnection[];
}

export interface PipeConnection {
  max_underground_distance?: number;
  position: number[];
}

export interface Minable {
  hardness: number;
  mining_time: number;
  result: string;
}
