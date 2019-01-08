import * as React from "react";
import { Recipe } from "../../types/factorio.recipe";
import { GroupedItemAmounts } from "../Minor/groupedItemAmounts";
import { PrototypeIcon } from "../Minor/prototypeIcon";
import { PrototypeLink } from "../Minor/prototypeLink";
import { Technology } from "../../types/factorio.technology";
import { Link } from "react-router-dom";
import { PackComponent } from "../../Utils/packComponent";

interface RecipeListItemProps {
  noCategoryLinks?: boolean;
  noTechUnlocks?: boolean;
  recipe: Recipe;
  recipeNameCallback?: (name: string) => void;
}

interface RecipeListItemState {
  techUnlockedBy: Technology[] | null;
}

export class RecipeListItem extends PackComponent<
  RecipeListItemProps,
  RecipeListItemState
> {
  constructor(p: any, s?: any) {
    super(p, s);

    this.state = {
      techUnlockedBy: null
    };
  }

  public componentDidMount() {
    const { recipe, noTechUnlocks } = this.props;

    if (!noTechUnlocks) {
      this.setState({ techUnlockedBy: this.data.technologyUnlockedBy(recipe) });
    }
  }

  public render() {
    const { recipe, noTechUnlocks, noCategoryLinks } = this.props;
    const { techUnlockedBy } = this.state;

    if (!noTechUnlocks && techUnlockedBy === null) {
      return <tr />;
    }

    return (
      <tr>
        <td>
          <PrototypeIcon item={recipe} missingOk={true} />
        </td>
        <td>
          {(!noCategoryLinks && (
            <Link
              to={`/pack/${this.data.packId}/craftingCat/${recipe.category}`}
            >
              {recipe.category}
            </Link>
          )) ||
            recipe.category}
        </td>
        <td>
          <span className="fake-link" onClick={this.addRecipeToGraph}>
            {recipe.title}
          </span>
        </td>
        <td>
          <GroupedItemAmounts items={recipe.ingredients} />
        </td>
        <td>
          <GroupedItemAmounts items={recipe.results} />
        </td>
        <td>{recipe.energy_required}</td>
        {!noTechUnlocks && (
          <td>
            {techUnlockedBy!.map(object => (
              <PrototypeLink
                key={object.name}
                to={this.data.link.toTech(object)}
                item={object}
              />
            ))}
          </td>
        )}
      </tr>
    );
  }

  private addRecipeToGraph = () => {
    if (this.props.recipeNameCallback) {
      this.props.recipeNameCallback(this.props.recipe.name);
    } else {
      fetch("http://192.168.100.254:8500/add_recipe", {
        body: this.props.recipe.name,
        method: "POST",
        mode: "no-cors"
      }).then(r => {
        console.log(r.ok, r.status, r);
      });
    }
  };
}
