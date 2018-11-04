import * as React from "react";
import {Either, PassedItem, PassedNameTypeData, resolveEitherToPrototype} from "../../Util";
import {PrototypeHasIcon} from "../../types/factorio.prototype";
import {Link} from 'react-router-dom'
import {PackLoadedData} from "../../PackLoadedData";
import {PrototypeIcon} from "./PrototypeIcon";
import {CSSProperties} from "react";

type PrototypeLinkProps = Either<PrototypeHasIcon> & { data: PackLoadedData, hideName?: boolean }

const linkStyle: CSSProperties = {
    marginLeft: 4,
};

export class PrototypeLink extends React.Component<PrototypeLinkProps, {
    item: PrototypeHasIcon | null
}> {
    public constructor(p: PrototypeLinkProps, s?: any) {
        super(p, s);

        this.state = {
            item: (p as PassedItem<PrototypeHasIcon>).item,
        };
    }

    public componentDidUpdate(prevProps: PrototypeLinkProps) {
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
        const hideName = this.props.hideName || false;

        if (item === null || item === undefined) {
            return <span>Error</span>
        }

        return <span>
            <Link to={`/pack/${this.props.data.packId}/i/${item.type}/${item.name}`}>
                <PrototypeIcon item={item}/>
                {!hideName && <span style={linkStyle}>{item.title}</span>}
            </Link>
        </span>
    }
}