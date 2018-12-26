import * as React from "react";
import { Recipe } from "../../types/factorio.recipe";
import { GroupedItemAmounts } from "./groupedItemAmounts";
import { PackLoadedData } from "../../packLoadedData";
import { PrototypeIcon } from "./prototypeIcon";
import { PrototypeLink } from "./prototypeLink";
import { Technology } from "../../types/factorio.technology";
import { Link } from "react-router-dom";

export class RecipeSingle extends React.Component<
  {
    data: PackLoadedData;
    noCategoryLinks?: boolean;
    noTechUnlocks?: boolean;
    recipe: Recipe;
    recipeNameCallback?: (name: string) => void;
  },
  {
    techUnlockedBy: Technology[] | null;
  }
> {
  constructor(p: any, s?: any) {
    super(p, s);

    this.state = {
      techUnlockedBy: null
    };
  }

  public componentDidMount() {
    const { recipe, data, noTechUnlocks } = this.props;

    if (!noTechUnlocks) {
      this.setState({ techUnlockedBy: data.technologyUnlockedBy(recipe) });
    }
  }

  // public componentDidUpdate() {
  //     const {recipe, data} = this.props;
  //     this.setState({techUnlockedBy: data.technologyUnlockedBy(recipe)})
  // }

  public render() {
    const { recipe, data, noTechUnlocks, noCategoryLinks } = this.props;
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
              to={`/pack/${this.props.data.packId}/craftingCat/${
                recipe.category
              }`}
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
          <GroupedItemAmounts data={data} items={recipe.ingredients} />
        </td>
        <td>
          <GroupedItemAmounts data={data} items={recipe.results} />
        </td>
        <td>{recipe.energy_required}</td>
        {!noTechUnlocks && (
          <td>
            {techUnlockedBy!.map(object => (
              <PrototypeLink
                key={object.name}
                to={data.link.toTech(object)}
                data={data}
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
