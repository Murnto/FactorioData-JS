import { Sound } from "./factorio.entity";

export interface Car {
  "bob-tank-2": BobTank;
  "bob-tank-3": BobTank;
  car: CarClass;
  tank: Tank;
}

export interface BobTank {
  animation: Animation;
  braking_power: string;
  burner: Burner;
  close_sound: Sound;
  collision_box: { [key: string]: { [key: string]: number } };
  consumption: string;
  corpse: string;
  dying_explosion: string;
  effectivity: number;
  energy_per_hit_point: number;
  flags: { [key: string]: string };
  friction: number;
  guns: { [key: string]: string };
  icon: string;
  icon_size: number;
  inventory_size: number;
  light: Animation;
  max_health: number;
  minable: Minable;
  name: string;
  open_sound: Sound;
  resistances: { [key: string]: BobTank2_Resistance };
  rotation_speed: number;
  selection_box: { [key: string]: { [key: string]: number } };
  sound_minimum_speed: number;
  sound_no_fuel: Sound;
  stop_trigger: Animation;
  stop_trigger_speed: number;
  tank_driving: boolean;
  terrain_friction_modifier: number;
  turret_animation: Animation;
  turret_return_timeout: number;
  turret_rotation_speed: number;
  type: string;
  vehicle_impact_sound: Sound;
  weight: number;
  working_sound: Animation;
}

export interface Animation {}

export interface Burner {
  effectivity: number;
  fuel_category?: string;
  fuel_inventory_size: number;
  smoke: Animation;
}

export interface Minable {
  mining_time: number;
  result: string;
}

export interface BobTank2_Resistance {
  decrease: number;
  percent: number;
  type: string;
}

export interface CarClass {
  alert_icon_shift: { [key: string]: number };
  animation: Animation;
  braking_power: string;
  burner: Burner;
  close_sound: Sound;
  collision_box: { [key: string]: { [key: string]: number } };
  consumption: string;
  corpse: string;
  crash_trigger: CrashTrigger;
  dying_explosion: string;
  effectivity: number;
  energy_per_hit_point: number;
  flags: { [key: string]: string };
  friction: number;
  guns: Guns;
  icon: string;
  icon_size: number;
  inventory_size: number;
  light: Animation;
  max_health: number;
  minable: Minable;
  mined_sound: Sound;
  name: string;
  open_sound: Sound;
  render_layer: string;
  resistances: { [key: string]: CarResistance };
  rotation_speed: number;
  selection_box: { [key: string]: { [key: string]: number } };
  sound_minimum_speed: number;
  sound_no_fuel: Sound;
  stop_trigger: Animation;
  stop_trigger_speed: number;
  turret_animation: Animation;
  turret_rotation_speed: number;
  type: string;
  vehicle_impact_sound: Sound;
  weight: number;
  working_sound: Animation;
}

export interface CrashTrigger {
  sound: Sound;
  type: string;
}

export interface Guns {
  "1": string;
}

export interface CarResistance {
  decrease?: number;
  percent: number;
  type: string;
}

export interface Tank {
  alert_icon_shift: { [key: string]: number };
  animation: Animation;
  braking_power: string;
  burner: Burner;
  close_sound: Sound;
  collision_box: { [key: string]: { [key: string]: number } };
  consumption: string;
  corpse: string;
  drawing_box: { [key: string]: { [key: string]: number } };
  dying_explosion: string;
  effectivity: number;
  energy_per_hit_point: number;
  flags: { [key: string]: string };
  friction: number;
  guns: { [key: string]: string };
  icon: string;
  icon_size: number;
  immune_to_tree_impacts: boolean;
  inventory_size: number;
  light: Animation;
  max_health: number;
  minable: Minable;
  mined_sound: Sound;
  name: string;
  open_sound: Sound;
  resistances: { [key: string]: BobTank2_Resistance };
  rotation_speed: number;
  selection_box: { [key: string]: { [key: string]: number } };
  sound_minimum_speed: number;
  sound_no_fuel: Sound;
  stop_trigger: Animation;
  stop_trigger_speed: number;
  tank_driving: boolean;
  terrain_friction_modifier: number;
  turret_animation: Animation;
  turret_return_timeout: number;
  turret_rotation_speed: number;
  type: string;
  vehicle_impact_sound: Sound;
  weight: number;
  working_sound: Animation;
}
