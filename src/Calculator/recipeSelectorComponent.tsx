import * as React from "react";
import { PackLoadedData } from "../packLoadedData";
import { Recipe } from "../types/factorio.recipe";
import { CalcRecipeList } from "./calcRecipeList";

type SelectorQueryType = "recipe" | "ingredient" | "result";

export interface SelectorQuery {
  name: string;
  queryType: SelectorQueryType;
  type?: string;
}

interface RecipeSelectorProps {
  data: PackLoadedData;
  onRecipeSelected: (recipe: Recipe) => void;
  query?: SelectorQuery;
}

interface RecipeSelectorState {
  recipes: Recipe[];
}

export class RecipeSelector extends React.Component<
  RecipeSelectorProps,
  RecipeSelectorState
> {
  constructor(p: RecipeSelectorProps, s?: RecipeSelectorState) {
    super(p, s);

    this.state = {
      recipes: []
    };
  }

  public componentDidMount() {
    console.log("RecSel didMount");

    let recipes: Recipe[];
    if (this.props.query) {
      switch (this.props.query.queryType) {
        case "ingredient":
          recipes = this.props.data.recipesUsedIn(
            this.props.query.type!,
            this.props.query.name
          );
          break;
        case "result":
          recipes = this.props.data.recipesProducing(
            this.props.query.type!,
            this.props.query.name
          );
          break;
        case "recipe":
          console.log("TODO"); // TODO
          recipes = [];
          break;
        default:
          console.log("TODO 2"); // TODO
          recipes = [];
          break;
      }
    } else {
      console.log("TODO 3"); // TODO
      recipes = [];
    }

    this.setState({
      recipes
    });
  }

  public render(): React.ReactNode {
    return (
      <CalcRecipeList
        data={this.props.data}
        recipes={this.state.recipes}
        noTechUnlocks={true}
        recipeNameCallback={this.recipeCallback}
      />
    );
  }

  private recipeCallback = (name: string) => {
    this.props.onRecipeSelected(this.props.data.recipes[name]);
  };
}
