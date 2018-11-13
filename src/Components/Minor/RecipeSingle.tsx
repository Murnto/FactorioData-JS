import * as React from "react";
import {Recipe} from "../../types/factorio.recipe";
import {GroupedItemAmounts} from "./GroupedItemAmounts";
import {PackLoadedData} from "../../PackLoadedData";
import {PrototypeIcon} from "./PrototypeIcon";
import {PrototypeLink} from "./PrototypeLink";
import {Technology} from "../../types/factorio.technology";
import {Link} from "react-router-dom";

export class RecipeSingle extends React.Component<{
    recipe: Recipe
    data: PackLoadedData
}, {
    techUnlockedBy: Technology[] | null
}> {
    constructor(p: any, s?: any) {
        super(p, s);

        this.state = {
            techUnlockedBy: null,
        }
    }

    public componentDidMount() {
        const {recipe, data} = this.props;
        this.setState({techUnlockedBy: data.technologyUnlockedBy(recipe)})
    }

    // public componentDidUpdate() {
    //     const {recipe, data} = this.props;
    //     this.setState({techUnlockedBy: data.technologyUnlockedBy(recipe)})
    // }

    public render() {
        const {recipe, data} = this.props;
        const {techUnlockedBy} = this.state;

        if (techUnlockedBy === null) {
            return <tr/>
        }

        return (
            <tr>
                <td><PrototypeIcon item={recipe} missingOk={true}/></td>
                <td><Link to={`/pack/${this.props.data.packId}/craftingCat/${recipe.category}`}>{recipe.category}</Link>
                </td>
                <td><a href="javascript:void(0)" onClick={this.addRecipeToGraph}>{recipe.title}</a></td>
                <td><GroupedItemAmounts data={data} items={recipe.ingredients}/></td>
                <td><GroupedItemAmounts data={data} items={recipe.results}/></td>
                <td>{recipe.energy_required}</td>
                <td>
                    {techUnlockedBy.map((object, i) => <PrototypeLink key={object.name} data={data} item={object}/>)}
                </td>
            </tr>
        )
    }

    private addRecipeToGraph = () => {
        fetch('http://127.0.0.1:8500/add_recipe', {
            body: this.props.recipe.name,
            method: 'POST',
        }).then((r) => {
            console.log(r.ok, r.status, r)
        })
    };
}