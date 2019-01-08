import * as React from "react";
import { Item } from "../types/factorio.item";
import { PrototypeIcon } from "./Minor/prototypeIcon";
import { RecipeList } from "./Minor/recipeList";
import { PackLoadedData } from "../packLoadedData";
import { Recipe } from "../types/factorio.recipe";
import { PrototypeHasIcon } from "../types/factorio.prototype";
import { EntityInfoBox } from "./InfoBox/entityInfoBox";
import { CSSProperties } from "react";

const recipeListStyle: CSSProperties = {
  display: "flow-root"
};

interface PackItemInfoState {
  entity: PrototypeHasIcon | null;
  item: Item | null;
  recipesProducing: Recipe[] | null;
  recipesUsedIn: Recipe[] | null;
}

export class PackItemInfo extends React.Component<
  { data: PackLoadedData; match: any },
  PackItemInfoState
> {
  constructor(p: any, s?: any) {
    super(p, s);

    this.state = {
      entity: null,
      item: null,
      recipesProducing: null,
      recipesUsedIn: null
    };
  }

  public componentDidMount() {
    this.initInfo();
  }

  public componentDidUpdate(prevProps: { data: PackLoadedData; match: any }) {
    if (
      prevProps.match.params.itemType !== this.props.match.params.itemType ||
      prevProps.match.params.itemName !== this.props.match.params.itemName ||
      prevProps.data.packId !== this.props.data.packId
    ) {
      this.initInfo();
    }
  }

  public render() {
    const { match, data } = this.props;
    const { itemType, itemName, packId } = match.params;
    const { entity, item, recipesProducing, recipesUsedIn } = this.state;

    console.log("[PackItemInfo] Render with", packId, itemType, itemName, item);

    if (recipesProducing === null || recipesUsedIn === null) {
      return <div>Loading item info</div>;
    }

    return (
      <div>
        {entity && <EntityInfoBox data={data} entity={entity} />}

        {(item !== null && (
          <div>
            <h2>
              <PrototypeIcon item={item} /> {item.title}
            </h2>
          </div>
        )) || (
          <h2>
            {itemType}:{itemName}
          </h2>
        )}

        {recipesProducing.length > 0 && (
          <div style={recipeListStyle}>
            <h3>Recipes</h3>
            <RecipeList data={data} recipes={recipesProducing} />
          </div>
        )}
        {recipesUsedIn.length > 0 && (
          <div style={recipeListStyle}>
            <h3>Used in</h3>
            <RecipeList data={data} recipes={recipesUsedIn} />
          </div>
        )}
      </div>
    );
  }

  public shouldComponentUpdate(
    nextProps: Readonly<{ data: PackLoadedData; match: any }>,
    nextState: Readonly<PackItemInfoState>
  ): boolean {
    console.log("shouldComponentUpdate(", nextProps, nextState, ")");
    return (
      this.props.match.params.itemType !== nextProps.match.params.itemType ||
      this.props.match.params.itemName !== nextProps.match.params.itemName ||
      this.props.data.packId !== nextProps.data.packId ||
      this.state.item !== nextState.item ||
      this.state.recipesUsedIn !== nextState.recipesUsedIn ||
      this.state.recipesProducing !== nextState.recipesProducing
    );
  }

  private initInfo() {
    const { match, data } = this.props;
    const { itemType, itemName } = match.params;

    console.time(`initInfo:${itemType}:${itemName}`);

    const item = data.findItem(itemType, itemName);
    const entity = data.findEntity(item);

    this.setState({
      entity,
      item,
      recipesProducing: data.recipesProducing(itemType, itemName),
      recipesUsedIn: data.recipesUsedIn(itemType, itemName)
    });

    console.timeEnd(`initInfo:${itemType}:${itemName}`);
  }
}
