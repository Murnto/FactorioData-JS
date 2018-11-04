import * as React from "react";
import {CSSProperties} from "react";
import {Either, PassedItem, PassedNameTypeData, resolveEitherToPrototype} from "../../Util";
import {PrototypeHasIcon} from "../../types/factorio.prototype";

const iconStyle: CSSProperties = {
    height: 32,
    width: 32
};

const itemBrokenImage: CSSProperties = {
    ...iconStyle,
    backgroundColor: 'magenta',
    display: 'inline-block',
    verticalAlign: 'middle',
};

type PrototypeIconProps = Either<PrototypeHasIcon> & { missingOk?: boolean }

export class PrototypeIcon extends React.Component<PrototypeIconProps, {
    item: PrototypeHasIcon | null
}> {
    public constructor(p: PrototypeIconProps, s?: any) {
        super(p, s);

        this.state = {
            item: (p as PassedItem<PrototypeHasIcon>).item,
        };
    }

    public componentDidUpdate(prevProps: PrototypeIconProps) {
        const pPi = this.props as PassedItem<PrototypeHasIcon>;
        const ppPi = prevProps as PassedItem<PrototypeHasIcon>;
        const pPntd = this.props as PassedNameTypeData;
        const ppPntd = prevProps as PassedNameTypeData;

        if (pPi.item !== ppPi.item) {
            this.setState({
                item: (this.props as PassedItem<PrototypeHasIcon>).item,
            })
        } else if (pPntd.type !== ppPntd.type || pPntd.name !== ppPntd.name) {
            this.setState({
                item: resolveEitherToPrototype(this.props),
            })
        }
    }

    public componentDidMount() {
        if (!this.state.item) {
            this.setState({
                item: resolveEitherToPrototype(this.props),
            })
        }
    }

    public render() {
        const {item} = this.state;

        if (item === null || item === undefined || item.icon === undefined || item.icon === null) {
            if (this.props.missingOk) {
                return <span style={iconStyle}/>;
            } else {
                return <span style={itemBrokenImage} className="item-broken-image"/>
            }
        } else {
            return <img style={iconStyle} className="factorio-icon" src={item !== null ? item.icon : ""}/>
        }
    }
}