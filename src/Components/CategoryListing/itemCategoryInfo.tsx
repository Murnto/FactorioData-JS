import * as React from "react";
import { RouteComponentProps } from "react-router";
import { PrototypeHasIcon } from "../../types/factorio.prototype";
import { Container } from "reactstrap";
import { PackComponent } from "../../Utils/packComponent";
import { Item } from "../../types/factorio.item";
import { PrototypeLink } from "../Minor/prototypeLink";
import { extractField, toPercentage } from "../../util";
import { PackLoadedData } from "../../packLoadedData";

const itemLink: ItemCategoryField = {
  field: ".item",
  formatter: (_, item) => <PrototypeLink item={item} />,
  title: "Item"
};

export const itemCategories: { [name: string]: ItemCategory } = {
  fuel: {
    name: "fuel",
    title: "Fuel",

    itemSelectors: [
      {
        exists: true,
        key: "fuel_value"
      }
    ],

    fields: [
      itemLink,
      { field: "fuel_category", title: "Fuel category" },
      { field: "fuel_value", title: "Fuel value" },
      {
        field: "fuel_acceleration_multiplier",
        formatter: toPercentage,
        title: "Acceleration"
      },
      {
        field: "fuel_top_speed_multiplier",
        formatter: toPercentage,
        title: "Top speed"
      },
      {
        field: ".emissions",
        formatter: (_, item: any) => {
          const val =
            item.fuel_emissions_multiplier || item.emissions_multiplier;

          return val ? toPercentage(val) : "";
        },
        title: "Emissions"
      }
    ]
  }
};

interface ItemCategoryData {
  entity: PrototypeHasIcon | null;
  fields: { [field: string]: any };
  item: Item;
}

interface ItemCategorySelector {
  exists?: boolean;
  key: "type" | string;
  value?: string;
}

interface ItemCategoryField {
  field: string;
  formatter?: (
    value: any,
    item: Item,
    entity: PrototypeHasIcon | null
  ) => React.ReactNode;
  from?: "entity" | "item";
  title?: string;
}

interface ItemCategory {
  entitySelectors?: ItemCategorySelector[];
  fields: ItemCategoryField[];
  itemSelectors?: ItemCategorySelector[];
  name: string;
  title: string;
}

export function matchesSelectors(
  obj: Item | PrototypeHasIcon | null,
  selectors: ItemCategorySelector[] | undefined
): boolean {
  if (selectors !== undefined) {
    if (obj === null) {
      return selectors.length === 0;
    }

    for (const selector of selectors) {
      const val = extractField(selector.key, obj);

      if (val === null || val === undefined) {
        if (selector.exists !== false) {
          return false; // item not found, but wanted :(
        }
        continue; // item not found, not wanted :)
      }
      if (selector.exists === false) {
        return false; // item found, but not wanted to be :(
      }
      if (selector.exists === true) {
        continue; // item not found, wanted to exist :)
      }

      if (selector.value === undefined) {
        console.log(obj, selectors);

        throw new Error("selector.value expected to be truthy");
      }
    }
  }

  return true;
}

export function extractCategoryItems(
  data: PackLoadedData,
  categorySpec: ItemCategory,
  firstOnly: boolean = false
): ItemCategoryData[] {
  const items: ItemCategoryData[] = [];

  for (const itemsByType of Object.values(data.items)) {
    for (const item of Object.values(itemsByType)) {
      const entity = data.findReferencedPrototype(item);

      if (
        matchesSelectors(item, categorySpec.itemSelectors) &&
        matchesSelectors(entity, categorySpec.entitySelectors)
      ) {
        const fields: { [field: string]: any } = {};

        for (const fieldSpec of categorySpec.fields) {
          if (fieldSpec.from === "entity" && entity === null) {
            continue;
          }

          const fieldObj = fieldSpec.from === "entity" ? entity : item;
          const val = extractField(fieldSpec.field, fieldObj);

          fields[fieldSpec.field] =
            fieldSpec.formatter &&
            ((val !== null && val !== undefined) ||
              fieldSpec.field.startsWith("."))
              ? fieldSpec.formatter(val, item, entity)
              : val;
        }

        items.push({ item, entity, fields });

        if (firstOnly) {
          return items;
        }
      }
    }
  }

  return items;
}

type ItemCategoryInfoProps = RouteComponentProps<{ category: string }>;

interface ItemCategoryInfoState {
  categorySpec: ItemCategory | null;
  items: ItemCategoryData[];
}

export class ItemCategoryInfo extends PackComponent<
  ItemCategoryInfoProps,
  ItemCategoryInfoState
> {
  constructor(p: any, s?: any) {
    super(p, s);

    this.state = {
      categorySpec: null,
      items: []
    };
  }

  public componentDidMount() {
    const categorySpec = itemCategories[this.props.match.params.category];
    console.log(categorySpec);

    for (const field of categorySpec.fields) {
      if (field.title === undefined) {
        field.title = field.field; // TODO
      }
    }

    console.time("[ItemCategoryInfo] init");
    const items = extractCategoryItems(this.data, categorySpec);
    console.timeEnd("[ItemCategoryInfo] init");

    this.setState({ categorySpec, items });
  }

  public render() {
    const { match } = this.props;
    const { category } = match.params;
    const { categorySpec, items } = this.state;

    console.log("[ItemCategoryInfo] Render with", category, categorySpec);

    if (categorySpec === null || items === null) {
      return <span />;
    }

    return (
      <Container>
        <table id="table" className="table">
          <thead>
            <tr>
              {categorySpec.fields.map(fieldSpec => (
                <th key={fieldSpec.field}>{fieldSpec.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(obj => (
              <tr key={`${obj.item.type}-${obj.item.name}`}>
                {categorySpec.fields.map(fieldSpec => (
                  <td key={fieldSpec.field}>{obj.fields[fieldSpec.field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
  }

  public shouldComponentUpdate(
    nextProps: Readonly<ItemCategoryInfoProps>,
    nextState: Readonly<ItemCategoryInfoState>
  ): boolean {
    return (
      this.props.match.params.category !== nextProps.match.params.category ||
      this.state.categorySpec !== nextState.categorySpec ||
      this.state.items !== nextState.items
    );
  }
}
