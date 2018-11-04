import {PackLoadedData} from "./PackLoadedData";
import {PrototypeHasIcon} from "./types/factorio.prototype";
import {Route, RouteComponentProps, RouteProps} from "react-router";
import * as React from "react";

export interface PassedItem<T> {
    item: T | null
}

export interface PassedNameTypeData {
    type: string
    name: string
    data: PackLoadedData
}

export type Either<T> = (PassedItem<T> | PassedNameTypeData)

export function isPassedNameTypeData<T>(pet: Either<T>): pet is PassedNameTypeData {
    return (pet as any).data instanceof PackLoadedData && (pet as any).item === undefined;
}

export function resolveEitherToPrototype(either: Either<PrototypeHasIcon>): PrototypeHasIcon | null {
    if (isPassedNameTypeData(either)) {
        return either.data.findPrototype(either.type, either.name) as PrototypeHasIcon;
    } else {
        return either.item;
    }
}


function renderMergedProps<P extends RouteComponentProps, S>(component: React.ComponentType<P> | React.ComponentType<any> & P, ...rest: any[]) {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

export function PropsRoute<P extends RouteComponentProps, S>({component, ...rest}: { component: React.ComponentType<P> | React.ComponentType<any> } | RouteProps | P | any) {
    // tslint:disable-next-line
    return (<Route {...rest} render={routeProps =>
            renderMergedProps(component!, routeProps, rest)
        }/>
    );
}

