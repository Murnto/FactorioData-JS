import * as React from "react";
import {PackLoadedData} from "../../PackLoadedData";
import {Technology} from "../../types/factorio.technology";
import {TechSingle} from "./TechSingle";

export class TechList extends React.Component<{ technologies: Technology[], data: PackLoadedData }> {
    public shouldComponentUpdate(nextProps: Readonly<{ technologies: Technology[], data: PackLoadedData }>): boolean {
        return this.props.technologies !== nextProps.technologies
            || this.props.data.packId !== nextProps.data.packId
    }

    public render() {
        const {technologies, data} = this.props;

        if (!technologies || technologies.length === 0) {
            return (
                <div>
                    No technologies found?
                </div>
            )
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
                {technologies.map(tech =>
                    <TechSingle key={tech.name} data={data} tech={tech}/>
                )}
                </tbody>
            </table>
        )
    }
}
