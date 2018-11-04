import {EnergySource, EntityWithHealth, FluidBox, Sound} from "./factorio.entity";

export interface Furnace extends EntityWithHealth {
    flammability: number;
    crafting_categories: string[];
    crafting_speed: number;
    energy_source: EnergySource;
    energy_usage: string;
    result_inventory_size: number;
    source_inventory_size: number;
    open_sound?: Sound;
    close_sound?: Sound;
    module_specification?: ModuleSpecification;
    allowed_effects?: AllowedEffect[];
    fluid_boxes?: FluidBox[];
}

export enum AllowedEffect {
    Consumption = "consumption",
    Pollution = "pollution",
    Productivity = "productivity",
    Speed = "speed",
}

export interface ModuleSpecification {
    module_slots: number;
}
