import * as React from "react";
import {Recipe} from "../../types/factorio.recipe";
import {RecipeSingle} from "./RecipeSingle";
import {PackLoadedData} from "../../PackLoadedData";

export function RecipeList(props: { recipes: Recipe[], data: PackLoadedData }) {
    const {recipes, data} = props;

    // console.log("[RecipeList] Render with", recipes);

    if (!recipes || recipes.length === 0) {
        return (
            <div>
                No recipes found?
            </div>
        )
    }

    return (
        <table id="table" className="table">
            <thead>
            <tr>
                <th>Icon</th>
                <th>Category</th>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Result</th>
                <th>Time&nbsp;(s)</th>
                <th>Unlocked&nbsp;By</th>
            </tr>
            </thead>
            <tbody>
            {recipes.map((object, i) => <RecipeSingle key={object.name} data={data} recipe={object}/>)}
            </tbody>
        </table>
    )
}