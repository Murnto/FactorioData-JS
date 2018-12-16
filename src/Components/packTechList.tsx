import * as React from "react";
import { PackLoadedData } from "../packLoadedData";
import Container from "reactstrap/lib/Container";
import { TechList } from "./Minor/techList";

export function PackTechList(props: { data: PackLoadedData }) {
  const { data } = props;

  const technologies = Object.values(data.technologies);

  return (
    <Container>
      <TechList technologies={technologies} data={data} />
    </Container>
  );
}
