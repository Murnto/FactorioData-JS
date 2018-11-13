import * as React from "react";
import {Prototype} from "../../types/factorio.prototype";
import Popover from "reactstrap/lib/Popover";
import PopoverHeader from "reactstrap/lib/PopoverHeader";
import PopoverBody from "reactstrap/lib/PopoverBody";
import {PackLoadedData} from "../../PackLoadedData";
import {GroupedItemAmounts} from "./GroupedItemAmounts";

let counter = 0;


export class PopoverItemRecipe extends React.Component<{
    data: PackLoadedData,
    item: Prototype,
}> {
    public state = {
        ident: counter++,
        isOpen: false,
    };

    public render() {
        const {children, item, data} = this.props;
        const {isOpen, ident} = this.state;

        const recipes = data.recipesProducing(item.type, item.name);

        if (recipes.length === 0) {
            return children
        }

        const firstRecipe = recipes[0];
        const rsltInRecipe = firstRecipe.results.find(i => i.name === item.name && i.type === item.type);

        return (
            <span id={"plink-" + ident} onMouseOver={this.setPopover(true)} onMouseLeave={this.setPopover(false)}>
                <Popover placement="right" isOpen={isOpen} target={"plink-" + ident} toggle={this.toggle}>
                    <PopoverHeader>{rsltInRecipe!.amount}x {item.title}</PopoverHeader>
                    <PopoverBody>
                        <div>
                            <span style={{float: "right", marginLeft: 16}}>{firstRecipe.energy_required}s</span>
                        </div>
                        <hr/>
                        <div><GroupedItemAmounts items={firstRecipe.ingredients} data={data}/></div>
                    </PopoverBody>
                </Popover>
                {children}
        </span>
        )
    }

    private toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    private setPopover(to: boolean) {
        return () => {
            this.setState({isOpen: to});
        }
    };
}