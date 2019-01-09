import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { PackComponent } from "../../Utils/packComponent";
import { extractCategoryItems, itemCategories } from "./itemCategoryInfo";
import { PrototypeHasIcon } from "../../types/factorio.prototype";
import { PrototypeLink } from "../Minor/prototypeLink";

type ItemCategoryPageProps = RouteComponentProps;

interface ItemCategoryPageState {
  categoryIcons: { [name: string]: PrototypeHasIcon | null };
}

export class ItemCategoryPage extends PackComponent<
  ItemCategoryPageProps,
  ItemCategoryPageState
> {
  constructor(p: any, s?: any) {
    super(p, s);

    this.state = {
      categoryIcons: {}
    };
  }

  public componentDidMount() {
    const categoryIcons: { [name: string]: PrototypeHasIcon } = {};

    console.time("[ItemCategoryPage] init");
    for (const categorySpec of Object.values(itemCategories)) {
      const categoryItems = extractCategoryItems(this.data, categorySpec);

      if (categoryItems.length > 0) {
        categoryIcons[categorySpec.name] = categoryItems[0].item;
      }
    }
    console.timeEnd("[ItemCategoryPage] init");

    this.setState({ categoryIcons });
  }

  public render() {
    const { match } = this.props;
    const { categoryIcons } = this.state;

    console.log("[ItemCategoryPage] Render with", categoryIcons);

    return (
      <Container style={{ marginTop: "1em" }}>
        <h3>Item categories</h3>
        <ListGroup>
          {Object.values(itemCategories).map(categorySpec => (
            <ListGroupItem key={categorySpec.name}>
              <PrototypeLink
                hideName
                item={categoryIcons[categorySpec.name]}
                to={`${match.url}/${categorySpec.name}`}
              >
                {categorySpec.title}
              </PrototypeLink>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }

  public shouldComponentUpdate(
    _: Readonly<ItemCategoryPageProps>,
    nextState: Readonly<ItemCategoryPageState>
  ): boolean {
    return this.state.categoryIcons !== nextState.categoryIcons;
  }
}
