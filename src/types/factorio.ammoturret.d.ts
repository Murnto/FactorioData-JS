export interface AmmoTurret {
  attack_parameters: AttackParameters;
  attacking_speed: number;
  automated_ammo_count: number;
  call_for_help_radius: number;
  corpse: string;
  dying_explosion: string;
  fast_replaceable_group: string;
  flags: Flag[];
  flammability: number;
  folding_speed: number;
  healing_per_tick: number;
  icon: string;
  icon_size: number;
  inventory_size: number;
  max_health: number;
  minable: Minable;
  name: string;
  preparing_speed: number;
  repair_speed_modifier: number;
  rotation_speed: number;
  title: string;
  type: string;
}

export interface AttackParameters {
  ammo_category: string;
  cooldown: number;
  damage_modifier?: number;
  projectile_creation_distance: number;
  range: number;
  type: string;
}

export enum Flag {
  PlaceablePlayer = "placeable-player",
  PlayerCreation = "player-creation"
}

export interface Minable {
  mining_time: number;
  result: string;
}
