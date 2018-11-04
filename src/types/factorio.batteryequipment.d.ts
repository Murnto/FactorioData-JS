export interface BatteryEquipment {
    name: string;
    type: string;
    energy_source: EnergySource;
    title: string;
}

export interface EnergySource {
    type: string;
    render_no_power_icon: boolean;
    render_no_network_icon: boolean;
    buffer_capacity: string;
    usage_priority: string;
    input_flow_limit: string;
    output_flow_limit: string;
    connections: any[];
}
