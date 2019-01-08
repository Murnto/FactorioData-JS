import * as React from "react";
import { PackLoadedData } from "../../packLoadedData";
import ReactJson from "react-json-view";
import { Item } from "../../types/factorio.item";

function toPercentage(x: number): string {
  return `${Math.round(x * 10000 + 0.00001) / 100}%`;
}

function toDegrees(x: any): string {
  return `${x}°`;
}

const entries: any[][] = [
  ["title", "Title"],
  ["type", "Type"],
  ["name", "Internal name"],

  ["fuel_category", "Fuel category"],
  ["fuel_value", "Fuel value"],
  ["fuel_acceleration_multiplier", "Fuel acceleration", toPercentage],
  ["fuel_top_speed_multiplier", "Fuel top speed", toPercentage],
  ["fuel_emissions_multiplier", "Fuel emissions", toPercentage],

  ["emissions_multiplier", "Emissions", toPercentage],
  ["heat_capacity", "Heat capacity"],
  ["max_temperature", "Max temperature", toDegrees],
  ["gas_temperature", "Gas temperature", toDegrees],
  ["default_temperature", "Default temperature", toDegrees],
  ["pressure_to_speed_ratio", "Pressure to speed"],
  ["flow_to_energy_ratio", "Flow to energy"]
];

interface ItemInfoBoxProps {
  data: PackLoadedData;
  item: Item;
}

export class ItemInfoBox extends React.Component<ItemInfoBoxProps> {
  public render() {
    const { item } = this.props;

    return (
      <div
        style={{
          backgroundColor: "#f7f7f7",
          border: "1px solid #a2a9b1",
          borderSpacing: "3px",
          clear: "right",
          color: "black",
          float: "right",
          fontSize: "80%",
          lineHeight: "1.5em",
          margin: "0.5em 0 0.5em 1em",
          maxWidth: "25em",
          padding: "0.2em"
        }}
      >
        <table>
          <tbody>
            {entries
              .filter(i => !!item[i[0]])
              .map(info => (
                <tr key={info[0]}>
                  <td>
                    <strong>{info[1]}:</strong>
                  </td>
                  <td>{info[2] ? info[2](item[info[0]]) : item[info[0]]}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <ReactJson
          src={item as any}
          theme="tube"
          displayObjectSize={false}
          displayDataTypes={false}
          collapsed={true}
        />
      </div>
    );
  }
}
