import * as React from "react";
import { CSSProperties } from "react";
import { Ingredient } from "../../types/factorio.recipe";
import { PrototypeLink } from "./prototypeLink";
import { PopoverItemRecipe } from "./popoverItemRecipe";
import { PackComponent } from "../../Utils/packComponent";
import { Item } from "../../types/factorio.item";

const groupStyle: CSSProperties = {
  display: "inline-block",
  marginLeft: 4
};

interface GroupedItemAmountsProps {
  items: Ingredient[];
  noPopover?: boolean;
}

interface GroupedItemAmountsState {
  items: Array<Item | null>;
}

export class GroupedItemAmounts extends PackComponent<
  GroupedItemAmountsProps,
  GroupedItemAmountsState
> {
  constructor(p: GroupedItemAmountsProps, s?: GroupedItemAmountsState) {
    super(p, s);

    this.state = {
      items: this.props.items.map(i => this.data.findItem(i))
    };
  }

  public componentDidUpdate(
    prevProps: Readonly<GroupedItemAmountsProps>
  ): void {
    if (prevProps.items !== this.props.items) {
      this.initState();
    }
  }

  public render() {
    const { items } = this.props;

    // console.log("[GroupedItemAmounts] Render with", items, this.data);

    return (
      <span>
        {items.map &&
          items.map((ingd: Ingredient, idx) => {
            const item = this.state.items[idx];

            const inner = (
              <div style={groupStyle} key={ingd.type + ":" + ingd.name}>
                {ingd.amount}x&nbsp;
                <PrototypeLink item={item} hideName />
              </div>
            );

            if (item === null) {
              return inner;
            }

            return (
              <PopoverItemRecipe item={item!} key={ingd.type + ":" + ingd.name}>
                {inner}
              </PopoverItemRecipe>
            );
          })}
      </span>
    );
  }

  private initState() {
    this.setState({
      items: this.props.items.map(i => this.data.findItem(i))
    });
  }
}
