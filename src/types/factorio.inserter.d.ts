export interface Inserter {
    name: string;
    type: InserterType;
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
    rotation_speed: number;
    extension_speed: number;
    allow_custom_vectors: boolean;
    energy_source: EnergySource;
    energy_per_movement: number;
    energy_per_rotation: number;
    hand_size: number;
    title: string;
}

export enum Corpse {
    SmallRemnants = "small-remnants",
}

export interface EnergySource {
    type: EnergySourceType;
    render_no_power_icon: boolean;
    render_no_network_icon: boolean;
    usage_priority?: UsagePriority;
    drain?: string;
    connections: any[];
    fuel_inventory_size?: number;
    effectivity?: number;
    fuel_category?: string;
}

export enum EnergySourceType {
    Burner = "burner",
    Electric = "electric",
}

export enum UsagePriority {
    SecondaryInput = "secondary-input",
}

export enum FastReplaceableGroup {
    Inserter = "inserter",
    LongHandedInserter = "long-handed-inserter",
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
    PlaceablePlayer = "placeable-player",
    PlayerCreation = "player-creation",
}

export interface Minable {
    mining_time: number;
    hardness: number;
    result: string;
}

export enum InserterType {
    Inserter = "inserter",
}
