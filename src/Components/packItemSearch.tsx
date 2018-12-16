import * as React from "react";
import { PackLoadedData } from "../packLoadedData";
import { PrototypeLink } from "./Minor/prototypeLink";
import { Container, FormGroup, Input } from "reactstrap";
import { Item } from "../types/factorio.item";

interface PackItemSearchState {
  search: string;
  searchResults: Item[];
}

export class PackItemSearch extends React.Component<
  { data: PackLoadedData; match: any },
  PackItemSearchState
> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.state = {
      search: "iron",
      searchResults: this.props.data.searchItems("iron")
    };
  }

  public render() {
    const { data } = this.props;
    const { searchResults } = this.state;

    return (
      <Container id="item-search-box">
        <FormGroup>
          <Input
            styles={{ marginTop: "20px" }}
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

  private onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const searchResults = this.props.data.searchItems(e.currentTarget.value);
    // console.log('[PackItemSearch] Search update:', e.currentTarget.value, searchResults.length);

    this.setState({
      search: e.currentTarget.value,
      searchResults
    });
  };
}
