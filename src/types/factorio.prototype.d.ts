export interface Prototype {
    localised_description: Array<string[] | string> | string | undefined;
    localised_name: Array<string[] | string> | string | undefined;
    name: string;
    order?: string;
    title: string | undefined;
    type: PrototypeType;
}

export interface PrototypeHasIcon extends Prototype {
    icon?: string;
    icon_size?: number;
    icons?: Icon[];
    dark_background_icon?: string;
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
