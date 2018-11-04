import * as React from "react";
import {Prototype} from "../../types/factorio.prototype";
import Popover from "reactstrap/lib/Popover";
import PopoverHeader from "reactstrap/lib/PopoverHeader";
import PopoverBody from "reactstrap/lib/PopoverBody";

let counter = 0;


export class PopoverItemRecipe extends React.Component<{
    item: Prototype,
}> {
    public state = {
        ident: counter++,
        isOpen: false,
    };

    public render() {
        const {children, item} = this.props;
        const {isOpen, ident} = this.state;

        return (
            <span id={"plink-" + ident} onMouseOver={this.setPopover(true)} onMouseLeave={this.setPopover(false)}>
                <Popover placement="right" isOpen={isOpen} target={"plink-" + ident} toggle={this.toggle}>
                    <PopoverHeader>{item.title}</PopoverHeader>
                    <PopoverBody>
                        {item.type}
                        {item.name}
                        {item.title}
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