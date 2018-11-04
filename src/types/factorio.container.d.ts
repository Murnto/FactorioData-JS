export interface Container {
    name: string;
    type: Type;
    icon: string;
    icon_size: number;
    minable?: Minable;
    fast_replaceable_group?: string;
    flags: Flag[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse?: string;
    inventory_size: number;
    title: string;
    order?: string;
    subgroup?: string;
    localised_name?: string[];
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
    PlaceablePlayer = "placeable-player",
    PlayerCreation = "player-creation",
}

export interface Minable {
    mining_time: number;
    result: string;
    count?: number;
    mining_particle?: string;
}

export enum Type {
    Container = "container",
}
