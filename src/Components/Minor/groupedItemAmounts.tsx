import * as React from "react";
import { CSSProperties } from "react";
import { Ingredient } from "../../types/factorio.recipe";
import { PackLoadedData } from "../../packLoadedData";
import { PrototypeLink } from "./prototypeLink";
import { PopoverItemRecipe } from "./popoverItemRecipe";

const groupStyle: CSSProperties = {
  display: "inline-block",
  marginLeft: 4
};

export function GroupedItemAmounts(props: {
  data: PackLoadedData;
  items: Ingredient[];
}) {
  const { items, data } = props;

  // console.log("[GroupedItemAmounts] Render with", items);

  return (
    <span>
      {items.map((ingd: Ingredient) => {
        const item = data.findItem(ingd);
        const inner = (
          <div style={groupStyle} key={ingd.type + ":" + ingd.name}>
            {ingd.amount}x&nbsp;
            <PrototypeLink data={data} item={item} hideName />
          </div>
        );

        if (item === null) {
          return inner;
        }

        return (
          <PopoverItemRecipe
            item={item!}
            data={data}
            key={ingd.type + ":" + ingd.name}
          >
            {inner}
          </PopoverItemRecipe>
        );
      })}
    </span>
  );
}