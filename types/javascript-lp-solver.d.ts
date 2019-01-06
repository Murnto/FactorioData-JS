declare module "javascript-lp-solver" {
    class Constraint {
        constructor(rhs: any, isUpperBound: any, index: any, model: Model)

        addTerm(coefficient: any, variable: any): void

        removeTerm(term: any): void

        setRightHandSide(newRhs: any): void

        setVariableCoefficient(newCoefficient: any, variable: any): void

        relax(weight: any, priority: any): void
    }

    enum PriorityEnum {
        required = "required",
        strong = "strong",
        medium = "medium",
        weak = "weak",
    }

    type Priority = PriorityEnum | number

    class Model {
        constructor(precision?: number, name?: string)

        minimize(): Model

        maximize(): Model

        addConstraint(constraint: Constraint): void

        smallerThan(rhs: number): Constraint

        greaterThan(rhs: number): Constraint

        equal(rhs: number): Equality

        addVariable(cost: number, id: string, isInteger: boolean, isUnrestricted: boolean, priority: Priority): Variable

        removeConstraint(constraint: Constraint): void

        removeVariable(variable: Variable): void

        updateRightHandSide(constraint: Constraint, difference: number): void

        updateConstraintCoefficient(constraint: Constraint, variable: Variable, difference: number): void

        setCost(cost: number, variable: Variable): void

        loadJson(jsonModel: JsonModel): void

        getNumberOfIntegerVariables(): number

        solve(): void

        isFeasible(): boolean

        save(): void

        restore(): void

        activateMIRCuts(useMIRCuts: any): void

        debug(debugCheckForCycles: any): void

        log(message: any): void
    }

    class Tableau {
        constructor(precision: number)

        solve(): void

        setOptionalObjective(priority: any, column: any, cost: any): void

        initialize(width: any, height: any, variables: any, unrestrictedVars: any): void

        setModel(model: any): void

        getNewElementIndex(): void

        density(): void

        setEvaluation(): void

        getSolution(): void

        // from dynamicModification
        updateVariableValues(): void

        updateRightHandSide(constraint: any, difference: any): void

        updateConstraintCoefficient(constraint: any, variable: any, difference: any): void

        updateCost(variable: any, difference: any): void

        addConstraint(constraint: any): void

        removeConstraint(constraint: any): void

        addVariable(variable: any): void

        removeVariable(variable: any): void
    }

    class Term {
        constructor(variable: Variable, coefficient: any)
    }

    class Variable {
        constructor(id: any, cost: any, index: any, priority: any)

    }

    class Equality {
        constructor(constraintUpper: Constraint, constraintLower: Constraint)

        isEquality: boolean;

        addTerm(coefficient: number, variable: Variable): void

        removeTerm(term: any): void

        setRightHandSide(rhs: any): void

        relax(weight: any, priority: any): void
    }

    export function Solve(model: Model | JsonModel, precision?: number, full?: boolean, validate?: boolean): Solution
    export function ReformatLP(model: Model | JsonModel): any

    interface Solution {
        feasible: boolean
        result: number
        bounded: boolean

        [key: string]: any
    }

    export interface JsonVariableConstraint {
        [key: string]: number
    }

    interface _JsonConstraint {
        equal?: number
        weight?: number
        priority?: number
    }

    interface JsonMinConstraint extends _JsonConstraint {
        min: number
    }

    interface JsonMaxConstraint extends _JsonConstraint {
        max: number
    }

    export type JsonConstraint = JsonMaxConstraint | JsonMinConstraint

    export interface JsonModel {
        opType?: string
        variables: { [key: string]: JsonVariableConstraint }
        constraints: { [key: string]: JsonConstraint }
        ints?: { [key: string]: number }
        binaries?: { [key: string]: number }
        unrestricted?: { [key: string]: number }
        optimize: string
    }
}
