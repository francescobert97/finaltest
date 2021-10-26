import { PokemonStatus } from "../enums/enums";

export interface ISpecies {
    name: string,
    url: string
}

export interface ISprites {
    back_default?: string,
    back_female?: string,
    back_shiny?: string,
    back_shiny_female?: string ,
    front_default?:string , 
    front_female?:string,
    front_shiny?: string,
    other: object,
    versions: object
}


export interface IPokemon {
    abilities: [],
    base_experience: number,
    forms: [],
    game_indices: [],
    height: number,
    held_items: [],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: [],
    name: string,
    order: number,
    past_types: [],
    species:  ISpecies,
    sprites: ISprites,
    stats: [],
    types: []
}

export class Pokemon {
    constructor(
       private _abilities: [],
       private _base_experience: number,
       private _forms: [],
       private _game_indices: [],
       private _height: number,
       private _held_items: [],
       private _id: number,
       private _is_default: boolean,
       private _location_area_encounters: string,
       private _moves: [],
       private _name: string,
       private _order: number,
       private _past_types: [],
       private _species:  ISpecies,
       private _sprites: ISprites,
       private _stats: [],
       private _types: [],
       private _status = PokemonStatus.NOASSIGNED
    ) {}

    get abilities():[] {
        return this._abilities
    }


    get base_experience():number {
        return this._base_experience;
    }


    get forms():[] {
        return this._forms
    }


    get game_indices():[] {
        return this._game_indices;
    }


    get height():number {
        return this._height;
    }


    get held_items():[] {
        return this._held_items;
    }

    get id():number {
        return this._id;
    }

    get is_default():boolean {
        return this._is_default;
    }

    get location_area_encounters():string {
        return this._location_area_encounters;
    }

    get moves():[] {
        return this._moves;
    }

    get name():string {
        return this._name;
    }

    get order():number {
        return this._order;
    }

    get past_types():[] {
        return this._past_types;
    }

    get species():ISpecies {
        return this._species
    }

    get sprites():ISprites {
        return this._sprites;
    }

    get stats():[] {
        return this._stats;
    }

    get types():[] {
        return this._types;
    }

    get status():PokemonStatus {
        return this._status;
    }

    set status(status:PokemonStatus) {
        this._status = status;
    }
}