import {PrototypeHasIcon, Tint} from "./factorio.prototype";

export interface Fluid extends PrototypeHasIcon {
    default_temperature: number;
    max_temperature: number;
    base_color: Tint;
    flow_color: Tint;
    pressure_to_speed_ratio: number;
    flow_to_energy_ratio: number;
    heat_capacity: HeatCapacity;
    auto_barrel: boolean;
    subgroup?: string;
    flags: string[];
    gas_temperature?: number;
    emissions_multiplier?: number;
    fuel_value?: string;
}

export enum HeatCapacity {
    The01Kj = "0.1KJ",
    The02Kj = "0.2KJ",
    The0Kj = "0KJ",
    The1Kj = "1KJ",
}
