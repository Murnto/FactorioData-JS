export interface MiningDrill {
    name: string;
    type: string;
    icon: string;
    icon_size: number;
    minable: Minable;
    fast_replaceable_group: string;
    flags: string[];
    max_health: number;
    healing_per_tick: number;
    repair_speed_modifier: number;
    flammability: number;
    corpse: string;
    dying_explosion?: string;
    energy_source: EnergySource;
    energy_usage: string;
    module_specification?: ModuleSpecification;
    resource_categories: string[];
    resource_searching_radius: number;
    mining_power: number;
    mining_speed: number;
    title: string;
}

export interface EnergySource {
    type: string;
    emissions: number;
    render_no_power_icon: boolean;
    render_no_network_icon: boolean;
    usage_priority?: string;
    connections: any[];
    fuel_inventory_size?: number;
    effectivity?: number;
    fuel_category?: string;
}

export interface Minable {
    mining_time: number;
    result: string;
}

export interface ModuleSpecification {
    module_slots: number;
}
