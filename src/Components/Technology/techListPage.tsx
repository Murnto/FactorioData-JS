import * as React from "react";
import Container from "reactstrap/lib/Container";
import { TechList } from "./techList";
import { PackComponent } from "../../Utils/packComponent";

export class TechListPage extends PackComponent {
  public render() {
    const technologies = Object.values(this.data.technologies);

    return (
      <Container>
        <TechList technologies={technologies} />
      </Container>
    );
  }
}
