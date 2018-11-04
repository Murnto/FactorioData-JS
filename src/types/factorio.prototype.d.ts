export interface Prototype {
    name: string;
    type: PrototypeType;
    title: string | undefined;
    order?: string;
    localised_name: Array<string[] | string> | string | undefined;
    localised_description: Array<string[] | string> | string | undefined;
}

export interface PrototypeHasIcon extends Prototype {
    icon: string | undefined;
    icon_size: number | undefined;
    icons: Icon[] | undefined;
    dark_background_icon: string | undefined;
}

export interface Icon {
    icon: string;
    tint?: Tint | undefined;
    shift?: number[] | undefined;
    scale?: number | undefined;
}

export interface Tint {
    g: number;
    r: number;
    a?: number;
    b: number;
}

export type PrototypeType = string;
