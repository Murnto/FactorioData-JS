import * as React from "react";
import { Recipe } from "../types/factorio.recipe";
import { RecipeListItem } from "../Components/Recipe/recipeListItem";
import { PackComponent } from "../Utils/packComponent";

interface CalcRecipeListProps {
  noTechUnlocks?: boolean;
  recipeNameCallback: (name: string) => void;
  recipes: Recipe[];
}

export class CalcRecipeList extends PackComponent<CalcRecipeListProps> {
  public render() {
    const { recipes, noTechUnlocks, recipeNameCallback } = this.props;

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
            <RecipeListItem
              key={recipe.name}
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
    nextProps: Readonly<CalcRecipeListProps>
  ): boolean {
    return this.props.recipes !== nextProps.recipes;
  }
}
