import * as React from "react";
import { Container, FormGroup, Input } from "reactstrap";
import { PrototypeLink } from "../Components/Minor/prototypeLink";
import { Item } from "../types/factorio.item";
import { PrototypeHasIcon } from "../types/factorio.prototype";
import { PackComponent } from "../Utils/packComponent";

interface ItemSelectorProps {
  onItemSelected: (item: PrototypeHasIcon) => void;
}

interface ItemSelectorState {
  search: string;
  searchResults: Item[];
}

export class ItemSelector extends PackComponent<
  ItemSelectorProps,
  ItemSelectorState
> {
  constructor(p: ItemSelectorProps, s?: ItemSelectorState) {
    super(p, s);

    this.state = {
      search: "",
      searchResults: []
    };
  }

  public render(): React.ReactNode {
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
                  <PrototypeLink
                    item={object}
                    onClick={this.props.onItemSelected}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
  }

  private onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    const searchResults = this.data.searchItems(e.currentTarget.value);
    // console.log('[PackItemSearch] Search update:', e.currentTarget.value, searchResults.length);

    this.setState({
      searchResults,
      search: e.currentTarget.value
    });
  };
}
