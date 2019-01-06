import * as React from "react";
import { FactorioMod } from "browserparse/lib/factorioMod";
import { ListGroupItem, Button } from "reactstrap";
import { ModDependencyError } from "browserparse/lib/modDependencyError";

export interface DecadencyStatus {
  error?: ModDependencyError;
  success: boolean;
}

interface CustomModEntryProps {
  dependencyState: DecadencyStatus;
  mod: FactorioMod;
  onRemove: (name: string) => void;
}

export class CustomModEntry extends React.Component<CustomModEntryProps> {
  public render() {
    const { mod, dependencyState } = this.props;

    const color =
      dependencyState === undefined
        ? "info"
        : dependencyState.error !== undefined
        ? "danger"
        : dependencyState.success
        ? "success"
        : "warning";

    return (
      <ListGroupItem color={color}>
        {mod.info.title}
        {dependencyState &&
          dependencyState.error &&
          dependencyState.error.message}

        <span className="float-right">
          <Button size="sm" color="danger" onClick={this.onRemove}>
            x
          </Button>
        </span>
      </ListGroupItem>
    );
  }

  private onRemove = () => {
    this.props.onRemove(this.props.mod.info.name);
  };
}
