import * as React from "react";
import { RouteComponentProps, Switch } from "react-router-dom";
import { PackContext, PackLoadedData } from "../packLoadedData";
import { ItemSearchPage } from "./Item/itemSearchPage";
import { PropsRoute } from "../util";
import { TechListPage } from "./Technology/techListPage";
import { ItemInfoPage } from "./Item/itemInfoPage";
import { PackComponentTest } from "./packComponentTest";
import { CraftingCategoryInfo } from "./craftingCategoryInfo";
import { TechSingleInfo } from "./Technology/techSingleInfo";
import PackItemGraphCyto from "../Calculator/packItemGraphCyto";

export function PackInfo(props: RouteComponentProps) {
  const { match } = props as any;
  console.log("PI with", match.params.packId, match);

  return (
    <div>
      <h2>Info</h2>
    </div>
  );
}

interface PackConfigProps extends RouteComponentProps {
  match: any;
  onPackChange: (packId: string) => void;
}

interface PackConfigState {
  data: PackLoadedData;
  isLoaded: boolean;
}

export default class PackConfig extends React.Component<
  PackConfigProps,
  PackConfigState
> {
  constructor(props: any, context?: any) {
    super(props, context);
    console.log("[PackConfig] initialized");
    this.state = { data: new PackLoadedData(), isLoaded: false };

    (window as any).pd = this.state.data; // FIXME DEBUG
  }

  public async componentDidMount() {
    this.initPack();
  }

  public componentDidUpdate(prevProps: PackConfigProps) {
    if (prevProps.match.params.packId !== this.props.match.params.packId) {
      this.initPack();
    }
  }

  public render() {
    const { match } = this.props as any;
    const { data } = this.state;
    console.log("[PackConfig] Render with", match, this.state);

    if (!this.state.data.isLoaded) {
      return <div>Loading {match.params.packId}</div>;
    }

    return (
      <PackContext.Provider value={data}>
        <Switch>
          <PropsRoute
            exact
            path={`${match.path}`}
            component={ItemSearchPage}
            data={data}
          />
          <PropsRoute path={`${match.path}/info`} component={PackInfo} />
          <PropsRoute
            path={`${match.path}/test`}
            component={PackComponentTest}
            data={data}
          />
          <PropsRoute
            exact
            path={`${match.path}/tech`}
            component={TechListPage}
            data={data}
          />
          {/*<PropsRoute exact path={`${match.path}/graph`} component={PackItemGraph} data={data}/>*/}
          {/*<PropsRoute exact path={`${match.path}/graph2`} component={PackItemGraphGL} data={data}/>*/}
          <PropsRoute
            exact
            path={`${match.path}/graph3`}
            component={PackItemGraphCyto}
            data={data}
          />
          <PropsRoute
            path={`${match.path}/tech/:techName`}
            component={TechSingleInfo}
            data={data}
          />
          <PropsRoute
            path={`${match.path}/craftingCat/:category`}
            component={CraftingCategoryInfo}
            data={data}
          />
          <PropsRoute
            path={`${match.path}/i/:itemType/:itemName`}
            component={ItemInfoPage}
            data={data}
          />
        </Switch>
      </PackContext.Provider>
    );
  }

  private async initPack() {
    const data = new PackLoadedData();
    this.setState({
      data,
      isLoaded: false
    });

    const packId = this.props.match.params.packId;

    const url = `/pack/${packId}.json`;
    const loadedData = await fetch(url);

    this.state.data.loadedThings = await loadedData.json();

    this.props.onPackChange(packId);

    data.packId = packId;
    data.isLoaded = true;
    data.onFinishLoadingAll();

    this.setState({
      isLoaded: true
    });
  }
}
