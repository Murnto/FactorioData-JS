import { PackLoadedData } from "../packLoadedData";
import * as Solver from "javascript-lp-solver";
import { JsonVariableConstraint } from "javascript-lp-solver";
import { expectedAmount } from "../util";

export interface CalcPos {
  x: number;
  y: number;
}

export interface CalcNode {
  position?: CalcPos;
}

export interface CalcRecipe extends CalcNode, CalcHasCost {
  craftingMachine?: string;
  name: string;
  productionModifier?: number;
  speedModifier?: number;
}

export interface CalcItemNode extends CalcNode {
  name: string;
  position?: CalcPos;
  type: string;
}

export interface CalcHasCost {
  cost?: number;
}

export type CalcInfiniteSource = CalcItemNode & CalcHasCost;

export interface CalcItemTarget extends CalcItemNode {
  amount: number;
}

export interface CalcResultItemAmount {
  amount: number;
  name: string;
  type: string;
}

export interface CalcResultRecipe {
  craftersRequired: number;
  cycles: number;
  ingredients: CalcResultItemAmount[];
  name: string;
  powerConsumed: number;
  results: CalcResultItemAmount[];
}

export interface CalcResult {
  feasible: boolean;
  infiniteConsumed: CalcResultItemAmount[];
  itemTallies: { [name: string]: ItemUsageCount };
  recipes: { [name: string]: CalcResultRecipe };
  totalCost: number;
  totalPower: number;
}

interface ItemUsageCount {
  consumed: number;
  name: string;
  netResult: number;
  produced: number;
  type: string;
}

export class CalcState {
  public recipes: { [name: string]: CalcRecipe } = {};
  public sourceNodes: { [typeConcatName: string]: CalcInfiniteSource } = {};
  public targets: { [typeConcatName: string]: CalcItemTarget } = {};

  public addRecipe(name: string): CalcState {
    this.recipes[name] = {
      name
    };

    return this;
  }

  public addSourceNode(
    type: string,
    name: string,
    opts?: Partial<CalcInfiniteSource>
  ): CalcState {
    this.sourceNodes[`${type}-${name}`] = {
      ...opts,
      name,
      type
    };

    return this;
  }

  public addTarget(
    type: string,
    name: string,
    opts?: Partial<CalcItemTarget>
  ): CalcState {
    this.targets[`${type}-${name}`] = {
      ...opts,
      name,
      type,
      amount: opts ? opts.amount || 1 : 1
    };

    return this;
  }

  public calculate(data: PackLoadedData): CalcResult {
    const alwaysInclude = true;
    const solved = this.solve(data);
    console.log(solved);

    const resultRecipes: { [name: string]: CalcResultRecipe } = {};
    const infiniteConsumed: CalcResultItemAmount[] = [];
    const itemTallies: { [key: string]: ItemUsageCount } = {};

    for (const recipeSpec of Object.values(this.recipes)) {
      const cycles = solved[`recipe-${recipeSpec.name}`];
      if (
        !alwaysInclude &&
        (cycles === undefined || cycles === 0 || cycles === -0)
      ) {
        continue;
      }
      const r = data.recipes[recipeSpec.name];

      const res: CalcResultRecipe = (resultRecipes[r.name] = {
        cycles,
        craftersRequired: 0,
        ingredients: [],
        name: r.name,
        powerConsumed: 0,
        results: []
      });

      for (const i of r.ingredients) {
        res.ingredients.push({
          amount: expectedAmount(i)! * cycles,
          name: i.name,
          type: i.type
        });

        if (itemTallies[`${i.type}-${i.name}`] === undefined) {
          itemTallies[`${i.type}-${i.name}`] = {
            consumed: 0,
            name: i.name,
            netResult: 0,
            produced: 0,
            type: i.type
          };
        }
        if (cycles !== undefined && cycles !== 0 && cycles !== -0) {
          itemTallies[`${i.type}-${i.name}`].consumed +=
            expectedAmount(i)! * cycles;
          itemTallies[`${i.type}-${i.name}`].netResult -=
            expectedAmount(i)! * cycles;
        }
      }
      for (const i of r.results) {
        res.results.push({
          amount: expectedAmount(i)! * cycles,
          name: i.name,
          type: i.type
        });

        if (itemTallies[`${i.type}-${i.name}`] === undefined) {
          itemTallies[`${i.type}-${i.name}`] = {
            consumed: 0,
            name: i.name,
            netResult: 0,
            produced: 0,
            type: i.type
          };
        }
        if (cycles !== undefined && cycles !== 0 && cycles !== -0) {
          itemTallies[`${i.type}-${i.name}`].produced +=
            expectedAmount(i)! * cycles;
          itemTallies[`${i.type}-${i.name}`].netResult +=
            expectedAmount(i)! * cycles;
        }
      }
    }
    for (const inf of Object.values(this.sourceNodes)) {
      if (
        alwaysInclude ||
        solved[`inf-${inf.type}-${inf.name}`] !== undefined
      ) {
        infiniteConsumed.push({
          amount: solved[`inf-${inf.type}-${inf.name}`],
          name: inf.name,
          type: inf.type
        });
      }
    }

    return {
      infiniteConsumed,
      itemTallies,
      feasible: solved.feasible,
      recipes: resultRecipes,
      totalCost: solved.result,
      totalPower: 0
    };
  }

  public export(): string {
    // TODO https://rotemdan.github.io/lzutf8/demo/
    // TODO https://github.com/tcorral/JSONC
    // TODO http://pieroxy.net/blog/pages/lz-string/demo.html
    return btoa(
      JSON.stringify({
        recipes: this.recipes,
        sourceNodes: this.sourceNodes,
        targets: this.targets
      })
    );
  }

  public import(data: string) {
    this.loadJson(JSON.parse(atob(data)));
  }

  public loadJson(obj: any) {
    this.recipes = obj.recipes;
    this.sourceNodes = obj.sourceNodes;
    this.targets = obj.targets;
  }

  private solve(data: PackLoadedData) {
    const constraints: { [key: string]: Solver.JsonConstraint } = {};
    const variables: { [key: string]: JsonVariableConstraint } = {};

    for (const recipeSpec of Object.values(this.recipes)) {
      const r = data.recipes[recipeSpec.name];
      // console.log(r);
      const variable: JsonVariableConstraint = {};
      for (const ingd of r.ingredients) {
        constraints[`${ingd.type}-${ingd.name}`] = { min: 0 };
        variable[`${ingd.type}-${ingd.name}`] = -expectedAmount(ingd)!;
      }
      for (const rslt of r.results) {
        constraints[`${rslt.type}-${rslt.name}`] = { min: 0 };
        variable[`${rslt.type}-${rslt.name}`] = expectedAmount(rslt)!;
      }

      variable.tax = recipeSpec.cost || 1;
      variables[`recipe-${r.name}`] = variable;
    }
    for (const inf of Object.values(this.sourceNodes)) {
      const infItem = data.findItem(inf.type, inf.name)!;

      variables[`inf-${infItem.type}-${infItem.name}`] = { tax: 1 };
      variables[`inf-${infItem.type}-${infItem.name}`][
        `${infItem.type}-${infItem.name}`
      ] = inf.cost || 1;
    }
    for (const want of Object.values(this.targets)) {
      const wantItem = data.findItem(want.type, want.name)!;

      constraints[`${wantItem.type}-${wantItem.name}`] = { min: want.amount };
    }

    const m: Solver.JsonModel = {
      constraints,
      variables,
      opType: "min",
      optimize: "tax"
    };

    // console.log(m);
    // console.log(Solver.ReformatLP(m));

    return Solver.Solve(m);
  }
}
