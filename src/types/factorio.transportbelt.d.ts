export interface TransportBelt {
    name: string;
    type: string;
    icon: string;
    icon_size: number;
    minable: Minable;
    fast_replaceable_group: string;
    flags: Flag[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse: string;
    speed: number;
    title: string;
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
    PlayerCreation = "player-creation",
}

export interface Minable {
    mining_time: number;
    hardness: number;
    result: string;
}
