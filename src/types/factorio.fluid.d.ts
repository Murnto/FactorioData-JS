import { PrototypeHasIcon, Tint } from "./factorio.prototype";

export interface Fluid extends PrototypeHasIcon {
  auto_barrel: boolean;
  base_color: Tint;
  default_temperature: number;
  emissions_multiplier?: number;
  flags: string[];
  flow_color: Tint;
  flow_to_energy_ratio: number;
  fuel_value?: string;
  gas_temperature?: number;
  heat_capacity: HeatCapacity;
  max_temperature: number;
  pressure_to_speed_ratio: number;
  subgroup?: string;
}

export enum HeatCapacity {
  The01Kj = "0.1KJ",
  The02Kj = "0.2KJ",
  The0Kj = "0KJ",
  The1Kj = "1KJ"
}
