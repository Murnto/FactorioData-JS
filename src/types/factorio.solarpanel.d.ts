export interface SolarPanel {
    corpse: string;
    energy_source: EnergySource;
    fast_replaceable_group: string;
    flags: Flag[];
    flammability: number;
    healing_per_tick: number;
    icon: string;
    icon_size: number;
    max_health: number;
    minable: Minable;
    name: string;
    production: string;
    repair_speed_modifier: number;
    title: string;
    type: string;
}

export interface EnergySource {
    connections: any[];
    render_no_network_icon: boolean;
    render_no_power_icon: boolean;
    type: string;
    usage_priority: string;
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
    PlaceablePlayer = "placeable-player",
    PlayerCreation = "player-creation",
}

export interface Minable {
    hardness: number;
    mining_time: number;
    result: string;
}
