export interface Prototype {
  localised_description: Array<string[] | string> | string | undefined;
  localised_name: Array<string[] | string> | string | undefined;
  name: string;
  order?: string;
  title: string | undefined;
  type: PrototypeType;
}

export interface PrototypeHasIcon extends Prototype {
  dark_background_icon?: string;
  icon?: string;
  icon_size?: number;
  icons?: Icon[];
}

export interface Icon {
  icon: string;
  scale?: number | undefined;
  shift?: number[] | undefined;
  tint?: Tint | undefined;
}

export interface Tint {
  a?: number;
  b: number;
  g: number;
  r: number;
}

export type PrototypeType = string;
