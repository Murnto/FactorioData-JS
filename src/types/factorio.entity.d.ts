import { PrototypeHasIcon } from "./factorio.prototype";

export interface Entity extends PrototypeHasIcon {
  fast_replaceable_group?: string;
  minable: Minable;
  mined_sound?: Sound;
}

export interface EntityWithHealth extends Entity {
  corpse: string;
  dying_explosion?: string;
  healing_per_tick: number;
  max_health: number;
  repair_sound?: Sound;
  repair_speed_modifier: number;
}

export interface EnergySource {
  connections: any[];
  effectivity: number;
  emissions: number;
  fuel_category: string;
  fuel_inventory_size: number;
  render_no_network_icon: boolean;
  render_no_power_icon: boolean;
  type: string;
  usage_priority: string;
}

export interface Minable {
  mining_time: number;
  result: string;
}

export interface Sound {
  filename: string;
  volume?: number;
}

export interface FluidBox {
  base_area?: number;
  base_level: number;
  pipe_connections: PipeConnection[];
  pipe_covers: PipeCovers;
  production_type: string;
}

export interface PipeConnection {
  position: number[];
  type?: string;
}

export interface PipeCovers {
  east: PipeCoverLayers;
  north: PipeCoverLayers;
  south: PipeCoverLayers;
  west: PipeCoverLayers;
}

export interface PipeCoverLayers {
  layers: Layer[];
}

export interface Layer {
  draw_as_shadow?: boolean;
  filename: string;
  height: number;
  hr_version?: Layer;
  priority: string;
  scale?: number;
  width: number;
}
