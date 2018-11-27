import * as React from "react";
import {RouteComponentProps, Switch} from 'react-router-dom'
import {PackLoadedData} from "../PackLoadedData";
import {PackItemSearch} from "./PackItemSearch";
import {PropsRoute} from "../Util";
import {PackTechList} from "./PackTechList";
import {PackItemInfo} from "./PackItemInfo";
import {PackComponentTest} from "./PackComponentTest";
import {CraftingCategoryInfo} from "./CraftingCategoryInfo";
import {TechInfo} from "./TechInfo";

export function PackInfo(props: RouteComponentProps) {
    const {match} = props as any;
    console.log("PI with", match.params.packId, match);

    return (
        <div>
            <h2>Info</h2>
        </div>
    )
}

interface PackConfigProps extends RouteComponentProps {
    match: any
    onPackChange: (packId: string) => void
}

interface PackConfigState {
    data: PackLoadedData
    isLoaded: boolean
}

export default class PackConfig extends React.Component
    <PackConfigProps, PackConfigState> {

    constructor(props: any, context?: any) {
        super(props, context);
        console.log("[PackConfig] initialized");
        this.state = {data: new PackLoadedData, isLoaded: false};

        (window as any).pd = this.state.data; // FIXME DEBUG
    }

    public async componentDidMount() {
        const packId = this.props.match.params.packId;
        const promises: Array<Promise<void>> = [];

        promises.push(this.loadDataItem("recipes"));
        promises.push(this.loadDataItem("items"));
        promises.push(this.loadDataItem("technologies"));
        promises.push(this.loadDataItem("furnaces"));
        promises.push(this.loadDataItem("assemblingMachines"));
        promises.push(this.loadDataItem("miningDrills"));

        this.props.onPackChange(packId);

        await Promise.all(promises);

        this.setState((prevState => {
            prevState.data.packId = packId;
            prevState.data.isLoaded = true;
            prevState.data.onFinishLoadingAll();
            return {isLoaded: true};
        }))
    }

    public render() {
        const {match} = this.props as any;
        const {data} = this.state;
        console.log("[PackConfig] Render with", match, this.state);

        if (!this.state.data.isLoaded) {
            return (
                <div>Loading {match.params.packId}</div>
            )
        }

        return (
            <Switch>
                <PropsRoute exact path={`${match.path}`} component={PackItemSearch} data={this.state.data}/>
                <PropsRoute path={`${match.path}/info`} component={PackInfo}/>
                <PropsRoute path={`${match.path}/test`} component={PackComponentTest} data={this.state.data}/>
                <PropsRoute exact path={`${match.path}/tech`} component={PackTechList}  data={this.state.data}/>
                <PropsRoute path={`${match.path}/craftingCat/:category`} component={CraftingCategoryInfo} data={this.state.data}/>
                <PropsRoute path={`${match.path}/i/:itemType/:itemName`} component={PackItemInfo} data={this.state.data}/>
                <PropsRoute path={`${match.path}/tech/:techName`} component={TechInfo}  data={data}/>
            </Switch>
        )
    }

    private async loadDataItem(what: string) {
        const self = this;
        try {
            const url = `/pack/${self.props.match.params.packId}/${what}.json`;
            const data = await fetch(url);

            this.state.data[what] = await data.json();
            this.state.data.onFinishLoading(what);
        } catch (e) {
            console.error(what, e);
        }
    }
};

