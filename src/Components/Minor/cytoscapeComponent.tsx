import * as React from "react";
import * as cytoscape from "cytoscape";
import { Core, CytoscapeOptions } from "cytoscape";
// @ts-ignore
import automove from "cytoscape-automove";
// @ts-ignore
import cxtmenu from "cytoscape-cxtmenu";
// @ts-ignore
import gridGuide from "cytoscape-grid-guide";
import * as jquery from "jquery";

gridGuide(cytoscape, jquery);
cytoscape.use(automove);
cytoscape.use(cxtmenu);

const cyStyle = {
  display: "block",
  height: "100%",
  marginLeft: -15,
  marginRight: -15,
  width: "100%"
};

interface CytoscapeProps extends CytoscapeOptions {
  onInit: (core: Core) => void;
}

class Cytoscape extends React.Component<CytoscapeProps> {
  private cy: Core;
  private cytoDiv: React.RefObject<HTMLDivElement>;

  constructor(p: CytoscapeProps) {
    super(p);

    this.cytoDiv = React.createRef();
  }

  public componentDidMount() {
    const cy = cytoscape({
      container: this.cytoDiv.current,
      elements: this.props.elements,
      layout: { name: "preset" },
      maxZoom: 2,
      style: this.props.style,
      wheelSensitivity: 0.1
    });

    this.cy = cy;

    this.props.onInit(cy);

    // this is incredibly silly, but max zoom can only be set if it is LESS than the min zoom
    cy.minZoom(3);
    cy.maxZoom(2);
    cy.minZoom(0.1);
  }

  public componentWillReceiveProps(nextProps: CytoscapeProps) {
    this.cy.json(nextProps);
  }

  public componentWillUnmount() {
    this.cy.destroy();
  }

  public getCy() {
    return this.cy;
  }

  public render() {
    return <div style={cyStyle} ref={this.cytoDiv} />;
  }

  public shouldComponentUpdate() {
    return false;
  }
}

export default Cytoscape;
