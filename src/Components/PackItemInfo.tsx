import * as React from "react";
import {Item} from "../types/factorio.item";
import {PrototypeIcon} from "./Minor/PrototypeIcon";
import {RecipeList} from "./Minor/RecipeList";
import {PackLoadedData} from "../PackLoadedData";
import {Recipe} from "../types/factorio.recipe";

interface PackItemInfoState {
    amount: string
    item: Item | null
    recipesProducing: Recipe[] | null
    recipesUsedIn: Recipe[] | null
}

export class PackItemInfo extends React.Component <{ match: any, data: PackLoadedData }, PackItemInfoState> {
    constructor(p: any, s?: any) {
        super(p, s);

        this.state = {
            amount: "0",
            item: null,
            recipesProducing: null,
            recipesUsedIn: null,
        };
    }

    public componentDidMount() {
        this.initInfo();
    }

    public componentDidUpdate(prevProps: { match: any, data: PackLoadedData }, prevState: PackItemInfoState) {
        if (prevProps.match.params.itemType !== this.props.match.params.itemType
            || prevProps.match.params.itemName !== this.props.match.params.itemName
            || prevProps.data.packId !== this.props.data.packId) {
            this.initInfo();
        }
    }

    public shouldComponentUpdate(nextProps: Readonly<{ match: any; data: PackLoadedData }>, nextState: Readonly<PackItemInfoState>, nextContext: any): boolean {
        console.log("shouldComponentUpdate(", nextProps, nextState, ")");
        return this.props.match.params.itemType !== nextProps.match.params.itemType
            || this.props.match.params.itemName !== nextProps.match.params.itemName
            || this.props.data.packId !== nextProps.data.packId
            || this.state.amount !== nextState.amount
            || this.state.item !== nextState.item
            || this.state.recipesUsedIn !== nextState.recipesUsedIn
            || this.state.recipesProducing !== nextState.recipesProducing;
    }

    public render() {
        const {match, data} = this.props;
        const {itemType, itemName, packId} = match.params;
        const {amount, item, recipesProducing, recipesUsedIn} = this.state;

        console.log("[PackItemInfo] Render with", packId, itemType, itemName, item);

        if (recipesProducing === null || recipesUsedIn === null) {
            return <div>Loading item info</div>
        }

        return (
            <div>
                {item !== null &&
                <div>
                    <h2><PrototypeIcon item={item}/> {item.title}</h2>
                </div>
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

    private initInfo() {
        const {match, data} = this.props;
        const {itemType, itemName} = match.params;

        console.time(`findRecipes:${itemType}:${itemName}`);
        this.setState({
            item: data.findItem(itemType, itemName),
            recipesProducing: data.recipesProducing(itemType, itemName),
            recipesUsedIn: data.recipesUsedIn(itemType, itemName),
        });
        console.timeEnd(`findRecipes:${itemType}:${itemName}`);
    }
}