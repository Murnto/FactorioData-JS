export interface BatteryEquipment {
  energy_source: EnergySource;
  name: string;
  title: string;
  type: string;
}

export interface EnergySource {
  buffer_capacity: string;
  connections: any[];
  input_flow_limit: string;
  output_flow_limit: string;
  render_no_network_icon: boolean;
  render_no_power_icon: boolean;
  type: string;
  usage_priority: string;
}
