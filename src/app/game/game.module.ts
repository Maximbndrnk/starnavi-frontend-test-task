import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { GameWinnersResolver } from './game-winners.resolver';
import { GameSettingsResolver } from './game-settings.resolver';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GameComponent,
    ScoreBoardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    GameWinnersResolver,
    GameSettingsResolver,
  ],
})
export class GameModule {
}
