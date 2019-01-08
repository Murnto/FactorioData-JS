import * as React from "react";
import { Container } from "reactstrap";
import Button from "reactstrap/lib/Button";
import Popover from "reactstrap/lib/Popover";
import PopoverHeader from "reactstrap/lib/PopoverHeader";
import PopoverBody from "reactstrap/lib/PopoverBody";
import { PrototypeIcon } from "./Minor/prototypeIcon";
import { PrototypeLink } from "./Minor/prototypeLink";
import { PopoverItemRecipe } from "./Minor/popoverItemRecipe";
import { PackComponent } from "../Utils/packComponent";
import { RouteComponentProps } from "react-router";

export class PackComponentTest extends PackComponent<RouteComponentProps> {
  public state = {
    popoverOpen: false
  };

  public render() {
    const item = this.data.findPrototype("item", "iron-plate");

    return (
      <Container>
        {this.renderPopoverTest()}
        <PopoverItemRecipe item={item!}>
          <PrototypeIcon item={item as any} />
        </PopoverItemRecipe>
        <PrototypeLink type="item" name="iron-plate" />
      </Container>
    );
  }

  private renderPopoverTest() {
    return (
      <div>
        <h5>renderPopoverTest</h5>
        <span
          onMouseOver={this.setPopover(true)}
          onMouseLeave={this.setPopover(false)}
        >
          <Button id="Popover1">Launch Popover</Button>
          <Popover
            placement="right"
            isOpen={this.state.popoverOpen}
            target="Popover1"
            toggle={this.toggle}
          >
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>
              Sed posuere consectetur est at lobortis. Aenean eu leo quam.
              Pellentesque ornare sem lacinia quam venenatis vestibulum.
            </PopoverBody>
          </Popover>
        </span>
      </div>
    );
  }

  private setPopover(to: boolean) {
    return () => {
      this.setState({ popoverOpen: to });
    };
  }
  private toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  };
}
