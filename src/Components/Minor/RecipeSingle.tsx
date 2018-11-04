import * as React from "react";
import {Recipe} from "../../types/factorio.recipe";
import {GroupedItemAmounts} from "./GroupedItemAmounts";
import {PackLoadedData} from "../../PackLoadedData";
import {PrototypeIcon} from "./PrototypeIcon";
import {PrototypeLink} from "./PrototypeLink";

export function RecipeSingle(props: { recipe: Recipe, data: PackLoadedData }) {
    const {recipe, data} = props;

    // console.log("[RecipeSingle] Render with", recipe);
    const techUnlockedBy = data.technologyUnlockedBy(recipe);

    return (
        <tr>
            <td><PrototypeIcon item={recipe} missingOk={true}/></td>
            <td>{recipe.category}</td>
            <td>{recipe.title}</td>
            <td><GroupedItemAmounts data={data} items={recipe.ingredients}/></td>
            <td><GroupedItemAmounts data={data} items={recipe.results}/></td>
            <td>{recipe.energy_required}</td>
            <td>
                {techUnlockedBy.map((object, i) => <PrototypeLink key={object.name} data={data} item={object}/>)}
            </td>
        </tr>
    )
}