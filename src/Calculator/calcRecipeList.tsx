import * as React from "react";
import { Recipe } from "../types/factorio.recipe";
import { RecipeSingle } from "../Components/Minor/recipeSingle";
import { PackLoadedData } from "../packLoadedData";

export class CalcRecipeList extends React.Component<{
  data: PackLoadedData;
  noTechUnlocks?: boolean;
  recipeNameCallback: (name: string) => void;
  recipes: Recipe[];
}> {
  public render() {
    const { recipes, data, noTechUnlocks, recipeNameCallback } = this.props;

    if (!recipes || recipes.length === 0) {
      return <div>No recipes found?</div>;
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
          {recipes.map(recipe => (
            <RecipeSingle
              key={recipe.name}
              data={data}
              recipe={recipe}
              noTechUnlocks={noTechUnlocks}
              noCategoryLinks
              recipeNameCallback={recipeNameCallback}
            />
          ))}
        </tbody>
      </table>
    );
  }

  public shouldComponentUpdate(
    nextProps: Readonly<{ data: PackLoadedData; recipes: Recipe[] }>
  ): boolean {
    return (
      this.props.recipes !== nextProps.recipes ||
      this.props.data.packId !== nextProps.data.packId
    );
  }
}
