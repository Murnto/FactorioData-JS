import {
  EnergySource,
  EntityWithHealth,
  FluidBox,
  Sound
} from "./factorio.entity";

export interface Furnace extends EntityWithHealth {
  allowed_effects?: AllowedEffect[];
  close_sound?: Sound;
  crafting_categories: string[];
  crafting_speed: number;
  energy_source: EnergySource;
  energy_usage: string;
  flammability: number;
  fluid_boxes?: FluidBox[];
  module_specification?: ModuleSpecification;
  open_sound?: Sound;
  result_inventory_size: number;
  source_inventory_size: number;
}

export enum AllowedEffect {
  Consumption = "consumption",
  Pollution = "pollution",
  Productivity = "productivity",
  Speed = "speed"
}

export interface ModuleSpecification {
  module_slots: number;
}
