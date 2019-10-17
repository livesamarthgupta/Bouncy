import { Injectable } from '@angular/core';
import {PlayerClass} from './player';
import { PLAYERS, KEYCODES } from "./player-stock";
import { Router } from '@angular/router';
declare var chroma:any;
import * as chroma from 'chroma-js';

@Injectable()
export class PlayerService {

  private keyCodes : string = KEYCODES;
  private players : PlayerClass[];
  private maxScore : number = 100;

  getPlayers() : PlayerClass[] {
          // If its defined in localStorage
          if(typeof localStorage !== 'undefined'
          && typeof localStorage.players !=='undefined'
          && localStorage.players !==''){
            this.players = JSON.parse(localStorage.players);
          }
          // If its not defined in localStorage, then take the stock players
          else{
           this.players = PLAYERS ;
          }
          return this.players;
        }

  addPlayer(name: string): void {
      this.cleanKeyCodes();
      var randomNum = Math.floor(Math.random()*100) % (this.keyCodes.length);
      var newKeyCode = this.keyCodes.charAt(randomNum);
      if(newKeyCode  === '') return;
      var newPlayer = {name:name,keyCode:newKeyCode,color:chroma.random().hex(),score:0,duration:'0s',dribbles_left:0};
      if(typeof localStorage !== 'undefined')
      {
          localStorage.setItem('players',JSON.stringify(this.players));
      }
      this.players.push(newPlayer);
     }
  
  cleanKeyCodes(): void{
        var t =this;
        t.players.forEach(function(element){
         t.keyCodes = t.keyCodes.replace(element.keyCode,'');
        });
      }

  scorePlayers(event):void{
        var t = this;
        var key = String.fromCharCode(event.keyCode);
        //Key codes for A = 65  and Z = 90
        if(event.keyCode>64 && event.keyCode<91)
        {
          //Find the player for pressed keyCode
          (this.players).forEach(function(player)
          {
            if(player.keyCode == key)
            {
                  player.score +=10;
                  player.dribbles_left +=1;
                  if(player.score > t.maxScore)
                  {
                    t.router.navigate(['/winner',{player:JSON.stringify(player)}]);
                  }
            }
           });
         }
    }
    
  dribbling():void{
      if(typeof this.players === 'undefined')
      {
      this.players = this.getPlayers();
      }
      (this.players).forEach(function(player)
      {
       // Duration of dribble if dribbles_left is greater than 0
       player.duration = (player.dribbles_left>0?1/player.dribbles_left:0)+'s';
       player.dribbles_left = 0;
      });
      var t = this;
      // Call this function again after 1 second
      setTimeout(function(){ t.dribbling();},1000)
     }
  
  constructor(private router : Router) { }

}
