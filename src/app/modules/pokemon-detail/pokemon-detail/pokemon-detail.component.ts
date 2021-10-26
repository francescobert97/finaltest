import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/shared/model/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  template: `
    <h1 class="text-center">
      POKEMON DETAILS
    </h1>

    <div class="w-100 bg-dark text-light d-flex flex-column align-items-center">
      <button class="btn btn-danger" (click)="backToHome()">back to home</button>
      <p>name: {{pokemon?.name}}</p>
      <img src="{{pokemon?.sprites?.back_default}}">
      <p>experience: {{pokemon?.base_experience}}</p>
      <p>height: {{pokemon?.height}}</p>
    </div>
  `,
  styles: [
  ]
})
export class PokemonDetailComponent implements OnInit {
  pokemon!:Pokemon;
  constructor(private pokemonService:PokemonService, private router:Router) { }

  ngOnInit(): void {
   this.pokemon = this.pokemonService.pokemonSingleDetails;
  }

  backToHome() {
    this.router.navigateByUrl('home');
  }

}
