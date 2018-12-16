import * as React from "react";
import {PackLoadedData} from "../../packLoadedData";
import {PrototypeHasIcon} from "../../types/factorio.prototype";
import ReactJson from "react-json-view";

const entries: any[][] = [
  ["title", "Title"],
  ["type", "Type"],
  ["name", "Internal name"],
  ["max_health", "Max Health"],
  ["ingredient_count", "Ingredient count"],
  ["crafting_speed", "Crafting speed"],
  ["energy_usage", "Energy usage"],

  [
    "speed",
    "Speed",
    (val: number) => ((val / (9 / 32)) * 60 * 2).toFixed(2) + " Items/s"
  ],

  [
    "allow_custom_vectors",
    "Allow custom vectors",
    (val: boolean) => (val ? "Yes" : "No")
  ],
  ["filter_count", "Filter count"],
  ["hand_size", "Hand size"],
  ["energy_per_movement", "Energy per movement"],
  ["energy_per_rotation", "Energy per rotation"],
  ["extension_speed", "Extension speed"],

  ["rotation_speed", "Rotation speed"],
  ["preparing_speed", "Preparing speed"],
  ["folding_speed", "Folding speed"],
  ["call_for_help_radius", "Call for help radius"],

  ["fast_replaceable_group", "Fast replaceable group"]
];

interface EntityInfoBoxProps {
  data: PackLoadedData;
  entity: PrototypeHasIcon;
}

export class EntityInfoBox extends React.Component<EntityInfoBoxProps> {
  public render() {
    const { entity } = this.props;

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
          {entries
            .filter(i => !!entity[i[0]])
            .map(info => (
              <tr key={info[0]}>
                <td>
                  <strong>{info[1]}:</strong>
                </td>
                <td>{info[2] ? info[2](entity[info[0]]) : entity[info[0]]}</td>
              </tr>
            ))}
        </table>
        <ReactJson
          src={entity as any}
          theme="tube"
          displayObjectSize={false}
          displayDataTypes={false}
          collapsed={true}
        />
      </div>
    );
  }
}
