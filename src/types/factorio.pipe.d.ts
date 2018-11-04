export interface Pipe {
    name: string;
    type: FastReplaceableGroup;
    icon: string;
    icon_size: number;
    minable: Minable;
    fast_replaceable_group: FastReplaceableGroup;
    flags: Flag[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse: Corpse;
    fluid_box: FluidBox;
    title: string;
}

export interface PipeToGround extends Pipe {
}

export enum Corpse {
    SmallRemnants = "small-remnants",
}

export enum FastReplaceableGroup {
    Pipe = "pipe",
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
    PlayerCreation = "player-creation",
}

export interface FluidBox {
    base_area: number;
    pipe_connections: PipeConnection[];
}

export interface PipeConnection {
    position: number[];
    max_underground_distance?: number;
}

export interface Minable {
    mining_time: number;
    hardness: number;
    result: string;
}
