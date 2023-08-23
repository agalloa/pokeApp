export interface PokemonListResponse {
    count: number;
    next?: string;
    previous?: string;
    results: SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url: string;
    id: number;
    img: string;
    abilities?: Ability[];
    types?: string[];
    base_experience?: number;
    height?: number;
    weight?: number;
    species?: Species;
    sprites?: PokemonSprites;
}
export interface Species {
    name: string;
    url: string;
}
export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
    back_female: string;
    front_female: string;
    front_shiny: string;
    back_shiny: string;
}