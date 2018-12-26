import * as React from "react";
import { PackLoadedData } from "../packLoadedData";
import { AssemblingMachine } from "../types/factorio.assemblignmachine";
import { Furnace } from "../types/factorio.furnace";
import { RouteComponentProps } from "react-router";
import { PrototypeLink } from "./Minor/prototypeLink";
import { PrototypeHasIcon } from "../types/factorio.prototype";
import { Container } from "reactstrap";

interface CraftingCategoryInfoProps
  extends RouteComponentProps<{ category: string }> {
  data: PackLoadedData;
}

interface CraftingCategoryInfoState {
  crafters: Array<AssemblingMachine | Furnace> | null;
}

export class CraftingCategoryInfo extends React.Component<
  CraftingCategoryInfoProps,
  CraftingCategoryInfoState
> {
  constructor(p: any, s?: any) {
    super(p, s);

    this.state = {
      crafters: null
    };
  }

  public componentDidMount() {
    this.setState({
      crafters: this.props.data.craftersWithCategory(
        this.props.match.params.category
      )
    });
  }

  public render() {
    const { match, data } = this.props;
    const { category } = match.params;
    const { crafters } = this.state;

    console.log("[CraftingCategoryInfo] Render with", category, crafters);

    if (crafters === null) {
      return <span />;
    }

    return (
      <Container>
        <table id="table" className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Speed</th>
              <th>Energy usage</th>
            </tr>
          </thead>
          <tbody>
            {crafters.map(object => {
              let displayObj: PrototypeHasIcon = object;

              if (
                object.minable !== undefined &&
                object.minable.result !== undefined
              ) {
                const resolved = data.findItem("item", object.minable.result);

                if (resolved !== null) {
                  displayObj = resolved;
                }
              }

              return (
                <tr key={object.name}>
                  <td>
                    <PrototypeLink item={displayObj} data={data} />
                  </td>
                  <td>{object.crafting_speed}</td>
                  <td>{object.energy_usage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    );
  }

  public shouldComponentUpdate(
    nextProps: Readonly<{ data: PackLoadedData; match: any }>,
    nextState: Readonly<CraftingCategoryInfoState>
  ): boolean {
    return (
      this.props.match.params.category !== nextProps.match.params.category ||
      this.props.data.packId !== nextProps.data.packId ||
      this.state.crafters !== nextState.crafters
    );
  }
}
