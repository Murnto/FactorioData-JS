import * as React from "react";
import Container from "reactstrap/lib/Container";
import { TechList } from "./Minor/techList";
import { PackComponent } from "../Utils/packComponent";

export class PackTechList extends PackComponent {
  public render() {
    const technologies = Object.values(this.data.technologies);

    return (
      <Container>
        <TechList technologies={technologies} />
      </Container>
    );
  }
}
