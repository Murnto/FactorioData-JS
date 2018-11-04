import * as React from "react";
import {Item} from "../types/factorio.item";
import {PrototypeIcon} from "./Minor/PrototypeIcon";
import {RecipeList} from "./Minor/RecipeList";
import {PackLoadedData} from "../PackLoadedData";


export class PackItemInfo extends React.Component <{ match: any, data: PackLoadedData }, {}> {

    public shouldComponentUpdate(nextProps: Readonly<{ match: any; data: PackLoadedData }>, nextState: Readonly<{}>, nextContext: any): boolean {
        // console.log("shouldComponentUpdate(", nextProps, nextState, ")");
        return this.props.match.params.itemType !== nextProps.match.params.itemType
            || this.props.match.params.itemName !== nextProps.match.params.itemName
            || this.props.data.packId !== nextProps.data.packId;
    }

    public render() {
        const {match, data} = this.props;
        const {itemType, itemName, packId} = match.params;
        const itemObj: Item | null = data.findItem(itemType, itemName);

        console.log("[PackItemInfo] Render with", packId, itemType, itemName, itemObj);

        console.time(`findRecipes:${itemType}:${itemName}`);
        const recipesProducing = data.recipesProducing(itemType, itemName);
        const recipesUsedIn = data.recipesUsedIn(itemType, itemName);
        console.timeEnd(`findRecipes:${itemType}:${itemName}`);

        return (
            <div>
                {itemObj !== null &&
                <h2><PrototypeIcon item={itemObj}/> {itemObj.title}</h2>
                ||
                <h2>{itemType}:{itemName}</h2>
                }

                {recipesProducing.length > 0 && (
                    <div>
                        <h3>Recipes</h3>
                        <RecipeList data={data} recipes={recipesProducing}/>
                    </div>
                )}
                {recipesUsedIn.length > 0 && (
                    <div>
                        <h3>Used in</h3>
                        <RecipeList data={data} recipes={recipesUsedIn}/>
                    </div>
                )}
            </div>
        )
    }
}