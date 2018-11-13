export interface Generator {
    corpse: Corpse;
    dying_explosion?: DyingExplosion;
    effectivity: number;
    fast_replaceable_group?: FastReplaceableGroup;
    flags: Flag[];
    flammability: number;
    fluid_usage_per_tick: number;
    healing_per_tick: number;
    icon: string;
    icon_size: number;
    max_health: number;
    maximum_temperature: number;
    minable: Minable;
    name: string;
    repair_speed_modifier: number;
    title: string;
    type: Type;
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
