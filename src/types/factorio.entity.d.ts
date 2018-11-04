import {PrototypeHasIcon} from "./factorio.prototype";

export interface Entity extends PrototypeHasIcon {
    minable: Minable;
    fast_replaceable_group: string;
    mined_sound?: Sound;
}

export interface EntityWithHealth extends Entity {
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    corpse: string;
    repair_sound?: Sound;
    dying_explosion?: string;
}

export interface EnergySource {
    type: string;
    emissions: number;
    render_no_power_icon: boolean;
    render_no_network_icon: boolean;
    usage_priority: string;
    connections: any[];
    fuel_inventory_size: number;
    effectivity: number;
    fuel_category: string;
}

export interface Minable {
    mining_time: number;
    result: string;
}

export interface Sound {
    filename: string;
    volume?: number
}

export interface FluidBox {
    production_type: string;
    base_area?: number;
    pipe_connections: PipeConnection[];
    pipe_covers: PipeCovers;
    base_level: number;
}

export interface PipeConnection {
    type?: string;
    position: number[];
}

export interface PipeCovers {
    east: PipeCoverLayers;
    west: PipeCoverLayers;
    north: PipeCoverLayers;
    south: PipeCoverLayers;
}

export interface PipeCoverLayers {
    layers: Layer[];
}

export interface Layer {
    hr_version?: Layer;
    height: number;
    width: number;
    filename: string;
    priority: string;
    draw_as_shadow?: boolean;
    scale?: number;
}