import * as React from "react";
import { PrototypeIcon } from "../Minor/prototypeIcon";
import { RecipeList } from "../Recipe/recipeList";
import { Effect, Technology } from "../../types/factorio.technology";
import { Recipe } from "../../types/factorio.recipe";
import Container from "reactstrap/lib/Container";
import { PrototypeLink } from "../Minor/prototypeLink";
import { RouteComponentProps } from "react-router";
import { PackComponent } from "../../Utils/packComponent";

type TechSingleInfoProps = RouteComponentProps<{
  techName: string;
}>;

interface TechSingleInfoState {
  otherEffects: Effect[];
  recipeUnlockedBy: Recipe[];
  tech: Technology | null;
  techAllows: Technology[];
  techRequired: Technology[];
}

export class TechSingleInfo extends PackComponent<
  TechSingleInfoProps,
  TechSingleInfoState
> {
  constructor(p: any, s?: any) {
    super(p, s);

    this.state = {
      otherEffects: [],
      recipeUnlockedBy: [],
      tech: null,
      techAllows: [],
      techRequired: []
    };
  }

  public componentDidMount() {
    this.initInfo();
  }

  public componentDidUpdate(prevProps: TechSingleInfoProps) {
    if (prevProps.match.params.techName !== this.props.match.params.techName) {
      this.initInfo();
    }
  }

  public render() {
    const { match } = this.props;
    const { techName } = match.params;
    const {
      tech,
      otherEffects,
      techRequired,
      techAllows,
      recipeUnlockedBy
    } = this.state;

    console.log("[TechSingleInfo] Render with", this.data.packId, tech);

    return (
      <Container>
        <div>
          {(tech !== null && (
            <h2>
              <PrototypeIcon item={tech} /> {tech.title}
            </h2>
          )) || <h2>{techName}</h2>}

          <br />

          {otherEffects.length > 0 && (
            <div>
              <h3>Effects</h3>
              {otherEffects.map((obj, i) => (
                <div key={i}>{JSON.stringify(obj)}</div>
              ))}
              <br />
            </div>
          )}
          {techRequired.length > 0 && (
            <div>
              <h3>Requires</h3>
              {techRequired.map(obj => (
                <div key={obj.name}>
                  <PrototypeLink item={obj} to={this.data.link.toTech(obj)} />
                </div>
              ))}
              <br />
            </div>
          )}
          {techAllows.length > 0 && (
            <div>
              <h3>Allows</h3>
              {techAllows.map(obj => (
                <div key={obj.name}>
                  <PrototypeLink item={obj} to={this.data.link.toTech(obj)} />
                </div>
              ))}
              <br />
            </div>
          )}
          {recipeUnlockedBy.length > 0 && (
            <div>
              <h3>Unlocks</h3>
              <RecipeList recipes={recipeUnlockedBy} noTechUnlocks />
            </div>
          )}
        </div>
      </Container>
    );
  }

  public shouldComponentUpdate(
    nextProps: Readonly<TechSingleInfoProps>,
    nextState: Readonly<TechSingleInfoState>
  ): boolean {
    console.log("shouldComponentUpdate(", nextProps, nextState, ")");
    return (
      this.props.match.params.techName !== nextProps.match.params.techName ||
      this.state.tech !== nextState.tech ||
      this.state.recipeUnlockedBy !== nextState.recipeUnlockedBy ||
      this.state.techAllows !== nextState.techAllows ||
      this.state.techRequired !== nextState.techRequired
    );
  }

  private initInfo() {
    const { match } = this.props;
    const { techName } = match.params;

    const tech = this.data.technologies[techName];
    const techRequired: Technology[] = [];
    const recipeUnlockedBy: Recipe[] = [];
    const otherEffects: Effect[] = [];

    if (tech.prerequisites !== undefined) {
      for (const pre of tech.prerequisites) {
        const preTech = this.data.technologies[pre];

        if (preTech !== undefined) {
          techRequired.push(preTech);
        }
      }
    }

    for (const effect of tech.effects) {
      if (effect.type === "unlock-recipe" && effect.recipe !== null) {
        const recipe = this.data.recipes[effect.recipe];

        if (recipe !== undefined) {
          recipeUnlockedBy.push(recipe);
        }
      } else {
        otherEffects.push(effect);
      }
    }

    console.time(`loadTechSingleInfo:${techName}`);
    this.setState({
      otherEffects,
      recipeUnlockedBy,
      tech,
      techRequired,
      techAllows: this.data.technologiesAllowed[tech.name] || []
    });
    console.timeEnd(`loadTechSingleInfo:${techName}`);
  }
}
