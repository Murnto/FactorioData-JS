import * as React from 'react';
import {Component} from 'react';
import {Link, Route, RouteComponentProps, Switch} from 'react-router-dom'
import PackConfig from "./Components/PackConfig";
import {PropsRoute} from "./Util";
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
} from 'reactstrap'

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

function PackSelector({match}: RouteComponentProps) {
    return (
        <div>
            <h1>Packs</h1>
            <ul>
                {packs.map(({name, title}) => (
                    <li key={name}>
                        <Link to={`${match.url}/${name}`}>{title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

class App extends Component<{}, { isOpen: boolean, currentPack: string | null }> {
    constructor(props: any, context?: any) {
        super(props, context);
        this.state = {
            currentPack: null,
            isOpen: false,
        };
    }

    public toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    public render() {
        return (
            <div>
                {this.renderHeader()}
                <main>
                    <div id="mainContent" className="container-fluid">
                        <Switch>
                            <Route strict exact path='/pack' component={PackSelector}/>
                            <PropsRoute path='/pack/:packId' component={PackConfig}
                                        onPackChange={this.onPackChange}/>
                        </Switch>
                    </div>
                </main>
            </div>
        );
    }

    private renderPackLink(path: string, name: string): JSX.Element {
        return (<NavItem><NavLink tag={Link} to={path}>{name}</NavLink></NavItem>)
    }

    private renderHeader() {
        const currentPack = this.state.currentPack;

        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Factorio Data</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {this.renderPackLink(`/pack/${currentPack}`, 'Item Search')}
                        {this.renderPackLink(`/pack/${currentPack}/tech`, 'Technology')}
                        {this.renderPackLink(`/pack/${currentPack}/itemcats`, 'Item Categories')}
                        {this.renderPackLink(`/pack/${currentPack}/recipecat`, 'Recipe Categories')}
                        {this.renderPackLink(`/pack/${currentPack}/info`, 'Pack Info')}
                        {this.renderPackLink(`/pack/${currentPack}/i/item/iron-plate`, 'Iron Plate')}
                        {this.renderPackLink(`/pack/${currentPack}/factoratio`, 'Factoratio')}
                        {this.renderPackLink(`/pack/${currentPack}/test`, 'Test')}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Config Pack: {currentPack}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

    private onPackChange = (currentPack: string | null) => {
        this.setState({currentPack});
        console.log("[App] Pack set to", currentPack)
    };
}

export default App;
