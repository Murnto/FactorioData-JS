export interface Generator {
    name: string;
    type: Type;
    icon: string;
    icon_size: number;
    minable: Minable;
    fast_replaceable_group?: FastReplaceableGroup;
    flags: Flag[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse: Corpse;
    dying_explosion?: DyingExplosion;
    maximum_temperature: number;
    effectivity: number;
    fluid_usage_per_tick: number;
    title: string;
}

export enum Corpse {
    BigRemnants = "big-remnants",
    SmallRemnants = "small-remnants",
}

export enum DyingExplosion {
    MediumExplosion = "medium-explosion",
}

export enum FastReplaceableGroup {
    FluidGenerator = "fluid-generator",
    SteamEngine = "steam-engine",
}

export enum Flag {
    NotOnMap = "not-on-map",
    PlaceableNeutral = "placeable-neutral",
    PlaceableOffGrid = "placeable-off-grid",
    PlayerCreation = "player-creation",
}

export interface Minable {
    mining_time: number;
    result: string;
}

export enum Type {
    Generator = "generator",
}
