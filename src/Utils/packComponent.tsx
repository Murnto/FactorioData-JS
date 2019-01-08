import * as React from "react";
import { PackContext, PackLoadedData } from "../packLoadedData";
import { ComponentLifecycle } from "react";

// tslint:disable-next-line:no-empty-interface
// @ts-ignore
export interface PackComponent<P = {}, S = {}, SS = any>
  extends ComponentLifecycle<P, S, SS> {}
export class PackComponent<P, S> extends React.Component<P, S> {
  public static contextType = PackContext;

  public get data(): PackLoadedData {
    return this.context;
  }
}
