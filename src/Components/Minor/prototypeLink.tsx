import * as React from "react";
import {
  Either,
  PassedItem,
  PassedNameTypeData,
  resolveEitherToPrototype
} from "../../util";
import { PrototypeHasIcon } from "../../types/factorio.prototype";
import { Link } from "react-router-dom";
import { PackLoadedData } from "../../packLoadedData";
import { PrototypeIcon } from "./prototypeIcon";
import { CSSProperties } from "react";

type PrototypeLinkProps = Either<PrototypeHasIcon> & {
  data: PackLoadedData;
  hideIcon?: boolean;
  hideName?: boolean;
  to?: string;
};

const linkStyle: CSSProperties = {
  marginLeft: 4
};

export class PrototypeLink extends React.Component<
  PrototypeLinkProps,
  {
    item: PrototypeHasIcon | null;
  }
> {
  public constructor(p: PrototypeLinkProps, s?: any) {
    super(p, s);

    this.state = {
      item: (p as PassedItem<PrototypeHasIcon>).item
    };
  }

  public componentDidMount() {
    if (!this.state.item) {
      this.setState({
        item: resolveEitherToPrototype(this.props)
      });
    }
  }

  public componentDidUpdate(prevProps: PrototypeLinkProps) {
    const pPi = this.props as PassedItem<PrototypeHasIcon>;
    const ppPi = prevProps as PassedItem<PrototypeHasIcon>;
    const pPntd = this.props as PassedNameTypeData;
    const ppPntd = prevProps as PassedNameTypeData;

    if (pPi.item !== ppPi.item) {
      this.setState({
        item: (this.props as PassedItem<PrototypeHasIcon>).item
      });
    } else if (pPntd.type !== ppPntd.type || pPntd.name !== ppPntd.name) {
      this.setState({
        item: resolveEitherToPrototype(this.props)
      });
    }
  }

  public render() {
    const { item } = this.state;
    const { hideIcon, hideName, data } = this.props;

    if (item === null || item === undefined) {
      return <span>Error</span>;
    }

    return (
      <span>
        <Link to={this.props.to || data.link.toItem(item)}>
          {!hideIcon && <PrototypeIcon item={item} />}
          {!hideName && <span style={linkStyle}>{item.title}</span>}
        </Link>
      </span>
    );
  }
}
