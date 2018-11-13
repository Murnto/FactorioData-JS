import {PrototypeHasIcon} from "./factorio.prototype";

export interface Recipe extends PrototypeHasIcon {
    category: string;
    enabled: boolean;
    energy_required: number;
    ingredients: Ingredient[];
    main_product: null | string;
    results: Ingredient[];
    subgroup: null | string;
}

export interface Ingredient {
    amount: number | null;
    amount_max: number | null;
    amount_min: number | null;
    name: string;
    probability: number | null;
    type: IngredientType;
}

export enum IngredientType {
    Fluid = "fluid",
    Item = "item",
}
