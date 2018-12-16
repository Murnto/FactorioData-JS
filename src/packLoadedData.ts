import { Ingredient, Recipe } from "./types/factorio.recipe";
import { Item } from "./types/factorio.item";
import { Prototype, PrototypeHasIcon } from "./types/factorio.prototype";
import { Technology } from "./types/factorio.technology";
import { AssemblingMachine } from "./types/factorio.assemblignmachine";
import { Furnace } from "./types/factorio.furnace";

const itemTypes = [
  "fluid",
  "item",
  "gun",
  "blueprint",
  "deconstruction-item",
  "ammo",
  "capsule",
  "rail-planner",
  "module",
  "armor",
  "tool",
  "mining-tool",
  "repair-tool"
];

interface KnownThings {
  // 'mining-drill': {[name: string]: MiningDrill}
  "assembling-machine": { [name: string]: AssemblingMachine };
  furnace: { [name: string]: Furnace };
  recipe: { [name: string]: Recipe };
  technology: { [name: string]: Technology };

  [type: string]: { [name: string]: Prototype };
}

export class PackLoadedData {
  public isLoaded: boolean = false;
  public items: { [type: string]: { [name: string]: Item } };
  public link = {
    toItem: (itemOrType: PrototypeHasIcon | string, name?: string) => {
      if (typeof itemOrType !== "string") {
        return `/pack/${this.packId}/i/${itemOrType.type}/${itemOrType.name}`;
      }

      return `/pack/${this.packId}/i/${itemOrType}/${name}`;
    },
    toTech: (tech: Technology | string) =>
      `/pack/${this.packId}/tech/${typeof tech !== "string" ? tech.name : tech}`
  };
  public loadedThings: KnownThings = {} as any;
  public packId: string;
  public recipes: { [name: string]: Recipe };
  public technologies: { [name: string]: Technology };
  public technologiesAllowed: { [name: string]: Technology[] } = {};
  public technologyRequiredFor: { [recipeName: string]: Technology[] } = {};
  private itemIsUsedOrProducedByRecipe: {
    [type: string]: { [name: string]: boolean };
  } = {};
  private recipesProducingCache: {
    [type: string]: { [name: string]: Recipe[] };
  } = {};
  private recipesUsedInCache: {
    [type: string]: { [name: string]: Recipe[] };
  } = {};

  public craftersWithCategory(
    category: string
  ): Array<AssemblingMachine | Furnace> {
    const res: Array<AssemblingMachine | Furnace> = [];

    for (const as of Object.values(this.loadedThings["assembling-machine"])) {
      if (as.crafting_categories.indexOf(category) !== -1) {
        res.push(as);
      }
    }

    for (const frn of Object.values(this.loadedThings.furnace)) {
      if (frn.crafting_categories.indexOf(category) !== -1) {
        res.push(frn);
      }
    }

    return res;
  }

  public findItem(itemOrType: Ingredient | string, name?: string): Item | null {
    if (typeof itemOrType !== "string") {
      name = itemOrType.name;
      itemOrType = itemOrType.type;
    }
    if (typeof name === "undefined") {
      console.log(`[PackLoadedData] findItem(${itemOrType}, ${name})`);
      return null;
    }

    return this.items[itemOrType]
      ? this.items[itemOrType][name]
        ? this.items[itemOrType][name]
        : null
      : null;
  }

  public findPrototype(type: string, name: string): Prototype | null {
    console.log(`findPrototype(${type}, ${name})`);
    return this.loadedThings[type]
      ? this.loadedThings[type][name]
        ? this.loadedThings[type][name]
        : null
      : null;
  }

  public onFinishLoadingAll() {
    console.time("onFinishLoadingAll");

    (window as any).pd = this;

    this.technologies = this.loadedThings.technology;
    this.recipes = this.loadedThings.recipe;
    this.items = {};

    for (const type of itemTypes) {
      this.items[type] = this.loadedThings[type] as any;

      this.itemIsUsedOrProducedByRecipe[type] = {};
      this.recipesProducingCache[type] = {};
      this.recipesUsedInCache[type] = {};
    }

    console.time("preprocessTech");
    for (const tech of Object.values(this.technologies)) {
      if (tech.prerequisites === undefined) {
        continue;
      }

      if (tech.prerequisites) {
        for (const pre of tech.prerequisites) {
          const preTech = this.technologies[pre];

          if (preTech !== undefined) {
            if (this.technologiesAllowed[pre] === undefined) {
              this.technologiesAllowed[pre] = [];
            }

            this.technologiesAllowed[pre].push(tech);
          }
        }
      }

      if (tech.effects) {
        for (const effect of tech.effects) {
          if (effect.type === "unlock-recipe") {
            const rName = effect.recipe!;

            if (this.technologyRequiredFor[rName] === undefined) {
              this.technologyRequiredFor[rName] = [];
            }

            this.technologyRequiredFor[rName].push(tech);
          }
        }
      }
    }
    console.timeEnd("preprocessTech");

    for (const recipe of Object.values(this.recipes)) {
      for (const ingd of recipe.ingredients) {
        this.itemIsUsedOrProducedByRecipe[ingd.type][ingd.name] = true;
        if (!this.recipesUsedInCache[ingd.type][ingd.name]) {
          this.recipesUsedInCache[ingd.type][ingd.name] = [];
        }
        this.recipesUsedInCache[ingd.type][ingd.name].push(recipe);
      }
      for (const rslt of recipe.results) {
        this.itemIsUsedOrProducedByRecipe[rslt.type][rslt.name] = true;
        if (!this.recipesProducingCache[rslt.type][rslt.name]) {
          this.recipesProducingCache[rslt.type][rslt.name] = [];
        }
        this.recipesProducingCache[rslt.type][rslt.name].push(recipe);
      }
    }

    console.timeEnd("onFinishLoadingAll");
  }

  public recipesProducing(itemOrType: Item | string, name?: string): Recipe[] {
    if (typeof itemOrType !== "string") {
      name = itemOrType.name;
      itemOrType = itemOrType.type;
    }

    if (!this.recipesProducingCache[itemOrType]) {
      return [];
    }

    const result = this.recipesProducingCache[itemOrType][name as string];

    return result ? result : [];
  }

  public recipesUsedIn(itemOrType: Item | string, name?: string): Recipe[] {
    if (typeof itemOrType !== "string") {
      name = itemOrType.name;
      itemOrType = itemOrType.type;
    }

    if (!this.recipesUsedInCache[itemOrType]) {
      return [];
    }

    const result = this.recipesUsedInCache[itemOrType][name as string];

    return result ? result : [];
  }

  public searchItems(search: string): Item[] {
    const result: Item[] = [];
    search = search.toLowerCase();

    if (search.length <= 1) {
      return [];
    }

    Object.keys(this.items).forEach(type => {
      for (const item of Object.values(this.items[type])) {
        // console.log(item.name, item.name.indexOf(search));
        if (
          item.name.indexOf(search) !== -1 &&
          this.itemIsUsedOrProducedByRecipe[item.type][item.name]
        ) {
          result.push(item);
          continue;
        }

        if (item.title) {
          const title = item.title.toLowerCase();
          if (
            title.indexOf(search) !== -1 &&
            this.itemIsUsedOrProducedByRecipe[item.type][item.name]
          ) {
            result.push(item);
          }
        }
      }
    });

    return result;
  }

  public technologyUnlockedBy(recipe: Recipe): Technology[] {
    return this.technologyRequiredFor[recipe.name] || [];
  }
}
