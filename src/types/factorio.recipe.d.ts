import {PrototypeHasIcon} from "./factorio.prototype";

export interface Recipe extends PrototypeHasIcon {
    ingredients: Ingredient[];
    results: Ingredient[];
    category: string;
    subgroup: null | string;
    energy_required: number;
    main_product: null | string;
    enabled: boolean;
}

export interface Ingredient {
    type: IngredientType;
    name: string;
    amount: number | null;
    amount_min: number | null;
    amount_max: number | null;
    probability: number | null;
}

export enum IngredientType {
    Fluid = "fluid",
    Item = "item",
}
