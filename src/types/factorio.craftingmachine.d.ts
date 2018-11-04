export interface CraftingMachine {
    name: string;
    type: CraftingMachineType;
    icon_size: number;
    icons?: Icon[];
    minable: Minable;
    fast_replaceable_group?: string;
    flags: Flag[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse: Corpse;
    dying_explosion?: DyingExplosion;
    crafting_categories: string[];
    crafting_speed: number;
    energy_source: EnergySource;
    energy_usage: string;
    module_specification?: ModuleSpecification;
    allowed_effects?: AllowedEffect[];
    fluid_boxes?: FluidBox[] | FluidBoxesClass;
    ingredient_count?: number;
    title: string;
    icon?: string;
    result_inventory_size?: number;
    source_inventory_size?: number;
    open_sound?: CloseSoundClass;
    close_sound?: CloseSoundClass;
    repair_sound?: MinedSoundClass;
    pipe_covers?: PipeCovers;
    mined_sound?: MinedSoundClass;
    order?: string;
    drawing_box?: Array<number[]>;
    has_backer_name?: boolean;
    scale_entity_info_icon?: boolean;
    alert_icon_shift?: number[];
    idle_animation?: IdleAnimation;
    always_draw_idle_animation?: boolean;
    working_visualisations_disabled?: WorkingVisualisationsDisabled[];
}

export enum AllowedEffect {
    Consumption = "consumption",
    Pollution = "pollution",
    Productivity = "productivity",
    Speed = "speed",
}

export interface CloseSoundClass {
    volume: number;
    filename: CloseSoundFilename;
}

export enum CloseSoundFilename {
    BaseSoundMachineCloseOgg = "__base__/sound/machine-close.ogg",
    BaseSoundMachineOpenOgg = "__base__/sound/machine-open.ogg",
}

export enum Corpse {
    BigRemnants = "big-remnants",
    MediumRemnants = "medium-remnants",
    SmallRemnants = "small-remnants",
}

export enum DyingExplosion {
    BigExplosion = "big-explosion",
    MediumExplosion = "medium-explosion",
}

export interface EnergySource {
    type: EnergySourceType;
    emissions: number;
    render_no_power_icon: boolean;
    render_no_network_icon: boolean;
    usage_priority?: UsagePriority;
    connections: any[];
    fuel_inventory_size?: number;
    effectivity?: number;
    fuel_category?: string;
}

export enum EnergySourceType {
    Burner = "burner",
    Electric = "electric",
}

export enum UsagePriority {
    PrimaryInput = "primary-input",
    SecondaryInput = "secondary-input",
}

export enum Flag {
    PlaceableNeutral = "placeable-neutral",
    PlaceablePlayer = "placeable-player",
    PlayerCreation = "player-creation",
}

export interface FluidBox {
    production_type: ProductionTypeEnum;
    pipe_connections: FluidBoxPipeConnection[];
    pipe_covers?: PipeCovers;
    base_level: number;
    base_area?: number;
    pipe_picture?: PipePicture;
}

export interface FluidBoxPipeConnection {
    position: number[];
    type?: ProductionTypeEnum;
}

export enum ProductionTypeEnum {
    Input = "input",
    Output = "output",
}

export interface PipeCovers {
    east: PipeCoversEast;
    west: PipeCoversEast;
    north: PipeCoversEast;
    south: PipeCoversEast;
}

export interface PipeCoversEast {
    layers: Layer1[];
}

export interface Layer1 {
    hr_version?: Layer1;
    height: number;
    width: number;
    filename: string;
    priority: EastPriority;
    draw_as_shadow?: boolean;
    scale?: number;
}

export enum EastPriority {
    ExtraHigh = "extra-high",
}

export interface PipePicture {
    east: HrVersionClass;
    west: HrVersionClass;
    north: HrVersionClass;
    south: HrVersionClass;
}

export interface HrVersionClass {
    shift: number[];
    height: number;
    width: number;
    filename: string;
    priority: EastPriority;
    hr_version?: HrVersionClass;
    scale?: number;
}

export interface FluidBoxesClass {
    "1": The1;
    off_when_no_fluid_recipe: boolean;
    "2"?: The1;
    "3"?: The3;
    "4"?: The3;
}

export interface The1 {
    production_type: ProductionTypeEnum;
    pipe_picture?: PipePicture;
    pipe_connections: FluidBoxPipeConnection[];
    base_level: number;
    pipe_covers: PipeCovers;
    base_area?: number;
    secondary_draw_orders?: SecondaryDrawOrders;
}

export interface SecondaryDrawOrders {
    north: number;
}

export interface The3 {
    production_type: string;
    pipe_connections: The3_PipeConnection[];
    pipe_covers: PipeCovers;
    base_level: number;
}

export interface The3_PipeConnection {
    position: number[];
}

export interface Icon {
    icon: string;
    shift?: number[];
    tint?: Tint;
    scale?: number;
}

export interface Tint {
    g: number;
    r: number;
    a: number;
    b: number;
}

export interface IdleAnimation {
    layers: IdleAnimationLayer[];
}

export interface IdleAnimationLayer {
    line_length: number;
    hr_version?: IdleAnimationLayer;
    frame_count: number;
    height: number;
    width: number;
    filename: string;
    priority: Priority1;
    shift: number[];
    draw_as_shadow?: boolean;
    scale?: number;
}

export enum Priority1 {
    High = "high",
}

export interface Minable {
    mining_time: number;
    result: string;
    hardness?: number;
}

export interface MinedSoundClass {
    filename: MinedSoundFilename;
}

export enum MinedSoundFilename {
    BaseSoundDeconstructBricksOgg = "__base__/sound/deconstruct-bricks.ogg",
    BaseSoundManualRepairSimpleOgg = "__base__/sound/manual-repair-simple.ogg",
}

export interface ModuleSpecification {
    module_slots: number;
}

export enum CraftingMachineType {
    AssemblingMachine = "assembling-machine",
    Furnace = "furnace",
}

export interface WorkingVisualisationsDisabled {
    east_position: number[];
    south_position: number[];
    north_position: number[];
    west_position: number[];
}
