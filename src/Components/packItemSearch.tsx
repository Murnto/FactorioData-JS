import * as React from "react";
import { PackLoadedData } from "../packLoadedData";
import { PrototypeLink } from "./Minor/prototypeLink";
import { Container, FormGroup, Input } from "reactstrap";
import { Item } from "../types/factorio.item";
import { CSSProperties } from "react";
import Timeout = NodeJS.Timeout;

const defaultSearch = "iron";
const searchStyles: CSSProperties = {
  marginTop: "1em"
};

interface PackItemSearchState {
  search: string;
  searchResults: Item[];
}

export class PackItemSearch extends React.Component<
  { data: PackLoadedData; match: any },
  PackItemSearchState
> {
  private delayedSearch: Timeout | null = null;

  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      search: "",
      searchResults: this.props.data.searchItems(defaultSearch)
    };
  }

  public componentWillUnmount(): void {
    if (this.delayedSearch !== null) {
      clearTimeout(this.delayedSearch);
      this.delayedSearch = null;
    }
  }

  public render() {
    const { data } = this.props;
    const { searchResults } = this.state;

    return (
      <Container id="item-search-box">
        <FormGroup>
          <Input
            autoFocus
            placeholder={defaultSearch}
            style={searchStyles}
            type="search"
            name="text"
            value={this.state.search}
            onChange={this.onSearchInput}
          />
        </FormGroup>
        <table
          id="table"
          data-sortable=""
          className="sortable-theme-bootstrap"
          data-sortable-initialized="true"
        >
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map(object => (
              <tr key={object.type + ":" + object.name}>
                <td>{object.type}</td>
                <td>
                  <PrototypeLink item={object} data={data} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
  }

  private doSearch = () => {
    this.delayedSearch = null;

    const { search } = this.state;
    this.setState({
      searchResults: this.props.data.searchItems(
        search.length === 0 ? defaultSearch : search
      )
    });
  };

  private onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log('[PackItemSearch] Search update:', e.currentTarget.value, searchResults.length);

    if (this.delayedSearch !== null) {
      clearTimeout(this.delayedSearch);
    }
    this.delayedSearch = setTimeout(this.doSearch, 100);

    this.setState({
      search: e.currentTarget.value
    });
  };
}
