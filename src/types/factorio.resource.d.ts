export interface Resource {
    category?: string;
    effect_animation_period?: number;
    effect_animation_period_deviation?: number;
    effect_darkness_multiplier?: number;
    flags: Flag[];
    highlight?: boolean;
    icon: string;
    icon_size: number;
    infinite?: boolean;
    infinite_depletion_amount?: number;
    localised_description?: Array<string[] | string>;
    map_color: MapColor;
    map_grid?: boolean;
    max_effect_alpha?: number;
    min_effect_alpha?: number;
    minable: Minable;
    minimum?: number;
    normal?: number;
    order: string;
    resource_patch_search_radius?: number;
    stage_counts: number[];
    stages: Stages;
    stages_effect?: StagesEffect;
    tree_removal_max_distance?: number;
    tree_removal_probability?: number;
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
}

export interface MapColor {
    a?: number;
    b: number;
    g: number;
    r: number;
}

export interface Minable {
    fluid_amount?: number;
    hardness: number;
    mining_particle?: string;
    mining_time: number;
    required_fluid?: string;
    result?: string;
    results?: Result[];
}

export interface Result {
    amount_max: number;
    amount_min: number;
    probability: number;
}

export interface Stages {
    sheet: StagesSheet;
}

export interface StagesSheet {
    filename: string;
    frame_count: number;
    height: number;
    hr_version?: StagesSheet;
    priority: Priority;
    scale?: number;
    tint?: MapColor;
    variation_count: number;
    width: number;
}

export enum Priority {
    ExtraHigh = "extra-high",
}

export interface StagesEffect {
    sheet: StagesEffectSheet;
}

export interface StagesEffectSheet {
    blend_mode: string;
    filename: string;
    flags: string[];
    frame_count: number;
    height: number;
    hr_version?: StagesEffectSheet;
    priority: string;
    scale?: number;
    tint?: MapColor;
    variation_count: number;
    width: number;
}
