import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PokemonStatus, typeBoxPokemon } from 'src/app/shared/enums/enums';
import { Pokemon } from 'src/app/shared/model/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-home',
  template: `
    <div id="content" class="d-flex justify-content-around m-4 bg-dark text-light">
      <app-data-card  [deleteButton]="true" [title]="'team'" [pokemons$]="catched"></app-data-card>
      <app-data-card  [title]="'deny pokemon'" [pokemons$]="deny"></app-data-card>
    </div>

    <div class="m-4 bg-dark text-light d-flex justify-content-center">
      <app-pull-card></app-pull-card>
    </div>
  `,
  styles: [
    `
    #content {
      overflow-y: scroll;
      height: 500px;
    }
    `
  ]
})
export class HomeContainerComponent implements OnInit {
  catched!:Observable<Pokemon[]>;
  deny!:Observable<Pokemon[]>;
  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.catched = this.pokemonService.getAllCatchedPokemon();
    this.deny = this.pokemonService.getAllDenyPokemon()
  }

  
}
