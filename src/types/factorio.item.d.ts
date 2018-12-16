import { PrototypeHasIcon } from "./factorio.prototype";

export interface Item extends PrototypeHasIcon {
  burnt_result: undefined | string;
  category: Category | undefined;
  damage_radius: number | undefined;
  default_request_amount: number | undefined;
  effect: Effect | undefined;
  flag_goes_to_main_inventory: boolean;
  flag_goes_to_quickbar: boolean;
  flag_hidden: boolean;
  flags: Flag[];
  fuel_acceleration_multiplier: number | undefined;
  fuel_category: FuelCategory | undefined;
  fuel_emissions_multiplier: number | undefined;
  fuel_top_speed_multiplier: number | undefined;
  fuel_value: undefined | string;
  healing_value: undefined;
  limitation: string[] | undefined;
  limitation_message_key: undefined | string;
  place_as_tile: PlaceAsTile | undefined;
  place_result: undefined | string;
  placed_as_equipment_result: undefined | string;
  rocket_launch_product: RocketLaunchProduct | undefined;
  stack_size: number;
  subgroup: string;
  tier: number | undefined;
  trigger_radius: number | undefined;
}

export enum Category {
  Effectivity = "effectivity",
  Productivity = "productivity",
  Speed = "speed"
}

export interface Effect {
  consumption: Consumption;
  pollution?: Consumption;
  productivity?: Consumption;
  speed?: Consumption;
}

export interface Consumption {
  bonus: number;
}

export enum Flag {
  GoesToMainInventory = "goes-to-main-inventory",
  GoesToQuickbar = "goes-to-quickbar",
  Hidden = "hidden"
}

export enum FuelCategory {
  Chemical = "chemical",
  Nuclear = "nuclear"
}

export interface PlaceAsTile {
  condition: Condition[];
  condition_size: number;
  result: string;
}

export enum Condition {
  Layer15 = "layer-15",
  WaterTile = "water-tile"
}

export interface RocketLaunchProduct {
  amount: number;
  amount_max: undefined;
  amount_min: undefined;
  name: string;
  probability: undefined;
  type: string;
}
