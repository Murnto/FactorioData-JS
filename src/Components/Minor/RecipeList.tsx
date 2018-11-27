import * as React from "react";
import {Recipe} from "../../types/factorio.recipe";
import {RecipeSingle} from "./RecipeSingle";
import {PackLoadedData} from "../../PackLoadedData";

export class RecipeList extends React.Component<{ recipes: Recipe[], data: PackLoadedData, noTechUnlocks?: boolean }> {
    public shouldComponentUpdate(nextProps: Readonly<{ recipes: Recipe[], data: PackLoadedData }>): boolean {
        return this.props.recipes !== nextProps.recipes
            || this.props.data.packId !== nextProps.data.packId
    }

    public render() {
        const {recipes, data, noTechUnlocks} = this.props;

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
                    {!noTechUnlocks && <th>Unlocked&nbsp;By</th>}
                </tr>
                </thead>
                <tbody>
                {recipes.map(recipe =>
                    <RecipeSingle key={recipe.name} data={data} recipe={recipe} noTechUnlocks={noTechUnlocks}/>
                )}
                </tbody>
            </table>
        )
    }
}