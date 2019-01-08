import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Dropzone from "react-dropzone";
import { fromEvent } from "file-selector";
import { FactorioMod } from "browserparse/lib/factorioMod";
import { Button, Container, ListGroup } from "reactstrap";
import { CustomModEntry, DecadencyStatus } from "./customModEntry";
import { FactorioPack } from "browserparse/lib/factorioPack";
import { ModDependencyError } from "browserparse/lib/modDependencyError";
import * as FileSaver from "file-saver";
// import "../repro";

interface CustomPackCreationProps extends RouteComponentProps {
  foo?: any;
}

interface CustomPackCreationState {
  allOk: boolean;
  depState: { [name: string]: DecadencyStatus };
  droppedMods: { [name: string]: FactorioMod };
}

export default class CustomPackCreation extends React.Component<
  CustomPackCreationProps,
  CustomPackCreationState
> {
  public pack: FactorioPack = new FactorioPack("TODO");

  constructor(props: any, context?: any) {
    super(props, context);
    console.log("[CustomPackCreation] initialized");

    this.state = {
      allOk: false,
      depState: {},
      droppedMods: {}
    };
  }

  public async componentDidMount() {
    console.log("[CustomPackCreation] componentDidMount");
  }

  public componentDidUpdate(prevProps: CustomPackCreationProps) {
    console.log(
      "[CustomPackCreation] componentDidMount",
      this.props,
      prevProps
    );
  }

  public render() {
    const { match } = this.props as any;
    const { depState } = this.state;
    console.log("[CustomPackCreation] Render with", match, this.state);

    return (
      <Container>
        <Button disabled={!this.state.allOk} onClick={this.createPack}>
          Create
        </Button>
        <Dropzone getDataTransferItems={fromEvent} onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drop a folder with files here</p>
            </div>
          )}
        </Dropzone>
        <div>
          <h4>Mods</h4>
          <ListGroup>
            {Object.values(this.state.droppedMods).map(f => (
              <CustomModEntry
                key={f.info.name}
                mod={f}
                dependencyState={depState[f.info.name]}
                onRemove={this.removeMod}
              />
            ))}
          </ListGroup>
        </div>
      </Container>
    );
  }

  private checkDeps() {
    // reset dep state
    const cleanDeps = {};
    for (const mod of Object.values(this.pack.mods)) {
      cleanDeps[mod.info.name] = { success: false };
    }
    this.setState({
      depState: cleanDeps
    });

    try {
      this.pack.resolveMods();

      // mark parsed mods as OK
      const updDeps = {};
      for (const mod of this.pack.modLoadOrder) {
        updDeps[mod] = { success: true };
      }
      this.setState(prevState => ({
        allOk: true,
        depState: Object.assign({}, prevState.depState, updDeps)
      }));
    } catch (e) {
      if (e instanceof ModDependencyError) {
        console.log("was", e);

        if (e.mod !== undefined) {
          // mark parsed mods as OK
          const updDeps = {};
          for (const mod of this.pack.modLoadOrder) {
            updDeps[mod] = { success: true };
          }
          // flag the errored mod
          updDeps[e.mod.info.name] = { success: false, error: e };

          this.setState(prevState => ({
            allOk: false,
            depState: Object.assign({}, prevState.depState, updDeps)
          }));
        }
      } else {
        throw e;
      }
    }
  }

  private createPack = async () => {
    const packData = await this.pack.dumpPack();
    const blob = new Blob([JSON.stringify(packData)]);

    FileSaver.saveAs(blob, `${this.pack.packName}.json`);
  };

  private onDrop = async (accepted: File[]) => {
    await Promise.all(
      accepted.map(async f => {
        const m = new FactorioMod();
        await m.loadBrowserFile(f, true);

        this.pack.addMod(m);

        console.log(f);
        const upd = {};
        upd[m.info.name] = m;
        const updDeps = {};
        updDeps[m.info.name] = { success: false };

        this.setState(prevState => ({
          depState: Object.assign({}, prevState.depState, updDeps),
          droppedMods: Object.assign({}, prevState.droppedMods, upd)
        }));
      })
    );

    this.checkDeps();
  };

  private removeMod = (name: string) => {
    this.pack.removeMod(name);

    this.setState(prevState => {
      const depState = Object.assign({}, prevState.depState);
      const droppedMods = Object.assign({}, prevState.droppedMods);

      delete depState[name];
      delete droppedMods[name];

      return {
        depState,
        droppedMods
      };
    });

    this.checkDeps();
  };
}
