export interface Boiler {
    name: string;
    type: string;
    icon: string;
    icon_size: number;
    minable: Minable;
    fast_replaceable_group?: string;
    flags: Flag[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse: string;
    target_temperature: number;
    burning_cooldown: number;
    energy_consumption: string;
    burner: Burner;
    title: string;
}

export interface Burner {
    type: string;
    emissions?: number;
    render_no_power_icon: boolean;
    render_no_network_icon: boolean;
    fuel_inventory_size?: number;
    effectivity?: number;
    fuel_category?: string;
    connections: Connection[];
    max_temperature?: number;
    specific_heat?: string;
    max_transfer?: string;
    pipe_covers?: PipeCovers;
    usage_priority?: string;
    input_priority?: string;
}

export interface Connection {
    position: number[];
    direction: number;
}

export interface PipeCovers {
    east: East;
    west: East;
    north: East;
    south: East;
}

export interface East {
    line_length: number;
    priority: Priority;
    hr_version?: East;
    scale: number;
    frame_count: number;
    x: number;
    width: number;
    filename: Filename;
    height: number;
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
    mining_time: number;
    hardness?: number;
    result: string;
}
