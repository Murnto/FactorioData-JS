import * as React from "react";
import { PrototypeLink } from "../Minor/prototypeLink";
import { Container, FormGroup, Input } from "reactstrap";
import { Item } from "../../types/factorio.item";
import { CSSProperties } from "react";
import Timeout = NodeJS.Timeout;
import { PackComponent } from "../../Utils/packComponent";
import { RouteComponentProps } from "react-router";

const defaultSearch = "iron";
const searchStyles: CSSProperties = {
  marginTop: "1em"
};

interface ItemSearchPageState {
  search: string;
  searchResults: Item[];
}

export class ItemSearchPage extends PackComponent<
  RouteComponentProps,
  ItemSearchPageState
> {
  private delayedSearch: Timeout | null = null;

  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      search: "",
      searchResults: this.data.searchItems(defaultSearch)
    };
  }

  public componentWillUnmount(): void {
    if (this.delayedSearch !== null) {
      clearTimeout(this.delayedSearch);
      this.delayedSearch = null;
    }
  }

  public render() {
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
                  <PrototypeLink item={object} />
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
      searchResults: this.data.searchItems(
        search.length === 0 ? defaultSearch : search
      )
    });
  };

  private onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log('[ItemSearchPage] Search update:', e.currentTarget.value, searchResults.length);

    if (this.delayedSearch !== null) {
      clearTimeout(this.delayedSearch);
    }
    this.delayedSearch = setTimeout(this.doSearch, 100);

    this.setState({
      search: e.currentTarget.value
    });
  };
}
