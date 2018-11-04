export interface SolarPanel {
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
    production: string;
    energy_source: EnergySource;
    title: string;
}

export interface EnergySource {
    type: string;
    render_no_power_icon: boolean;
    render_no_network_icon: boolean;
    usage_priority: string;
    connections: any[];
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
