import * as React from "react";
import { Component } from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import PackConfig from "./Components/PackConfig";
import { PropsRoute } from "./Util";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";

const packs = [
  {
    name: "seablock-f16-normal",
    title: "Seablock F16"
  },
  {
    name: "base-f16-normal",
    title: "Base F16"
  }
];

function PackSelector({ match }: RouteComponentProps) {
  return (
    <div>
      <h1>Packs</h1>
      <ul>
        {packs.map(({ name, title }) => (
          <li key={name}>
            <Link to={`${match.url}/${name}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

class App extends Component<
  {},
  { currentPack: string | null; isOpen: boolean }
> {
  constructor(props: any, context?: any) {
    super(props, context);
    this.state = {
      currentPack: null,
      isOpen: false
    };
  }

  public render() {
    return (
      <div>
        {this.renderHeader()}
        <main>
          <div id="mainContent" className="container-fluid">
            <Switch>
              <Route strict exact path="/pack" component={PackSelector} />
              <PropsRoute
                path="/pack/:packId"
                component={PackConfig}
                onPackChange={this.onPackChange}
              />
            </Switch>
          </div>
        </main>
      </div>
    );
  }

  public toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  private onPackChange = (currentPack: string | null) => {
    this.setState({ currentPack });
    console.log("[App] Pack set to", currentPack);
  };

  private renderHeader() {
    const currentPack = this.state.currentPack;

    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Factorio Data</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {this.renderPackLink(`/pack/${currentPack}`, "Item Search")}
            {this.renderPackLink(`/pack/${currentPack}/tech`, "Technology")}
            {this.renderPackLink(
              `/pack/${currentPack}/itemcats`,
              "Item Categories"
            )}
            {this.renderPackLink(
              `/pack/${currentPack}/recipecat`,
              "Recipe Categories"
            )}
            {this.renderPackLink(`/pack/${currentPack}/info`, "Pack Info")}
            {this.renderPackLink(
              `/pack/${currentPack}/i/item/iron-plate`,
              "Iron Plate"
            )}
            {this.renderPackLink(
              `/pack/${currentPack}/factoratio`,
              "Factoratio"
            )}
            {this.renderPackLink(`/pack/${currentPack}/test`, "Test")}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Config Pack: {currentPack}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/pack/base-f16-normal">F16: Base</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/pack/seablock-f16-normal">F16: Seablock Pack</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  private renderPackLink(path: string, name: string): JSX.Element {
    return (
      <NavItem>
        <NavLink tag={Link} to={path}>
          {name}
        </NavLink>
      </NavItem>
    );
  }
}

export default App;
