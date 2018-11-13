import {EntityWithHealth} from "./factorio.entity";

export interface AssemblingMachine extends EntityWithHealth {
    alert_icon_shift?: number[];
    allowed_effects?: AllowedEffect[];
    always_draw_idle_animation?: boolean;
    close_sound?: CloseSoundClass;
    crafting_categories: string[];
    crafting_speed: number;
    drawing_box?: Array<number[]>;
    energy_source: EnergySource;
    energy_usage: string;
    flags: Flag[];
    flammability: number;
    fluid_boxes?: FluidBox[] | FluidBoxesClass;
    has_backer_name?: boolean;
    idle_animation?: IdleAnimation;
    ingredient_count: number;
    module_specification?: ModuleSpecification;
    open_sound?: CloseSoundClass;
    pipe_covers?: PipeCovers;
    scale_entity_info_icon?: boolean;
    source_inventory_size?: number;
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
    filename: Filename;
}

export enum Filename {
    BaseSoundMachineCloseOgg = "__base__/sound/machine-close.ogg",
    BaseSoundMachineOpenOgg = "__base__/sound/machine-open.ogg",
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
    base_area?: number;
    pipe_connections: FluidBoxPipeConnection[];
    pipe_covers?: PipeCovers;
    base_level: number;
    pipe_picture?: PipePicture;
}

export interface FluidBoxPipeConnection {
    type?: ProductionTypeEnum;
    position: number[];
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

export interface ModuleSpecification {
    module_slots: number;
}

export interface WorkingVisualisationsDisabled {
    east_position: number[];
    south_position: number[];
    north_position: number[];
    west_position: number[];
}
