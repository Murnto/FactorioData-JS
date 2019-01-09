import * as React from "react";
import { RouteComponentProps } from "react-router";
import { PrototypeHasIcon } from "../../types/factorio.prototype";
import { Container } from "reactstrap";
import { PackComponent } from "../../Utils/packComponent";
import { Item } from "../../types/factorio.item";
import { PrototypeLink } from "../Minor/prototypeLink";
import { extractField, toDegrees, toPercentage } from "../../util";
import { PackLoadedData } from "../../packLoadedData";

const itemLink: ItemCategoryField = {
  field: ".item",
  formatter: (_, item) => <PrototypeLink item={item} />,
  title: "Item"
};

const physSize: ItemCategoryField = {
  field: "selection_box",
  formatter: val =>
    `${Math.ceil(
      Math.abs(val[0][0]) + Math.abs(val[1][0]) - 0.002
    )}x${Math.ceil(Math.abs(val[0][1]) + Math.abs(val[1][1]) - 0.002)}`,
  from: "entity",
  title: "Size"
};

export const itemCategories: { [name: string]: ItemCategory } = {
  accumulator: {
    name: "accumulator",
    title: "Accumulators",

    entitySelectors: [
      {
        key: "type",
        value: "accumulator"
      }
    ],

    fields: [
      itemLink,
      {
        field: "charge_cooldown",
        from: "entity",
        title: "Charge CD"
      },
      {
        field: "discharge_cooldown",
        from: "entity",
        title: "Discharge CD"
      },
      {
        field: "energy_source.type",
        from: "entity",
        title: "Energy type"
      },
      {
        field: "energy_source.buffer_capacity",
        from: "entity",
        title: "Capacity"
      },
      {
        field: "energy_source.usage_priority",
        from: "entity",
        title: "Usage priority"
      },
      {
        field: "energy_source.input_flow_limit",
        from: "entity",
        title: "Input rate"
      },
      {
        field: "energy_source.output_flow_limit",
        from: "entity",
        title: "Output rate"
      }
    ]
  },
  assemblingMachine: {
    name: "assemblingMachine",
    title: "Assembling machines",

    entitySelectors: [
      {
        key: "type",
        value: "assembling-machine"
      }
    ],

    fields: [
      itemLink,
      { field: "crafting_speed", from: "entity", title: "Speed" },
      physSize,
      {
        field: "crafting_categories",
        formatter: (val: string[]) => val.join(", "),
        from: "entity",
        title: "Categories"
      },
      { field: "ingredient_count", from: "entity", title: "Max ingredients" },
      {
        field: "module_specification.module_slots",
        from: "entity",
        title: "Max modules"
      },
      { field: "energy_usage", from: "entity", title: "Energy usage" },
      { field: "energy_source.type", from: "entity", title: "Energy type" },
      { field: "energy_source.emissions", from: "entity", title: "Emissions" },
      {
        field: "energy_source.usage_priority",
        from: "entity",
        title: "Energy priority"
      }
    ]
  },
  boiler: {
    name: "boiler",
    title: "Boilers",

    entitySelectors: [
      {
        key: "type",
        value: "boiler"
      }
    ],

    fields: [
      itemLink,
      {
        field: "energy_consumption",
        from: "entity",
        title: "Energy consumption"
      },
      {
        field: "target_temperature",
        formatter: toDegrees,
        from: "entity",
        title: "Target temp"
      },
      {
        field: "burning_cooldown",
        from: "entity",
        title: "Burning CD"
      }
    ]
  },
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
  },
  furnace: {
    name: "furnace",
    title: "Furnaces",

    entitySelectors: [
      {
        key: "type",
        value: "furnace"
      }
    ],

    fields: [
      itemLink,
      { field: "crafting_speed", from: "entity", title: "Speed" },
      physSize,
      {
        field: "crafting_categories",
        formatter: (val: string[]) => val.join(", "),
        from: "entity",
        title: "Categories"
      },
      { field: "result_inventory_size", from: "entity", title: "Result size" },
      { field: "source_inventory_size", from: "entity", title: "Source size" },
      {
        field: "module_specification.module_slots",
        from: "entity",
        title: "Max modules"
      },
      { field: "energy_usage", from: "entity", title: "Energy usage" },
      { field: "energy_source.type", from: "entity", title: "Energy type" },
      { field: "energy_source.emissions", from: "entity", title: "Emissions" },
      {
        field: "energy_source.usage_priority",
        from: "entity",
        title: "Energy priority"
      }
    ]
  },
  generator: {
    name: "generator",
    title: "Generators",

    entitySelectors: [
      {
        key: "type",
        value: "generator"
      }
    ],

    fields: [
      itemLink,
      {
        field: "effectivity",
        formatter: toPercentage,
        from: "entity",
        title: "Effectivity"
      },
      {
        field: "maximum_temperature",
        formatter: toDegrees,
        from: "entity",
        title: "Max temp"
      },
      {
        field: "fluid_usage_per_tick",
        formatter: val => val * 60,
        from: "entity",
        title: "Fluid/sec"
      }
    ]
  },
  miningDrill: {
    name: "miningDrill",
    title: "Mining drills",

    entitySelectors: [
      {
        key: "type",
        value: "mining-drill"
      }
    ],

    fields: [
      itemLink,
      { field: "mining_speed", from: "entity", title: "Speed" },
      { field: "mining_power", from: "entity", title: "Mining power" },
      physSize,
      {
        field: "resource_categories",
        formatter: (val: string[]) => val.join(", "),
        from: "entity",
        title: "Categories"
      },
      { field: "resource_searching_radius", from: "entity", title: "Radius" },
      { field: "storage_slots", from: "entity", title: "Slots" },
      {
        field: "module_specification.module_slots",
        from: "entity",
        title: "Max modules"
      },
      { field: "energy_usage", from: "entity", title: "Energy usage" },
      { field: "energy_source.type", from: "entity", title: "Energy type" },
      { field: "energy_source.emissions", from: "entity", title: "Emissions" },
      {
        field: "energy_source.usage_priority",
        from: "entity",
        title: "Energy priority"
      }
    ]
  },
  solarPanel: {
    name: "solarPanel",
    title: "Solar panels",

    entitySelectors: [
      {
        key: "type",
        value: "solar-panel"
      }
    ],

    fields: [
      itemLink,
      { field: "production", from: "entity", title: "Production" },
      physSize,
      { field: "energy_source.type", from: "entity", title: "Energy type" },
      {
        field: "energy_source.usage_priority",
        from: "entity",
        title: "Usage priority"
      }
    ]
  },
  undergroundPipe: {
    name: "undergroundPipe",
    title: "Underground pipes",

    entitySelectors: [
      {
        key: "type",
        value: "pipe-to-ground"
      }
    ],

    fields: [
      itemLink,
      physSize,
      {
        field: "fluid_box.pipe_connections",
        formatter: (val: any[]) => {
          for (const connection of val) {
            if (connection.max_underground_distance !== undefined) {
              return connection.max_underground_distance.toString();
            }
          }

          return "";
        },
        from: "entity",
        title: "Max underground distance"
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

      if (selector.value !== val) {
        return false; // value mismatch
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
      <Container style={{ marginTop: "1em" }}>
        <h3>{categorySpec.title}</h3>

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
