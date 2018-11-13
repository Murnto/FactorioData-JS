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
    filename: Filename;
    volume: number;
}

export enum Filename {
    BaseSoundMachineCloseOgg = "__base__/sound/machine-close.ogg",
    BaseSoundMachineOpenOgg = "__base__/sound/machine-open.ogg",
}

export interface EnergySource {
    connections: any[];
    effectivity?: number;
    emissions: number;
    fuel_category?: string;
    fuel_inventory_size?: number;
    render_no_network_icon: boolean;
    render_no_power_icon: boolean;
    type: EnergySourceType;
    usage_priority?: UsagePriority;
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
    base_area?: number;
    base_level: number;
    pipe_connections: FluidBoxPipeConnection[];
    pipe_covers?: PipeCovers;
    pipe_picture?: PipePicture;
    production_type: ProductionTypeEnum;
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
    north: PipeCoversEast;
    south: PipeCoversEast;
    west: PipeCoversEast;
}

export interface PipeCoversEast {
    layers: Layer1[];
}

export interface Layer1 {
    draw_as_shadow?: boolean;
    filename: string;
    height: number;
    hr_version?: Layer1;
    priority: EastPriority;
    scale?: number;
    width: number;
}

export enum EastPriority {
    ExtraHigh = "extra-high",
}

export interface PipePicture {
    east: HrVersionClass;
    north: HrVersionClass;
    south: HrVersionClass;
    west: HrVersionClass;
}

export interface HrVersionClass {
    filename: string;
    height: number;
    hr_version?: HrVersionClass;
    priority: EastPriority;
    scale?: number;
    shift: number[];
    width: number;
}

export interface FluidBoxesClass {
    "1": The1;
    "2"?: The1;
    "3"?: The3;
    "4"?: The3;
    off_when_no_fluid_recipe: boolean;
}

export interface The1 {
    base_area?: number;
    base_level: number;
    pipe_connections: FluidBoxPipeConnection[];
    pipe_covers: PipeCovers;
    pipe_picture?: PipePicture;
    production_type: ProductionTypeEnum;
    secondary_draw_orders?: SecondaryDrawOrders;
}

export interface SecondaryDrawOrders {
    north: number;
}

export interface The3 {
    base_level: number;
    pipe_connections: The3_PipeConnection[];
    pipe_covers: PipeCovers;
    production_type: string;
}

export interface The3_PipeConnection {
    position: number[];
}

export interface IdleAnimation {
    layers: IdleAnimationLayer[];
}

export interface IdleAnimationLayer {
    draw_as_shadow?: boolean;
    filename: string;
    frame_count: number;
    height: number;
    hr_version?: IdleAnimationLayer;
    line_length: number;
    priority: Priority1;
    scale?: number;
    shift: number[];
    width: number;
}

export enum Priority1 {
    High = "high",
}

export interface Minable {
    hardness?: number;
    mining_time: number;
    result: string;
}

export interface ModuleSpecification {
    module_slots: number;
}

export interface WorkingVisualisationsDisabled {
    east_position: number[];
    north_position: number[];
    south_position: number[];
    west_position: number[];
}
