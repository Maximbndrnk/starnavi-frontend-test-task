import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { GameWinnersResolver } from './game-winners.resolver';
import { GameSettingsResolver } from './game-settings.resolver';


@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
  ],
  providers: [
    GameWinnersResolver,
    GameSettingsResolver,
  ],
})
export class GameModule {
}
