import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { GameSettingsResolver } from './game-settings.resolver';
import { GameWinnersResolver } from './game-winners.resolver';

const routes: Routes = [
  {
    path: 'game',
    component: GameComponent,
    resolve: {
      gameSettings: GameSettingsResolver,
      gameWinners: GameWinnersResolver
    },
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'game'
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {
}
