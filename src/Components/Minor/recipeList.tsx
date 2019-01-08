import * as React from "react";
import { Recipe } from "../../types/factorio.recipe";
import { RecipeSingle } from "./recipeSingle";
import { PackComponent } from "../../Utils/packComponent";

interface RecipeListProps {
  noTechUnlocks?: boolean;
  recipes: Recipe[];
}

export class RecipeList extends PackComponent<RecipeListProps> {
  public render() {
    const { recipes, noTechUnlocks } = this.props;

    if (!recipes || recipes.length === 0) {
      return <div>No recipes found?</div>;
    }

    return (
      <table className="table">
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
              recipe={recipe}
              noTechUnlocks={noTechUnlocks}
            />
          ))}
        </tbody>
      </table>
    );
  }

  public shouldComponentUpdate(nextProps: Readonly<RecipeListProps>): boolean {
    return this.props.recipes !== nextProps.recipes;
  }
}
