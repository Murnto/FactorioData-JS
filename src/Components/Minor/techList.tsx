import * as React from "react";
import { Technology } from "../../types/factorio.technology";
import { TechSingle } from "./techSingle";
import { PackComponent } from "../../Utils/packComponent";

interface TechListProps {
  technologies: Technology[];
}

export class TechList extends PackComponent<TechListProps> {
  public render() {
    const { technologies } = this.props;

    if (!technologies || technologies.length === 0) {
      return <div>No technologies found?</div>;
    }

    return (
      <table id="table" className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {technologies.map(tech => (
            <TechSingle key={tech.name} tech={tech} />
          ))}
        </tbody>
      </table>
    );
  }
  public shouldComponentUpdate(nextProps: Readonly<TechListProps>): boolean {
    return this.props.technologies !== nextProps.technologies;
  }
}
