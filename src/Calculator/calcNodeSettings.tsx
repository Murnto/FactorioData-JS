import * as React from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import { SettingsPaneState } from "./packItemGraphCyto";
import {
  CalcInfiniteSource,
  CalcItemTarget,
  CalcRecipe,
  CalcState
} from "./calcState";
import { PackComponent } from "../Utils/packComponent";

interface CalcNodeSettingsProps {
  cState: CalcState;
  info: SettingsPaneState;
  onUpdate: () => void;
}

interface CalcNodeSettingsState {
  amount: string | null;
  cost: string | null;
  search: string;
}

export class CalcNodeSettings extends PackComponent<
  CalcNodeSettingsProps,
  CalcNodeSettingsState
> {
  constructor(p: CalcNodeSettingsProps, s?: CalcNodeSettingsState) {
    super(p, s);

    const cost =
      p.info.nodeType === "source"
        ? (this.getSource().cost || 1).toString()
        : p.info.nodeType === "recipe"
        ? (this.getRecipe().cost || 1).toString()
        : null;
    const amount =
      p.info.nodeType === "target"
        ? (this.getTarget().amount || 1).toString()
        : null;

    this.state = {
      amount,
      cost,
      search: ""
    };
  }

  public render(): React.ReactNode {
    // const { data } = this.props;
    // const {nodeType} = this.props.info;
    const { amount, cost } = this.state;

    return (
      <Form
        style={{
          margin: -10
        }}
      >
        {amount !== null && (
          <FormGroup row>
            <Label for="amount" sm={2}>
              Amount
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                id="amount"
                placeholder="1"
                value={amount}
                onChange={this.onAmountInput}
              />
            </Col>
          </FormGroup>
        )}
        {cost !== null && (
          <FormGroup row>
            <Label for="cost" sm={2}>
              Cost
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                id="cost"
                placeholder="1"
                value={cost}
                onChange={this.onCostInput}
              />
            </Col>
          </FormGroup>
        )}
      </Form>
    );
  }

  private getRecipe(): CalcRecipe {
    return this.props.cState.recipes[this.props.info.recipeName!];
  }

  private getSource(): CalcInfiniteSource {
    return this.props.cState.sourceNodes[
      `${this.props.info.type}-${this.props.info.name}`
    ];
  }

  private getTarget(): CalcItemTarget {
    return this.props.cState.targets[
      `${this.props.info.type}-${this.props.info.name}`
    ];
  }

  private onAmountInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      amount: e.currentTarget.value
    });

    this.getTarget().amount = e.currentTarget.valueAsNumber;
    this.props.onUpdate();
  };

  private onCostInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      cost: e.currentTarget.value
    });

    if (this.props.info.nodeType === "recipe") {
      this.getRecipe().cost = e.currentTarget.valueAsNumber;
    } else {
      this.getSource().cost = e.currentTarget.valueAsNumber;
    }

    this.props.onUpdate();
  };
}
