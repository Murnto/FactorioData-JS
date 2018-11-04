export interface Resource {
    order: string;
    icon: string;
    icon_size: number;
    minimum?: number;
    normal?: number;
    stages: Stages;
    stage_counts: number[];
    flags: Flag[];
    category?: string;
    highlight?: boolean;
    infinite?: boolean;
    infinite_depletion_amount?: number;
    resource_patch_search_radius?: number;
    minable: Minable;
    map_grid?: boolean;
    map_color: MapColor;
    localised_description?: Array<string[] | string>;
    max_effect_alpha?: number;
    min_effect_alpha?: number;
    effect_darkness_multiplier?: number;
    effect_animation_period_deviation?: number;
    stages_effect?: StagesEffect;
    effect_animation_period?: number;
    tree_removal_probability?: number;
    tree_removal_max_distance?: number;
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
}

export interface MapColor {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface Minable {
    mining_time: number;
    hardness: number;
    results?: Result[];
    result?: string;
    mining_particle?: string;
    required_fluid?: string;
    fluid_amount?: number;
}

export interface Result {
    amount_min: number;
    amount_max: number;
    probability: number;
}

export interface Stages {
    sheet: StagesSheet;
}

export interface StagesSheet {
    variation_count: number;
    tint?: MapColor;
    height: number;
    width: number;
    filename: string;
    priority: Priority;
    frame_count: number;
    hr_version?: StagesSheet;
    scale?: number;
}

export enum Priority {
    ExtraHigh = "extra-high",
}

export interface StagesEffect {
    sheet: StagesEffectSheet;
}

export interface StagesEffectSheet {
    tint?: MapColor;
    priority: string;
    flags: string[];
    variation_count: number;
    frame_count: number;
    height: number;
    width: number;
    filename: string;
    blend_mode: string;
    hr_version?: StagesEffectSheet;
    scale?: number;
}
