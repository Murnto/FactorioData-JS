import {PrototypeHasIcon} from "./factorio.prototype";

export interface Item extends PrototypeHasIcon {
    subgroup: string;
    stack_size: number;
    flags: Flag[];
    place_result: undefined | string;
    healing_value: undefined;
    place_as_tile: PlaceAsTile | undefined;
    placed_as_equipment_result: undefined | string;
    default_request_amount: number | undefined;
    burnt_result: undefined | string;
    rocket_launch_product: RocketLaunchProduct | undefined;
    damage_radius: number | undefined;
    trigger_radius: number | undefined;
    fuel_value: undefined | string;
    fuel_category: FuelCategory | undefined;
    fuel_top_speed_multiplier: number | undefined;
    fuel_acceleration_multiplier: number | undefined;
    effect: Effect | undefined;
    tier: number | undefined;
    category: Category | undefined;
    limitation_message_key: undefined | string;
    limitation: string[] | undefined;
    fuel_emissions_multiplier: number | undefined;
    flag_goes_to_quickbar: boolean;
    flag_goes_to_main_inventory: boolean;
    flag_hidden: boolean;
}

export enum Category {
    Effectivity = "effectivity",
    Productivity = "productivity",
    Speed = "speed",
}

export interface Effect {
    speed?: Consumption;
    consumption: Consumption;
    productivity?: Consumption;
    pollution?: Consumption;
}

export interface Consumption {
    bonus: number;
}

export enum Flag {
    GoesToMainInventory = "goes-to-main-inventory",
    GoesToQuickbar = "goes-to-quickbar",
    Hidden = "hidden",
}

export enum FuelCategory {
    Chemical = "chemical",
    Nuclear = "nuclear",
}

export interface PlaceAsTile {
    condition: Condition[];
    condition_size: number;
    result: string;
}

export enum Condition {
    Layer15 = "layer-15",
    WaterTile = "water-tile",
}

export interface RocketLaunchProduct {
    type: string;
    name: string;
    amount: number;
    amount_min: undefined;
    amount_max: undefined;
    probability: undefined;
}