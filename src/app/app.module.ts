import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PlayerService } from "./player.service";
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { PlaygroundComponent } from './playground/playground.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlaywinnerComponent } from './playwinner/playwinner.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlaygroundComponent,
    PlaywinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
