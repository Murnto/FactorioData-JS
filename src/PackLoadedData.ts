import {Ingredient, Recipe} from "./types/factorio.recipe";
import {Item} from "./types/factorio.item";
import {Prototype} from "./types/factorio.prototype";
import {Technology} from "./types/factorio.technology";

export class PackLoadedData {
    public recipes: { [name: string]: Recipe };
    public technologies: { [name: string]: Technology };
    public items: { [type: string]: { [name: string]: Item } };
    public loadedThings: { [type: string]: { [name: string]: Prototype } } = {};
    public isLoaded: boolean = false;
    public packId: string;
    private itemIsUsedOrProducedByRecipe: { [type: string]: { [name: string]: boolean } } = {};
    private recipesProducingCache: { [type: string]: { [name: string]: Recipe[] } } = {};
    private recipesUsedInCache: { [type: string]: { [name: string]: Recipe[] } } = {};

    public recipesProducing(itemOrType: Item | string, name?: string): Recipe[] {
        if (typeof itemOrType !== "string") {
            name = itemOrType.name;
            itemOrType = itemOrType.type;
        }

        if (!this.recipesProducingCache[itemOrType]) {
            return []
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
            return []
        }

        const result = this.recipesUsedInCache[itemOrType][name as string];

        return result ? result : [];
    }

    public technologyUnlockedBy(recipe: Recipe): Technology[] {
        return Object.values(this.technologies)
            .filter(r =>
                r.effects.some(effect =>
                    effect.type === "unlock-recipe" && effect.recipe === recipe.name
                )
            )
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

        return this.items[itemOrType] ? this.items[itemOrType][name] ? this.items[itemOrType][name] : null : null;
    }

    public findPrototype(type: string, name: string): Prototype | null {
        console.log(`findPrototype(${type}, ${name})`);
        return this.loadedThings[type] ? this.loadedThings[type][name] ? this.loadedThings[type][name] : null : null;
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
                if (item.name.indexOf(search) !== -1 && this.itemIsUsedOrProducedByRecipe[item.type][item.name]) {
                    result.push(item);
                    continue;
                }

                if (item.title) {
                    const title = item.title.toLowerCase();
                    if (title.indexOf(search) !== -1 && this.itemIsUsedOrProducedByRecipe[item.type][item.name]) {
                        result.push(item);
                    }
                }
            }
        });


        return result;
    }

    public onFinishLoading(what: string) {
        console.time('onFinishLoading:' + what);
        const things: { [name: string]: Prototype } = this[what];
        let doubleNested: boolean = false;

        if (what === "items") {
            doubleNested = true;
        }

        if (doubleNested) {
            Object.keys(things).forEach(name => {
                this.addThings(things[name] as any);
            });
        } else {
            this.addThings(things);
        }
        console.timeEnd('onFinishLoading:' + what);
    }

    public onFinishLoadingAll() {
        console.time('onFinishLoadingAll');

        for (const type of Object.keys(this.items)) {
            this.itemIsUsedOrProducedByRecipe[type] = {};
            this.recipesProducingCache[type] = {};
            this.recipesUsedInCache[type] = {};
        }

        for (const recipe of Object.values(this.recipes)) {
            for (const ingd of recipe.ingredients) {
                this.itemIsUsedOrProducedByRecipe[ingd.type][ingd.name] = true;
                if (!this.recipesUsedInCache[ingd.type][ingd.name]) {
                    this.recipesUsedInCache[ingd.type][ingd.name] = [];
                }
                this.recipesUsedInCache[ingd.type][ingd.name].push(recipe)
            }
            for (const rslt of recipe.results) {
                this.itemIsUsedOrProducedByRecipe[rslt.type][rslt.name] = true;
                if (!this.recipesProducingCache[rslt.type][rslt.name]) {
                    this.recipesProducingCache[rslt.type][rslt.name] = [];
                }
                this.recipesProducingCache[rslt.type][rslt.name].push(recipe)
            }
        }

        console.timeEnd('onFinishLoadingAll');
    }

    private addThings(things: { [name: string]: Prototype }) {
        if (Object.keys(things).length === 0) {
            return;
        }

        const type = Object.values(things)[0].type;

        if (this.loadedThings[type] === undefined) {
            this.loadedThings[type] = {};
        }

        Object.values(things).forEach(thing => {
            this.loadedThings[type][thing.name] = thing;
        });
    }
}