import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Pokemon } from 'src/app/shared/model/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-data-card',
  template: `
    <h2>
      {{title}}
    </h2>
    <div>
      
      <div *ngFor="let pkmn of pokemons; let idx = index">
        <div>
          <p (click)="showPokemonDetail(pkmn)" >{{pkmn.name}}, click for see full detail</p>
          <img src="{{pkmn?.sprites?.back_default}}">
          <button class="btn btn-danger" *ngIf="deleteButton" (click)="deletePokemonOnTeam(idx, pkmn)">delete</button>
        </div>

        
          <ng-template #fullTeam>
            <p>your team is full, delete one pokemon</p>
            <img src="{{pkmn?.sprites?.back_default}}">
            <button class="btn btn-danger" (click)="deletePokemonOnTeam(idx, pkmn)">delete</button>
          </ng-template>

      </div>
  
    </div>
  `,
  styles: [
    `
        p {
        cursor: pointer;
        }
    `
  ]
})
export class DataCardComponent implements OnInit {
  @Input() title:string = '';
  @Input() pokemons$!:Observable<Pokemon[]>;
  @Input() deleteButton:boolean = false;
  public pokemons:Pokemon[] = [];
  public pokemon!:Pokemon;
  subject$ = new Subject<Pokemon[]>();
  constructor(private router:Router, private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.pokemons$.subscribe(pkmn => this.pokemons = pkmn);
    localStorage.setItem('pokemon', 'pokemonarray');
    
  }


  public showPokemonDetail(pokemon:Pokemon) {
    this.router.navigateByUrl('pokemon-detail');
    this.pokemonService.getPkmnDetail(pokemon);
    this.pokemon = pokemon;
  }

  public deletePokemonOnTeam (idx:number, pokemon:Pokemon) {
     this.pokemons.splice(idx, 1);
     this.pokemonService.deletePokemonOnTeam(pokemon);
  }

}
