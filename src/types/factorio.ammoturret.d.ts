export interface AmmoTurret {
    name: string;
    type: string;
    icon: string;
    icon_size: number;
    minable: Minable;
    fast_replaceable_group: string;
    flags: Flag[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse: string;
    dying_explosion: string;
    rotation_speed: number;
    folding_speed: number;
    attacking_speed: number;
    preparing_speed: number;
    call_for_help_radius: number;
    automated_ammo_count: number;
    inventory_size: number;
    attack_parameters: AttackParameters;
    title: string;
}

export interface AttackParameters {
    type: string;
    ammo_category: string;
    cooldown: number;
    projectile_creation_distance: number;
    range: number;
    damage_modifier?: number;
}

export enum Flag {
    PlaceablePlayer = "placeable-player",
    PlayerCreation = "player-creation",
}

export interface Minable {
    mining_time: number;
    result: string;
}
