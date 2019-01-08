import { PackLoadedData } from "./packLoadedData";
import { PrototypeHasIcon } from "./types/factorio.prototype";
import { Route, RouteComponentProps, RouteProps } from "react-router";
import * as React from "react";
import { Ingredient } from "./types/factorio.recipe";

export interface PassedItem<T> {
  item: T | null;
}

export interface PassedNameTypeData {
  name: string;
  type: string;
}

export type Either<T> = PassedItem<T> | PassedNameTypeData;

export function isPassedNameTypeData<T>(
  pet: Either<T>
): pet is PassedNameTypeData {
  return (
    (pet as any).name !== undefined &&
    (pet as any).type !== undefined &&
    (pet as any).item === undefined
  );
}

export function resolveEitherToPrototype(
  data: PackLoadedData,
  either: Either<PrototypeHasIcon>
): PrototypeHasIcon | null {
  if (isPassedNameTypeData(either)) {
    return data.findPrototype(either.type, either.name) as PrototypeHasIcon;
  }

  return either.item;
}

function renderMergedProps<P extends RouteComponentProps>(
  component: React.ComponentType<P> | React.ComponentType<any> & P,
  ...rest: any[]
) {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
}

export function PropsRoute<P extends RouteComponentProps>({
  component,
  ...rest
}:
  | { component: React.ComponentType<P> | React.ComponentType<any> }
  | RouteProps
  | P
  | any) {
  const renderFunc = (routeProps: any) =>
    renderMergedProps(component!, routeProps, rest);

  return <Route {...rest} render={renderFunc} />;
}

export function expectedAmount(item: Ingredient): number | null {
  if (item.probability !== null && item.probability !== undefined) {
    if (item.amount !== null && item.amount !== undefined) {
      return item.amount * item.probability;
    }
    if (
      item.amount_max !== null &&
      item.amount_max !== undefined &&
      item.amount_min !== null &&
      item.amount_min !== undefined
    ) {
      return ((item.amount_min + item.amount_max) / 2) * item.probability;
    }

    return null;
  }
  if (item.amount !== null && item.amount !== undefined) {
    return item.amount;
  }
  if (
    item.amount_max !== null &&
    item.amount_max !== undefined &&
    item.amount_min !== null &&
    item.amount_min !== undefined
  ) {
    return (item.amount_min + item.amount_max) / 2;
  }
  return null;
}
