export interface MiningDrill {
    corpse: string;
    dying_explosion?: string;
    energy_source: EnergySource;
    energy_usage: string;
    fast_replaceable_group: string;
    flags: string[];
    flammability: number;
    healing_per_tick: number;
    icon: string;
    icon_size: number;
    max_health: number;
    minable: Minable;
    mining_power: number;
    mining_speed: number;
    module_specification?: ModuleSpecification;
    name: string;
    repair_speed_modifier: number;
    resource_categories: string[];
    resource_searching_radius: number;
    title: string;
    type: string;
}

export interface EnergySource {
    connections: any[];
    effectivity?: number;
    emissions: number;
    fuel_category?: string;
    fuel_inventory_size?: number;
    render_no_network_icon: boolean;
    render_no_power_icon: boolean;
    type: string;
    usage_priority?: string;
}

export interface Minable {
    mining_time: number;
    result: string;
}

export interface ModuleSpecification {
    module_slots: number;
}
