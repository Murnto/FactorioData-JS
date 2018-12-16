import * as React from "react";
import {PackLoadedData} from "../../PackLoadedData";
import {PrototypeLink} from "./PrototypeLink";
import {Technology} from "../../types/factorio.technology";
import {Link} from "react-router-dom";

export class TechSingle extends React.Component<{
    tech: Technology
    data: PackLoadedData
}> {
    public render() {
        const {tech, data} = this.props;

        return (
            <tr>
                <td><Link to={`/pack/${data.packId}/tech/${tech.name}`}>
                    {tech.title}
                </Link></td>
                <td>
                    <div className="tech-units">
                        {Array.isArray(tech.unit.ingredients) && tech.unit.ingredients.map(ingd =>
                            <div key={ingd.name} className="tech-ingd" style={{
                                display: 'inline-block',
                            }}>
                                {ingd.amount}x
                                <PrototypeLink name={ingd.name} type={ingd.type} data={data} hideName/>
                            </div>
                        )}
                        x {tech.unit.count}
                    </div>
                </td>
            </tr>
        )
    }
}
