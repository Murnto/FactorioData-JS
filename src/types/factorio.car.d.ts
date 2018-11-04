import {Sound} from "./factorio.entity";

export interface Car {
    tank: Tank;
    car: CarClass;
    "bob-tank-2": BobTank;
    "bob-tank-3": BobTank;
}

export interface BobTank {
    type: string;
    rotation_speed: number;
    working_sound: Animation;
    open_sound: Sound;
    selection_box: { [key: string]: { [key: string]: number } };
    turret_animation: Animation;
    burner: Burner;
    corpse: string;
    turret_return_timeout: number;
    max_health: number;
    icon: string;
    flags: { [key: string]: string };
    stop_trigger_speed: number;
    weight: number;
    terrain_friction_modifier: number;
    icon_size: number;
    sound_minimum_speed: number;
    effectivity: number;
    sound_no_fuel: Sound;
    energy_per_hit_point: number;
    light: Animation;
    stop_trigger: Animation;
    guns: { [key: string]: string };
    inventory_size: number;
    name: string;
    resistances: { [key: string]: BobTank2_Resistance };
    tank_driving: boolean;
    dying_explosion: string;
    close_sound: Sound;
    consumption: string;
    vehicle_impact_sound: Sound;
    turret_rotation_speed: number;
    animation: Animation;
    minable: Minable;
    collision_box: { [key: string]: { [key: string]: number } };
    friction: number;
    braking_power: string;
}

export interface Animation {
}

export interface Burner {
    smoke: Animation;
    fuel_inventory_size: number;
    effectivity: number;
    fuel_category?: string;
}

export interface Minable {
    mining_time: number;
    result: string;
}

export interface BobTank2_Resistance {
    type: string;
    decrease: number;
    percent: number;
}

export interface CarClass {
    type: string;
    render_layer: string;
    rotation_speed: number;
    mined_sound: Sound;
    open_sound: Sound;
    selection_box: { [key: string]: { [key: string]: number } };
    turret_animation: Animation;
    burner: Burner;
    corpse: string;
    alert_icon_shift: { [key: string]: number };
    max_health: number;
    icon: string;
    flags: { [key: string]: string };
    stop_trigger_speed: number;
    weight: number;
    icon_size: number;
    sound_minimum_speed: number;
    effectivity: number;
    sound_no_fuel: Sound;
    energy_per_hit_point: number;
    light: Animation;
    stop_trigger: Animation;
    inventory_size: number;
    guns: Guns;
    close_sound: Sound;
    name: string;
    resistances: { [key: string]: CarResistance };
    working_sound: Animation;
    dying_explosion: string;
    vehicle_impact_sound: Sound;
    consumption: string;
    animation: Animation;
    turret_rotation_speed: number;
    friction: number;
    minable: Minable;
    collision_box: { [key: string]: { [key: string]: number } };
    braking_power: string;
    crash_trigger: CrashTrigger;
}

export interface CrashTrigger {
    type: string;
    sound: Sound;
}

export interface Guns {
    "1": string;
}

export interface CarResistance {
    type: string;
    percent: number;
    decrease?: number;
}

export interface Tank {
    type: string;
    rotation_speed: number;
    mined_sound: Sound;
    open_sound: Sound;
    selection_box: { [key: string]: { [key: string]: number } };
    turret_animation: Animation;
    burner: Burner;
    corpse: string;
    alert_icon_shift: { [key: string]: number };
    max_health: number;
    icon: string;
    flags: { [key: string]: string };
    stop_trigger_speed: number;
    weight: number;
    terrain_friction_modifier: number;
    icon_size: number;
    drawing_box: { [key: string]: { [key: string]: number } };
    sound_minimum_speed: number;
    effectivity: number;
    sound_no_fuel: Sound;
    energy_per_hit_point: number;
    light: Animation;
    guns: { [key: string]: string };
    immune_to_tree_impacts: boolean;
    stop_trigger: Animation;
    inventory_size: number;
    tank_driving: boolean;
    close_sound: Sound;
    name: string;
    resistances: { [key: string]: BobTank2_Resistance };
    working_sound: Animation;
    dying_explosion: string;
    vehicle_impact_sound: Sound;
    consumption: string;
    turret_return_timeout: number;
    turret_rotation_speed: number;
    animation: Animation;
    minable: Minable;
    collision_box: { [key: string]: { [key: string]: number } };
    friction: number;
    braking_power: string;
}
