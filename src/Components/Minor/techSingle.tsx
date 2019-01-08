import * as React from "react";
import { PrototypeLink } from "./prototypeLink";
import { Technology } from "../../types/factorio.technology";
import { Link } from "react-router-dom";
import { PackComponent } from "../../Utils/packComponent";

export class TechSingle extends PackComponent<{
  tech: Technology;
}> {
  public render() {
    const { tech } = this.props;

    return (
      <tr>
        <td>
          <Link to={this.data.link.toTech(tech)}>{tech.title}</Link>
        </td>
        <td>
          <div className="tech-units">
            {Array.isArray(tech.unit.ingredients) &&
              tech.unit.ingredients.map(ingd => (
                <div
                  key={ingd.name}
                  className="tech-ingd"
                  style={{
                    display: "inline-block"
                  }}
                >
                  {ingd.amount}x
                  <PrototypeLink name={ingd.name} type={ingd.type} hideName />
                </div>
              ))}
            x {tech.unit.count}
          </div>
        </td>
      </tr>
    );
  }
}
