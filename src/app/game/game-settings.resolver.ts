import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GameService } from '../core/game/game.service';
import { Injectable } from '@angular/core';


@Injectable()
export class GameSettingsResolver implements Resolve<any> {
  constructor(private gameService: GameService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.gameService.getSettings();
  }

}
