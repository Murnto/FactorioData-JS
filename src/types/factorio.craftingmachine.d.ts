export interface CraftingMachine {
  alert_icon_shift?: number[];
  allowed_effects?: AllowedEffect[];
  always_draw_idle_animation?: boolean;
  close_sound?: CloseSoundClass;
  corpse: Corpse;
  crafting_categories: string[];
  crafting_speed: number;
  drawing_box?: Array<number[]>;
  dying_explosion?: DyingExplosion;
  energy_source: EnergySource;
  energy_usage: string;
  fast_replaceable_group?: string;
  flags: Flag[];
  flammability: number;
  fluid_boxes?: FluidBox[] | FluidBoxesClass;
  has_backer_name?: boolean;
  healing_per_tick: number;
  icon?: string;
  icon_size: number;
  icons?: Icon[];
  idle_animation?: IdleAnimation;
  ingredient_count?: number;
  max_health: number;
  minable: Minable;
  mined_sound?: MinedSoundClass;
  module_specification?: ModuleSpecification;
  name: string;
  open_sound?: CloseSoundClass;
  order?: string;
  pipe_covers?: PipeCovers;
  repair_sound?: MinedSoundClass;
  repair_speed_modifier: number;
  result_inventory_size?: number;
  scale_entity_info_icon?: boolean;
  source_inventory_size?: number;
  title: string;
  type: CraftingMachineType;
  working_visualisations_disabled?: WorkingVisualisationsDisabled[];
}

export enum AllowedEffect {
  Consumption = "consumption",
  Pollution = "pollution",
  Productivity = "productivity",
  Speed = "speed"
}

export interface CloseSoundClass {
  filename: CloseSoundFilename;
  volume: number;
}

export enum CloseSoundFilename {
  BaseSoundMachineCloseOgg = "__base__/sound/machine-close.ogg",
  BaseSoundMachineOpenOgg = "__base__/sound/machine-open.ogg"
}

export enum Corpse {
  BigRemnants = "big-remnants",
  MediumRemnants = "medium-remnants",
  SmallRemnants = "small-remnants"
}

export enum DyingExplosion {
  BigExplosion = "big-explosion",
  MediumExplosion = "medium-explosion"
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
  Electric = "electric"
}

export enum UsagePriority {
  PrimaryInput = "primary-input",
  SecondaryInput = "secondary-input"
}

export enum Flag {
  PlaceableNeutral = "placeable-neutral",
  PlaceablePlayer = "placeable-player",
  PlayerCreation = "player-creation"
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
  Output = "output"
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
  ExtraHigh = "extra-high"
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

export interface Icon {
  icon: string;
  scale?: number;
  shift?: number[];
  tint?: Tint;
}

export interface Tint {
  a: number;
  b: number;
  g: number;
  r: number;
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
  High = "high"
}

export interface Minable {
  hardness?: number;
  mining_time: number;
  result: string;
}

export interface MinedSoundClass {
  filename: MinedSoundFilename;
}

export enum MinedSoundFilename {
  BaseSoundDeconstructBricksOgg = "__base__/sound/deconstruct-bricks.ogg",
  BaseSoundManualRepairSimpleOgg = "__base__/sound/manual-repair-simple.ogg"
}

export interface ModuleSpecification {
  module_slots: number;
}

export enum CraftingMachineType {
  AssemblingMachine = "assembling-machine",
  Furnace = "furnace"
}

export interface WorkingVisualisationsDisabled {
  east_position: number[];
  north_position: number[];
  south_position: number[];
  west_position: number[];
}
