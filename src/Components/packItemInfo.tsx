import * as React from "react";
import { Item } from "../types/factorio.item";
import { PrototypeIcon } from "./Minor/prototypeIcon";
import { RecipeList } from "./Minor/recipeList";
import { Recipe } from "../types/factorio.recipe";
import { PrototypeHasIcon } from "../types/factorio.prototype";
import { EntityInfoBox } from "./InfoBox/entityInfoBox";
import { CSSProperties } from "react";
import { ItemInfoBox } from "./InfoBox/itemInfoBox";
import { RouteComponentProps } from "react-router";
import { PackComponent } from "../Utils/packComponent";

const recipeListStyle: CSSProperties = {
  display: "flow-root"
};

type PackItemInfoProps = RouteComponentProps<{
  itemName: string;
  itemType: string;
}>;

interface PackItemInfoState {
  entity: PrototypeHasIcon | null;
  item: Item | null;
  recipesProducing: Recipe[] | null;
  recipesUsedIn: Recipe[] | null;
}

export class PackItemInfo extends PackComponent<
  PackItemInfoProps,
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

  public componentDidUpdate(prevProps: PackItemInfoProps) {
    if (
      prevProps.match.params.itemType !== this.props.match.params.itemType ||
      prevProps.match.params.itemName !== this.props.match.params.itemName
    ) {
      this.initInfo();
    }
  }

  public render() {
    const { match } = this.props;
    const { itemType, itemName } = match.params;
    const { entity, item, recipesProducing, recipesUsedIn } = this.state;

    console.log(
      "[PackItemInfo] Render with",
      this.data.packId,
      itemType,
      itemName,
      item
    );

    if (recipesProducing === null || recipesUsedIn === null) {
      return <div>Loading item info</div>;
    }

    return (
      <div
        style={{
          marginTop: "1em"
        }}
      >
        {(entity && <EntityInfoBox entity={entity} />) ||
          (item && <ItemInfoBox item={item} />)}

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
            <RecipeList recipes={recipesProducing} />
          </div>
        )}
        {recipesUsedIn.length > 0 && (
          <div style={recipeListStyle}>
            <h3>Used in</h3>
            <RecipeList recipes={recipesUsedIn} />
          </div>
        )}
      </div>
    );
  }

  public shouldComponentUpdate(
    nextProps: Readonly<PackItemInfoProps>,
    nextState: Readonly<PackItemInfoState>
  ): boolean {
    console.log("shouldComponentUpdate(", nextProps, nextState, ")");
    return (
      this.props.match.params.itemType !== nextProps.match.params.itemType ||
      this.props.match.params.itemName !== nextProps.match.params.itemName ||
      this.state.item !== nextState.item ||
      this.state.recipesUsedIn !== nextState.recipesUsedIn ||
      this.state.recipesProducing !== nextState.recipesProducing
    );
  }

  private initInfo() {
    const { match } = this.props;
    const { itemType, itemName } = match.params;

    console.time(`initInfo:${itemType}:${itemName}`);

    const item = this.data.findItem(itemType, itemName);
    const entity = this.data.findReferencedPrototype(item);

    this.setState({
      entity,
      item,
      recipesProducing: this.data.recipesProducing(itemType, itemName),
      recipesUsedIn: this.data.recipesUsedIn(itemType, itemName)
    });

    console.timeEnd(`initInfo:${itemType}:${itemName}`);
  }
}
