import * as React from "react";
import { AssemblingMachine } from "../types/factorio.assemblignmachine";
import { Furnace } from "../types/factorio.furnace";
import { RouteComponentProps } from "react-router";
import { PrototypeLink } from "./Minor/prototypeLink";
import { PrototypeHasIcon } from "../types/factorio.prototype";
import { Container } from "reactstrap";
import { PackComponent } from "../Utils/packComponent";

type CraftingCategoryInfoProps = RouteComponentProps<{ category: string }>;

interface CraftingCategoryInfoState {
  crafters: Array<AssemblingMachine | Furnace> | null;
}

export class CraftingCategoryInfo extends PackComponent<
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
      crafters: this.data.craftersWithCategory(this.props.match.params.category)
    });
  }

  public render() {
    const { match } = this.props;
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
                // TODO FIXME move to state
                const resolved = this.data.findItem(
                  "item",
                  object.minable.result
                );

                if (resolved !== null) {
                  displayObj = resolved;
                }
              }

              return (
                <tr key={object.name}>
                  <td>
                    <PrototypeLink item={displayObj} />
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
    nextProps: Readonly<CraftingCategoryInfoProps>,
    nextState: Readonly<CraftingCategoryInfoState>
  ): boolean {
    return (
      this.props.match.params.category !== nextProps.match.params.category ||
      this.state.crafters !== nextState.crafters
    );
  }
}
