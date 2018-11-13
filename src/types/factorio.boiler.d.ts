export interface Boiler {
    burner: Burner;
    burning_cooldown: number;
    corpse: string;
    energy_consumption: string;
    fast_replaceable_group?: string;
    flags: Flag[];
    flammability: number;
    healing_per_tick: number;
    icon: string;
    icon_size: number;
    max_health: number;
    minable: Minable;
    name: string;
    repair_speed_modifier: number;
    target_temperature: number;
    title: string;
    type: string;
}

export interface Burner {
    connections: Connection[];
    effectivity?: number;
    emissions?: number;
    fuel_category?: string;
    fuel_inventory_size?: number;
    input_priority?: string;
    max_temperature?: number;
    max_transfer?: string;
    pipe_covers?: PipeCovers;
    render_no_network_icon: boolean;
    render_no_power_icon: boolean;
    specific_heat?: string;
    type: string;
    usage_priority?: string;
}

export interface Connection {
    direction: number;
    position: number[];
}

export interface PipeCovers {
    east: East;
    north: East;
    south: East;
    west: East;
}

export interface East {
    filename: Filename;
    frame_count: number;
    height: number;
    hr_version?: East;
    line_length: number;
    priority: Priority;
    scale: number;
    width: number;
    x: number;
}

export enum Filename {
    BaseGraphicsEntityHeatExchangerHeatexEndingsPNG = "__base__/graphics/entity/heat-exchanger/heatex-endings.png",
    BaseGraphicsEntityHeatExchangerHrHeatexEndingsPNG = "__base__/graphics/entity/heat-exchanger/hr-heatex-endings.png",
}

export enum Priority {
    High = "high",
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
    PlayerCreation = "player-creation",
}

export interface Minable {
    hardness?: number;
    mining_time: number;
    result: string;
}
