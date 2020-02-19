import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apiService: ApiService) {
  }

  getSettings() {
    return this.apiService.get('game-settings');
  }

  getWinners() {
    return this.apiService.get('winners');
  }

}
