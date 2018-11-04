import * as React from "react";
import {Link} from 'react-router-dom'
import {PackLoadedData} from "../PackLoadedData";
import {PrototypeLink} from "./Minor/PrototypeLink";

export function PackTechList(props: { data: PackLoadedData }) {
    const {data} = props;

    const technologies = Object.values(data.technologies);

    return (
        <table id="table" className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Cost</th>
            </tr>
            </thead>
            <tbody>
            {technologies.map((object, i) =>
                <tr key={object.name}>
                    <td><Link to={`/pack/${data.packId}/tech/${object.name}`}>
                        {object.title}
                    </Link></td>
                    <td>
                        <div className="tech-units">
                            {object.unit.ingredients.map((ingd, ingdIdx) =>
                                <div key={ingd.name} className="tech-ingd">
                                    {ingd.amount}x
                                    <PrototypeLink name={ingd.name} type={ingd.type} data={data} hideName={true}/>
                                </div>
                            )}
                            x {object.unit.count}
                        </div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}
