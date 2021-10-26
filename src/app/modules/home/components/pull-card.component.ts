import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonStatus } from 'src/app/shared/enums/enums';
import { Pokemon } from 'src/app/shared/model/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-pull-card',
  template: `
     <p>
      POKEMON CONTAINER
    </p>
    <div>
      <p>{{pokemon?.name}}</p>
      <img src="{{pokemon?.sprites?.back_default}}">
      <button class="btn btn-success" (click)="getBoxPokemonDestination(pokemonType.CATCHED, pokemon)">cattura</button>
      <button class="btn btn-danger" (click)="getBoxPokemonDestination(pokemonType.DENY, pokemon)">rifiuta</button>
    </div>
  `,
  styles: [
  ]
})
export class PullCardComponent implements OnInit, OnDestroy {
  startSubscription!: Subscription;
  randomPokemonSubscription!:Subscription;
  pokemon!:Pokemon;
  pokemonType = PokemonStatus;
  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getRandomNumber();
    this.startSubscription = this.pokemonService.getRandomPokemon().subscribe(pokemon => this.pokemon = pokemon);
    this.randomPokemonSubscription = this.randomSubscription();
  }

  private getRandomPokemon() {
    this.pokemonService.getRandomNumber();
    this.randomSubscription()
  }
  public getBoxPokemonDestination(status:PokemonStatus ,pokemon:Pokemon) {
    this.getRandomPokemon();
    switch(status) {
      case(PokemonStatus.CATCHED):
        this.pokemonService.catchedPokemon(pokemon);
      break;
      case(PokemonStatus.DENY):
        this.pokemonService.denyPokemon(pokemon);
      break;
    }
  }

  ngOnDestroy():void {
    this.startSubscription.unsubscribe();
    this.randomPokemonSubscription.unsubscribe();
    

  }

  private randomSubscription():Subscription {
    return this.pokemonService.getRandomPokemon().subscribe(pokemon => this.pokemon = pokemon);
  }
  
}
