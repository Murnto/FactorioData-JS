import * as React from "react";
import { PackLoadedData } from "../packLoadedData";
import * as cytoscape from "cytoscape";
import {
  Core,
  ElementDefinition,
  InputEventObject,
  NodeSingular
} from "cytoscape";
import { RouteComponentProps } from "react-router-dom";
import Cytoscape from "../Components/Minor/cytoscapeComponent";
import { CalcResultRecipe, CalcState } from "./calcState";
import { RecipeSelector, SelectorQuery } from "./recipeSelectorComponent";
import { Recipe } from "../types/factorio.recipe";
// @ts-ignore
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { ItemSelector } from "./calcItemSelectorComponent";
import { PrototypeHasIcon } from "../types/factorio.prototype";
import { CalcNodeSettings } from "./calcNodeSettings";

/* tslint:disable */
const gridOptions = {
  // On/Off Modules
  /* From the following four snap options, at most one should be true at a given time */
  snapToGridOnRelease: true, // Snap to grid on release
  snapToGridDuringDrag: true, // Snap to grid during drag
  snapToAlignmentLocationOnRelease: false, // Snap to alignment location on release
  snapToAlignmentLocationDuringDrag: false, // Snap to alignment location during drag
  distributionGuidelines: true, // Distribution guidelines
  geometricGuideline: true, // Geometric guidelines
  initPosAlignment: false, // Guideline to initial mouse position
  centerToEdgeAlignment: false, // Center to edge alignment
  resize: false, // Adjust node sizes to cell sizes
  parentPadding: true, // Adjust parent sizes to cell sizes by padding
  drawGrid: true, // Draw grid background

  // General
  gridSpacing: 16, // Distance between the lines of the grid.

  // Draw Grid
  zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
  panGrid: true, // Determines whether the grid should move then the user moves the graph if grid is drawn.
  gridStackOrder: -1, // Namely z-index
  gridColor: "#dedede", // Color of grid lines
  lineWidth: 1.0, // Width of grid lines

  // Guidelines
  guidelinesStackOrder: 0, // z-index of guidelines -- REQUIRED so it stays below the modal
  guidelinesTolerance: 2.0, // Tolerance distance for rendered positions of nodes' interaction.
  guidelinesStyle: {
    // Set ctx properties of line. Properties are here:
    strokeStyle: "#8b7d6b", // color of geometric guidelines
    geometricGuidelineRange: 400, // range of geometric guidelines
    range: 100, // max range of distribution guidelines
    minDistRange: 10, // min range for distribution guidelines
    distGuidelineOffset: 10, // shift amount of distribution guidelines
    horizontalDistColor: "#ff0000", // color of horizontal distribution alignment
    verticalDistColor: "#00ff00", // color of vertical distribution alignment
    initPosAlignmentColor: "#0000ff", // color of alignment to initial mouse location
    lineDash: [0, 0], // line style of geometric guidelines
    horizontalDistLine: [0, 0], // line style of horizontal distribution guidelines
    verticalDistLine: [0, 0], // line style of vertical distribution guidelines
    initPosAlignmentLine: [0, 0] // line style of alignment to initial mouse position
  },

  // Parent Padding
  parentSpacing: -1 // -1 to set paddings of parents to gridSpacing
};
/* tslint:enable */
const cytoStyle = [
  {
    css: {
      // 'background-color': '#000',
      // 'background-fit': 'cover',
      "background-opacity": "0",
      content: countMapper,
      "font-size": 12,
      height: 32,
      shape: "rectangle",
      width: 32
    },
    selector: "node"
  },
  {
    css: {
      // 'background-color': '#000',
      // 'background-fit': 'cover',
      "background-image": imageMapper,
      // "background-opacity": "0",
      content: countMapper,
      height: 32,
      shape: "rectangle",
      width: 32
    },
    selector: ".item"
  },
  {
    css: {
      "background-color": "#888888",
      "background-opacity": "0.5",
      content: labelMapper,
      "text-halign": "center",
      "text-valign": "center"
    },
    selector: "node.recipe"
  },
  {
    css: {
      "background-opacity": "0.5",
      "border-color": "#CCCCCC",
      "border-width": "1px",
      content: countMapper,
      height: 32 + 12,
      // padding: "10px",
      shape: "rectangle",
      width: 32 + 12
    },
    selector: "node.source, node.target"
  },
  {
    css: {
      "background-color": "#88CCEE"
    },
    selector: "node.source"
  },
  {
    css: {
      "background-color": "#EECC88"
    },
    selector: "node.target"
  },
  // {
  //     css: {
  //         'background-color': '#bbb',
  //         'padding-bottom': '10px',
  //         'padding-left': '10px',
  //         'padding-right': '10px',
  //         'padding-top': '10px',
  //         'text-halign': 'center',
  //         'text-valign': 'top'
  //     },
  //     selector: '$node > node'
  // },
  {
    css: {
      // "control-point-distances": "-20 20 -20",
      // "control-point-step-size": "10",
      // "control-point-weights": "0.25 0.5 0.75",
      "curve-style": "straight",
      // 'curve-style': 'unbundled-bezier',
      // 'edge-distances': 'node-position',
      events: "no",
      "source-distance-from-node": "5px",
      "source-endpoint": "outside-to-line-or-label",
      // 'source-endpoint': '180deg',
      "target-arrow-shape": "triangle",
      "target-distance-from-node": "5px",
      "target-endpoint": "outside-to-line-or-label"
      // 'target-endpoint': '0deg',
    },
    selector: "edge"
  }
  // {
  //     css: {
  //         'background-color': 'black',
  //         'line-color': 'black',
  //         'source-arrow-color': 'black',
  //         'target-arrow-color': 'black'
  //     },
  //     selector: ':selected'
  // },
];
const cxtMenuDefaults = {
  activeFillColor: "rgba(1, 105, 217, 0.75)", // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  atMouse: false, // draw menu at mouse position,
  fillColor: "rgba(0, 0, 0, 0.75)", // the background colour of the menu
  indicatorSize: 24, // the size in pixels of the pointer to the active command
  itemColor: "white", // the colour of text in the command's content
  itemTextShadowColor: "transparent", // the text shadow colour of the command's content
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
  menuRadius: 100, // the radius of the circular menu in pixels
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
  openMenuEvents: "cxttapstart taphold", // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  zIndex: 9999 // the z-index of the ui div
};

function imageMapper(ele: NodeSingular) {
  const icon = ele.data("icon");

  if (typeof icon === "undefined") {
    return;
  }
  if (typeof icon === "string") {
    return "/icon/" + icon;
  }

  return (icon as any[]).map(i => "/icon/" + i.icon);
}

function labelMapper(ele: NodeSingular) {
  return ele.data("label") || ele.data("id");
}

function countMapper(ele: NodeSingular) {
  return ele.data("countStr") === "NaNx" ? "0.00x" : ele.data("countStr");
}

interface PackItemGraphCytoProps extends RouteComponentProps {
  data: PackLoadedData;
}

export interface SettingsPaneState {
  name?: string;
  nodeType: "recipe" | "source" | "target";
  recipeName?: string;
  type?: string;
}

interface PackItemGraphCytoState {
  bottomPaneState: PaneState;
  els: any;
  itemCallback?: (item: PrototypeHasIcon) => void;
  query?: SelectorQuery;
  settingsPaneState: SettingsPaneState | null;
}

type PaneState = null | "item-recipe-query" | "item-search" | "recipe-search";

function getRootNode(node: NodeSingular): NodeSingular {
  let recipeNode = node;

  while (!recipeNode.isOrphan()) {
    recipeNode = recipeNode.parent()[0];
  }

  return recipeNode;
}

class PackItemGraphCyto extends React.Component<
  PackItemGraphCytoProps,
  PackItemGraphCytoState
> {
  private cState = new CalcState();
  private cy: Core;

  constructor(p: PackItemGraphCytoProps, s?: PackItemGraphCytoState) {
    super(p, s);

    console.log("[PackItemGraphCyto] constructor");

    this.state = {
      bottomPaneState: null,
      els: [],
      settingsPaneState: null
    };

    this.calcUpdate = this.calcUpdate.bind(this);
  }

  public componentDidMount(): void {
    console.log("[PackItemGraphCyto] componentDidMount");

    this.calcStateFromHash();
  }

  public componentDidUpdate(prevProps: Readonly<PackItemGraphCytoProps>): void {
    console.log("[PackItemGraphCyto] componentDidUpdate");

    if (prevProps.location.hash !== this.props.location.hash) {
      this.calcStateFromHash();
    }
  }

  public render() {
    console.log("[PackItemGraphCyto] render");

    return (
      <React.Fragment>
        <Cytoscape style={cytoStyle} onInit={this.setRef} />
        <SlidingPane
          isOpen={!!this.state.bottomPaneState}
          title="Recipe Selector"
          from="bottom"
          width="100%"
          onRequestClose={this.closePanel}
        >
          {this.state.bottomPaneState === "item-recipe-query" && (
            <RecipeSelector
              data={this.props.data}
              query={this.state.query}
              onRecipeSelected={this.onRecipeSelected}
            />
          )}
          {this.state.bottomPaneState === "item-search" && (
            <ItemSelector
              data={this.props.data}
              onItemSelected={this.state.itemCallback!}
            />
          )}
          <React.Fragment />
        </SlidingPane>
        <SlidingPane
          isOpen={!!this.state.settingsPaneState}
          title={
            this.state.settingsPaneState &&
            this.state.settingsPaneState.nodeType + " settings"
          }
          from="right"
          width="400px"
          onRequestClose={this.closePanel}
        >
          <React.Fragment />
          {this.state.settingsPaneState && (
            <CalcNodeSettings
              cState={this.cState}
              data={this.props.data}
              info={this.state.settingsPaneState}
              onUpdate={this.calcUpdate}
            />
          )}
        </SlidingPane>
      </React.Fragment>
    );
  }

  /**
   * Import calculator state from the URL fragment, if it exists
   */
  private calcStateFromHash() {
    if (this.props.location.hash === "" || this.props.location.hash === "#") {
      this.cState = new CalcState();
    } else {
      this.cState.import(this.props.location.hash.slice(1));
    }

    this.calcUpdate();
  }

  /**
   * Rerender the graph according to the current CalcState
   */
  private calcUpdate() {
    console.log("[PackItemGraphCyto] calcUpdate");

    const exportState = `#${this.cState.export()}`;
    if (this.props.location.hash !== exportState) {
      this.props.location.hash = exportState;
      this.props.history.push(this.props.location);
    }

    // replace graph nodes
    this.cy.elements().remove();
    this.cy.json({
      elements: this.renderDag()
    });

    this.initAutomove();

    this.cy.fit();

    // zoom out a small amount
    this.cy.zoom(this.cy.zoom() - 0.05);
    this.cy.center();
  }

  /**
   * Helper function to close all panels
   */
  private closePanel = () =>
    this.setState({ bottomPaneState: null, settingsPaneState: null });

  /**
   * Setup the automove extension for each recipe node.
   *
   * So as to ensure each compound moves together,
   * even if an ingredient/result was dragged.
   */
  private initAutomove() {
    // for each non-toplevel node
    for (const n of this.cy
      .nodes()
      .nonorphans()
      .toArray()) {
      // obtain the leaf nodes
      const family = n
        .parents()
        .last()
        .descendants()
        .filter((el: any) => el.isChildless())
        .subtract(n.descendants());

      (this.cy as any).automove({
        dragWith: n,
        nodesMatching: family,
        reposition: "drag"
      });
    }
  }

  /**
   * Initialise the cxtmenu extension with menus for the various node types
   *
   * @param cy
   */
  private initCxtMenu(cy: Core) {
    (cy as any).cxtmenu({
      ...cxtMenuDefaults,
      selector: "node.item.ingredient",

      commands: [
        this.menuItemAddProducer(),
        this.menuItemInfiniteSource(),
        this.menuItemAddConsumer()
      ]
    });
    (cy as any).cxtmenu({
      ...cxtMenuDefaults,
      selector: "node.target",

      commands: [
        this.menuItemSettings(),
        this.menuItemRemoveTarget(),
        this.menuItemAddProducer()
        // this.menuItemAddConsumer()
      ]
    });
    (cy as any).cxtmenu({
      ...cxtMenuDefaults,
      selector: "node.item.result",

      commands: [
        this.menuItemAddProducer(),
        this.menuItemAddOutput(),
        this.menuItemAddConsumer()
      ]
    });
    (cy as any).cxtmenu({
      ...cxtMenuDefaults,
      selector: "node.source",

      commands: [
        // this.menuItemAddProducer(),
        this.menuItemSettings(),
        this.menuItemRemoveSource(),
        this.menuItemAddConsumer()
      ]
    });

    (cy as any).cxtmenu({
      ...cxtMenuDefaults,
      selector: "node.recipe",

      commands: [
        this.menuItemSettings(),
        {
          content: "Remove",
          select: (ele: NodeSingular) => {
            console.log(
              "[PackItemGraphCyto] remove recipe:",
              ele.data("recipeName")
            );

            delete this.cState.recipes[ele.data("recipeName")];
            this.calcUpdate();
          }
        }
      ]
    });

    (cy as any).cxtmenu({
      ...cxtMenuDefaults,
      selector: "core",

      commands: [
        {
          content: "Add source",
          select: (_: any, ev: InputEventObject) => {
            console.log("[PackItemGraphCyto] Add infinite source");

            this.openPanel("item-search");
            this.setState({
              itemCallback: item => {
                console.log("Add inf source", item);

                this.cState.addSourceNode(item.type, item.name, {
                  position: {
                    x: ev.position.x,
                    y: ev.position.y
                  }
                });
                this.calcUpdate();

                this.closePanel();
              }
            });
          }
        },
        // {
        //   content: "Add recipe",
        //   select: () => {
        //     console.log("[PackItemGraphCyto] Add recipe");
        //     this.openPanel("item-recipe-query", {
        //       name: "gas-ammonia",
        //       queryType: "result",
        //       type: "fluid"
        //     });
        //   }
        // },
        {
          content: "Add target",
          select: (_: any, ev: InputEventObject) => {
            console.log("[PackItemGraphCyto] Add target", ev);

            this.openPanel("item-search");
            this.setState({
              itemCallback: item => {
                console.log("Add target", item);

                this.cState.addTarget(item.type, item.name, {
                  // TODO amount
                  position: {
                    x: ev.position.x,
                    y: ev.position.y
                  }
                });
                this.calcUpdate();

                this.closePanel();
              }
            });
          }
        }
      ]
    });
  }

  private menuItemAddConsumer() {
    return {
      content: "Add consumer",
      select: (ele: NodeSingular) => {
        this.openPanel("item-recipe-query", {
          name: ele.data("name"),
          queryType: "ingredient",
          type: ele.data("type")
        });
      }
    };
  }

  private menuItemAddOutput() {
    return {
      content: "Add target",
      select: (ele: NodeSingular) => {
        console.log(
          "[PackItemGraphCyto] Add target for",
          ele.data("type"),
          ele.data("name")
        );

        this.cState.addTarget(ele.data("type"), ele.data("name"));
        this.calcUpdate();
      }
    };
  }

  private menuItemAddProducer() {
    return {
      content: "Add producer",
      select: (ele: NodeSingular) => {
        this.openPanel("item-recipe-query", {
          name: ele.data("name"),
          queryType: "result",
          type: ele.data("type")
        });
      }
    };
  }

  private menuItemInfiniteSource() {
    return {
      content: "Add source",
      select: (ele: NodeSingular) => {
        console.log(
          "[PackItemGraphCyto] Add infinite source for",
          ele.data("type"),
          ele.data("name")
        );

        this.cState.addSourceNode(ele.data("type"), ele.data("name"));
        this.calcUpdate();
      }
    };
  }

  private menuItemRemoveSource() {
    return {
      content: "Remove",
      select: (ele: NodeSingular) => {
        delete this.cState.sourceNodes[
          `${ele.data("type")}-${ele.data("name")}`
        ];

        this.calcUpdate();
      }
    };
  }

  private menuItemRemoveTarget() {
    return {
      content: "Remove",
      select: (ele: NodeSingular) => {
        delete this.cState.targets[`${ele.data("type")}-${ele.data("name")}`];

        this.calcUpdate();
      }
    };
  }

  private menuItemSettings() {
    return {
      content: "Settings",
      select: (ele: NodeSingular) => {
        console.log("[PackItemGraphCyto] Settings", ele);
        let nodeType = "invalid";
        if (ele.hasClass("recipe")) {
          nodeType = "recipe";
        } else if (ele.hasClass("target")) {
          nodeType = "target";
        } else if (ele.hasClass("source")) {
          nodeType = "source";
        }

        this.setState({
          settingsPaneState: {
            name: ele.data("name"),
            nodeType: nodeType as any,
            recipeName: ele.data("recipeName"),
            type: ele.data("type")
          }
        });
      }
    };
  }

  private onRecipeSelected = (recipe: Recipe) => {
    console.log("[PackItemGraphCyto] Selected recipe", recipe);

    this.closePanel();

    this.cState.addRecipe(recipe.name);
    this.calcUpdate();
  };

  private openPanel = (bps: PaneState, query?: SelectorQuery) =>
    this.setState({
      query,
      bottomPaneState: bps
    });

  private renderDag(): any {
    const data = this.props.data;

    // this.cState
    //   .addRecipe("solid-fuel-hydrazine")
    //   .addRecipe("gas-hydrazine")
    //   .addRecipe("gas-ammonia")
    //   .addRecipe("air-separation")
    //   .addRecipe("angels-air-filtering")
    //   .addRecipe("catalyst-metal-red")
    //   .addRecipe("catalyst-metal-green")
    //   .addRecipe("gas-monochloramine")
    //   .addRecipe("solid-sodium-hypochlorite")
    //   .addRecipe("water-saline-separation")
    //   .addRecipe("water-saline");
    //
    // this.cState
    //   .addSourceNode("fluid", "water")
    //   .addSourceNode("item", "copper-ore")
    //   .addSourceNode("item", "bauxite-ore")
    //   .addSourceNode("item", "silver-ore")
    //   .addSourceNode("item", "iron-ore");
    //
    // this.cState.addTarget("item", "solid-fuel", 2);
    // console.log(this.cState.export());

    // this.cState.import(
    //   "eyJyZWNpcGVzIjp7ImFpci1zZXBhcmF0aW9uIjp7Im5hbWUiOiJhaXItc2VwYXJhdGlvbiIsInBvc2l0aW9uIjp7IngiOi0xNzQuOTcwMjM4ODE5ODE3NTUsInkiOi0xNDIyLjE5MTkxNjE3NjEyM319LCJhbmdlbHMtYWlyLWZpbHRlcmluZyI6eyJuYW1lIjoiYW5nZWxzLWFpci1maWx0ZXJpbmciLCJwb3NpdGlvbiI6eyJ4IjotMTc1Ljc0MzExMjQxMDcyNTczLCJ5IjotMTU5MC4xNzkyNjQwMzMwNzUyfX0sImNhdGFseXN0LW1ldGFsLWdyZWVuIjp7Im5hbWUiOiJjYXRhbHlzdC1tZXRhbC1ncmVlbiIsInBvc2l0aW9uIjp7IngiOi00NC45Nzk1Mzk5NzM2Nzk4NiwieSI6LTk5OS45MDExNjMxNzc2MDA3fX0sImNhdGFseXN0LW1ldGFsLXJlZCI6eyJuYW1lIjoiY2F0YWx5c3QtbWV0YWwtcmVkIiwicG9zaXRpb24iOnsieCI6LTg1Ljc0MzU0ODk5ODE1ODc2LCJ5IjotMTIwMi45Nzc4ODkxNTQ1NzE4fX0sImdhcy1hbW1vbmlhIjp7Im5hbWUiOiJnYXMtYW1tb25pYSIsInBvc2l0aW9uIjp7IngiOi0zNTAuNjI5NTM0NDIzODc0LCJ5IjotMTIwMy40NTY0MTY0NDM2ODk3fX0sImdhcy1oeWRyYXppbmUiOnsibmFtZSI6Imdhcy1oeWRyYXppbmUiLCJwb3NpdGlvbiI6eyJ4IjotMzA2Ljc4MTY1NjI0NDc2NjksInkiOi05OTcuNzIzNTU3NzIwMzMzfX0sImdhcy1tb25vY2hsb3JhbWluZSI6eyJuYW1lIjoiZ2FzLW1vbm9jaGxvcmFtaW5lIiwicG9zaXRpb24iOnsieCI6LTUzNC4xNzI1ODQyODc1MTEsInkiOi05OTcuODIyMzQ2NDQ0NjcwOX19LCJzb2xpZC1mdWVsLWh5ZHJhemluZSI6eyJuYW1lIjoic29saWQtZnVlbC1oeWRyYXppbmUiLCJwb3NpdGlvbiI6eyJ4IjotMzczLjM1MTY2MDE3NzM1MTksInkiOi03ODcuOTMyMTI1NzMyMDIwNX19LCJzb2xpZC1zb2RpdW0taHlwb2NobG9yaXRlIjp7Im5hbWUiOiJzb2xpZC1zb2RpdW0taHlwb2NobG9yaXRlIiwicG9zaXRpb24iOnsieCI6LTU3My45NjQwNjg2ODQ0MjkyLCJ5IjotMTIwMi4yODc1MjM2NDU1NDYzfX0sIndhdGVyLXNhbGluZSI6eyJuYW1lIjoid2F0ZXItc2FsaW5lIiwicG9zaXRpb24iOnsieCI6LTY5NS44MTczNTQ3Njk5MTIzLCJ5IjotMTU4MC42MDk0Njc5NjAxNjc0fX0sIndhdGVyLXNhbGluZS1zZXBhcmF0aW9uIjp7Im5hbWUiOiJ3YXRlci1zYWxpbmUtc2VwYXJhdGlvbiIsInBvc2l0aW9uIjp7IngiOi01NjUuMjMwNzgzNTU5MDEsInkiOi0xNDQ5Ljk2ODgzMjQ5MDI3NDd9fX0sInNvdXJjZU5vZGVzIjp7ImZsdWlkLXdhdGVyIjp7Im5hbWUiOiJ3YXRlciIsInR5cGUiOiJmbHVpZCJ9LCJpdGVtLWJhdXhpdGUtb3JlIjp7Im5hbWUiOiJiYXV4aXRlLW9yZSIsInR5cGUiOiJpdGVtIn0sIml0ZW0tY29wcGVyLW9yZSI6eyJuYW1lIjoiY29wcGVyLW9yZSIsInR5cGUiOiJpdGVtIn0sIml0ZW0taXJvbi1vcmUiOnsibmFtZSI6Imlyb24tb3JlIiwidHlwZSI6Iml0ZW0ifSwiaXRlbS1zaWx2ZXItb3JlIjp7Im5hbWUiOiJzaWx2ZXItb3JlIiwidHlwZSI6Iml0ZW0ifX0sInRhcmdldHMiOnsiaXRlbS1zb2xpZC1mdWVsIjp7ImFtb3VudCI6MiwibmFtZSI6InNvbGlkLWZ1ZWwiLCJ0eXBlIjoiaXRlbSJ9fX0="
    // );

    const result = this.cState.calculate(data);

    const cy = cytoscape({
      headless: true
    });
    console.log(cy);

    const els: ElementDefinition[] = [];

    for (const source of Object.values(result.infiniteConsumed)) {
      const def = this.cState.sourceNodes[`${source.type}-${source.name}`];
      const srcItem = data.findItem(source.type, source.name)!;

      els.push({
        classes: ["item", "source"],
        data: {
          countStr: (source.amount || 0).toFixed(2) + "x",
          icon: srcItem.icon || srcItem.icons,
          id: `source-${source.type}-${source.name}`,
          label: srcItem.title,
          name: source.name,
          type: source.type
        },
        position: {
          x: def.position ? def.position.x : 0,
          y: def.position ? def.position.y : 0
        },
        selectable: true
      } as any);
    }

    for (const targetDef of Object.values(this.cState.targets)) {
      const targTally =
        result.itemTallies[`${targetDef.type}-${targetDef.name}`];
      const targItem = data.findItem(targetDef.type, targetDef.name)!;

      els.push({
        classes: ["item", "target"],
        data: {
          countStr: (targTally ? targTally.netResult : 0).toFixed(2) + "x",
          icon: targItem.icon || targItem.icons,
          id: `target-${targetDef.type}-${targetDef.name}`,
          label: targItem.title,
          name: targetDef.name,
          type: targetDef.type
        },
        position: {
          x: targetDef.position ? targetDef.position.x : 0,
          y: targetDef.position ? targetDef.position.y : 0
        },
        selectable: true
      } as any);
    }

    const recipes = Object.values(result.recipes);
    const recipesByResult: { [key: string]: CalcResultRecipe[] } = {};

    for (const r of recipes) {
      for (const i of r.results) {
        if (recipesByResult[`${i.type}-${i.name}`] === undefined) {
          recipesByResult[`${i.type}-${i.name}`] = [];
        }
        recipesByResult[`${i.type}-${i.name}`].push(r);
      }
    }

    for (let rcpIdx = 0; rcpIdx < recipes.length; rcpIdx++) {
      const r = recipes[rcpIdx];
      const recipe = data.recipes[r.name];
      const idName = `recipe-${r.name}`;
      let rcpX = 0;
      let rcpY = rcpIdx * -180;

      if (this.cState.recipes[r.name].position !== undefined) {
        rcpX = this.cState.recipes[r.name].position!.x;
        rcpY = this.cState.recipes[r.name].position!.y;
      }

      let height: number;
      if (!r.results.length || !r.ingredients.length) {
        height = 185;
      } else {
        height = 85;
      }
      rcpY -= height / 2;

      const el: any = {
        classes: ["recipe"],
        data: {
          id: idName,
          label: recipe.title,
          recipeName: r.name
        },
        selectable: true
      };

      els.push(el);

      for (let idx = 0; idx < r.results.length; idx++) {
        const rslt = r.results[idx];
        const rsltItem = data.findItem(rslt.type, rslt.name)!;
        const rsltId = `${idName}-rslt-${rslt.type}-${rslt.name}`;
        const targOutput = this.cState.targets[`${rslt.type}-${rslt.name}`];

        els.push({
          classes: ["item", "result"],
          data: {
            countStr: rslt.amount.toFixed(2) + "x",
            icon: rsltItem.icon || rsltItem.icons,
            id: rsltId,
            name: rslt.name,
            parent: idName,
            type: rslt.type
          },
          // grabbable: false,
          position: { x: rcpX + idx * 64, y: rcpY + 100 },
          selectable: false
        } as any);

        if (targOutput !== undefined) {
          const srcId = `target-${targOutput.type}-${targOutput.name}`;

          els.push({
            data: {
              id: `edge-${idName}|${srcId}|targOutput|${rslt.type}|${
                rslt.name
              }`,
              source: rsltId,
              target: srcId
            },
            // grabbable: false,
            selectable: false
          } as any);
        }
      }

      for (let idx = 0; idx < r.ingredients.length; idx++) {
        const ingd = r.ingredients[idx];
        const ingdItem = data.findItem(ingd.type, ingd.name)!;
        const producers = recipesByResult[`${ingd.type}-${ingd.name}`];
        const infSource = this.cState.sourceNodes[`${ingd.type}-${ingd.name}`];
        const ingdId = `${idName}-ingd-${ingd.type}-${ingd.name}`;

        els.push({
          classes: ["item", "ingredient"],
          data: {
            countStr: ingd.amount.toFixed(2) + "x",
            icon: ingdItem.icon || ingdItem.icons,
            id: ingdId,
            name: ingd.name,
            parent: idName,
            type: ingd.type
          },
          events: "no",
          // grabbable: false,
          position: { x: rcpX + idx * 64, y: rcpY },
          selectable: false
        } as any);

        if (producers !== undefined) {
          for (const targ of producers) {
            const prodId = `recipe-${targ.name}`;
            const prodRsltId = `${prodId}-rslt-${ingd.type}-${ingd.name}`;

            els.push({
              data: {
                id: `edge-${idName}|${prodId}|ingd|${ingd.type}|${ingd.name}`,
                source: prodRsltId,
                target: ingdId
              },
              // grabbable: false,
              selectable: false
            } as any);
          }
        }
        if (infSource !== undefined) {
          const srcId = `source-${infSource.type}-${infSource.name}`;

          els.push({
            data: {
              id: `edge-${idName}|${srcId}|infSrc|${ingd.type}|${ingd.name}`,
              source: srcId,
              target: ingdId
            },
            // grabbable: false,
            selectable: false
          } as any);
        }
      }
    }

    return els;
  }

  /**
   * Initialize basic Cytoscape.js settings
   *
   * @param cy
   */
  private setRef = (cy: Core) => {
    console.log("[PackItemGraphCyto] setRef");
    this.cy = cy;

    (window as any).cy = cy;
    (window as any).cs = this.cState;

    (this.cy as any).gridGuide(gridOptions);

    cy.on("position", "node", event => {
      /**
       * Save the new position of moved nodes after release
       */

      const rootNode = getRootNode(event.target);
      const active = rootNode.active() || event.target.active();
      const pos = rootNode.modelPosition();

      if (active || rootNode.width() === 0) {
        // either still grabbed or this is an onload event
        return;
      }

      console.log("[PackItemGraphCyto] position", event, rootNode.id());

      if (rootNode.hasClass("recipe")) {
        this.cState.recipes[rootNode.data("recipeName")].position = {
          x: pos.x - (rootNode.width() - 40) / 2,
          y: pos.y
        };
      } else if (rootNode.hasClass("source")) {
        this.cState.sourceNodes[
          `${rootNode.data("type")}-${rootNode.data("name")}`
        ].position = {
          x: pos.x,
          y: pos.y
        };
      } else if (rootNode.hasClass("target")) {
        this.cState.targets[
          `${rootNode.data("type")}-${rootNode.data("name")}`
        ].position = {
          x: pos.x,
          y: pos.y
        };
      }

      this.props.location.hash = `#${this.cState.export()}`;
      this.props.history.replace(this.props.location);
    });

    this.initCxtMenu(cy);
  };
}

export default PackItemGraphCyto;
