import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from '../components/home-container.component';
import { DataCardComponent } from '../components/data-card.component';
import { PullCardComponent } from '../components/pull-card.component';


@NgModule({
  declarations: [
    HomeContainerComponent,
    PullCardComponent,
    DataCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
