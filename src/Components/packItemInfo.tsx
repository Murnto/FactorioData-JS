import * as React from "react";
import { Item } from "../types/factorio.item";
import { PrototypeIcon } from "./Minor/prototypeIcon";
import { RecipeList } from "./Minor/recipeList";
import { PackLoadedData } from "../packLoadedData";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Form from "reactstrap/lib/Form";
import Button from "reactstrap/lib/Button";
import { Recipe } from "../types/factorio.recipe";

interface PackItemInfoState {
  amount: string;
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
      amount: "0",
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
    const { amount, item, recipesProducing, recipesUsedIn } = this.state;

    console.log("[PackItemInfo] Render with", packId, itemType, itemName, item);

    if (recipesProducing === null || recipesUsedIn === null) {
      return <div>Loading item info</div>;
    }

    return (
      <div>
        {(item !== null && (
          <div>
            <h2>
              <PrototypeIcon item={item} /> {item.title}
            </h2>
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                  type="number"
                  name="number"
                  value={amount}
                  onChange={this.onInput}
                  placeholder="1"
                />
              </FormGroup>

              <Button onClick={this.addItemToGraph}>Add</Button>
            </Form>
          </div>
        )) || (
          <h2>
            {itemType}:{itemName}
          </h2>
        )}

        {recipesProducing.length > 0 && (
          <div>
            <h3>Recipes</h3>
            <RecipeList data={data} recipes={recipesProducing} />
          </div>
        )}
        {recipesUsedIn.length > 0 && (
          <div>
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
      this.state.amount !== nextState.amount ||
      this.state.item !== nextState.item ||
      this.state.recipesUsedIn !== nextState.recipesUsedIn ||
      this.state.recipesProducing !== nextState.recipesProducing
    );
  }

  private addItemToGraph = () => {
    const { match, data } = this.props;
    const { itemType, itemName } = match.params;
    const itemObj = data.findItem(itemType, itemName);

    if (itemObj === null) {
      return;
    }

    fetch("http://127.0.0.1:8500/add_item", {
      body: `${itemObj.type}/${itemObj.name}/${this.state.amount}`,
      method: "POST",
      mode: "no-cors"
    }).then(r => {
      console.log(r.ok, r.status, r);
    });
  };

  private initInfo() {
    const { match, data } = this.props;
    const { itemType, itemName } = match.params;

    console.time(`findRecipes:${itemType}:${itemName}`);
    this.setState({
      item: data.findItem(itemType, itemName),
      recipesProducing: data.recipesProducing(itemType, itemName),
      recipesUsedIn: data.recipesUsedIn(itemType, itemName)
    });
    console.timeEnd(`findRecipes:${itemType}:${itemName}`);
  }

  private onInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      amount: e.currentTarget.value
    });
  };
}
