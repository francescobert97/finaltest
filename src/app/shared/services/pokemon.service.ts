import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { PokemonStatus } from '../enums/enums';
import { IPokemon, Pokemon } from '../model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  url:number = 1;
  public pokemons:Pokemon[] = [];
  public pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  public pokemonSingleDetails!:Pokemon;
  private readonly FILTERCATCHED = (pokemon:Pokemon) => pokemon.status === PokemonStatus.CATCHED;
  private readonly FILTERDENY = (pokemon:Pokemon) => pokemon.status === PokemonStatus.DENY;
  constructor(private http: HttpClient) { }
  public getRandomNumber():void {
    this.url = Math.floor(Math.random() * 898);
  }
  public getRandomPokemon():Observable<Pokemon> {
    return this.http.get<IPokemon>(`https://pokeapi.co/api/v2/pokemon/${this.url}`).pipe(
      map(pkmn => new Pokemon(
        pkmn.abilities, pkmn.base_experience, pkmn.forms, pkmn.game_indices, pkmn.height, pkmn.held_items, pkmn.id, pkmn.is_default, pkmn.location_area_encounters, pkmn.moves, pkmn.name, pkmn.order, pkmn.past_types, pkmn.species, pkmn.sprites, pkmn.stats, pkmn.types
        )),
      catchError(error => {
        console.error('error occured', error);
        throw new Error(error);
      })
    )
  }

  public catchedPokemon(pokemon:Pokemon) {
    const find = this.pokemons.find(pkmn => pkmn.id === pokemon.id);
    const catchedPokemons = this.pokemons.filter(this.FILTERCATCHED);
    if(find) {
      find.status = PokemonStatus.CATCHED;
    }else {
      if(catchedPokemons.length === 6) {
        alert('Il tuo team è al completo')
      }else {
      pokemon.status = PokemonStatus.CATCHED;
      this.pokemons.push(pokemon);
      }
    }
    this.dispatchPokemon();
  }

  public denyPokemon(pokemon:Pokemon):void {
    const find = this.pokemons.find(pkmn => pkmn.id === pokemon.id);
    if(find) {
      find.status = PokemonStatus.DENY;
    }else {
      pokemon.status = PokemonStatus.DENY;
      this.pokemons.push(pokemon);
    }
    this.dispatchPokemon();
  }

  public getAllCatchedPokemon():Observable<Pokemon[]> {
      return this.getPokemonOnFilter(this.FILTERCATCHED);
  }

  public getAllDenyPokemon():Observable<Pokemon[]> {
    return this.getPokemonOnFilter(this.FILTERDENY);
  }


  public getPkmnDetail(pokemon:Pokemon) {
    this.pokemonSingleDetails = pokemon;
  }
  
  public deletePokemonOnTeam(pokemon:Pokemon) {
   const result = this.pokemons.indexOf(pokemon);
    this.pokemons.splice(result, 1);
  }
  
  private getPokemonOnFilter(funcFilter:(pokemon:Pokemon) => boolean):Observable<Pokemon[]> {
    return this.pokemons$.asObservable().pipe(
      map(pkmn => pkmn.filter(funcFilter))
    );
  }
  private dispatchPokemon():void {
    this.pokemons$.next(this.pokemons);
  }
}
