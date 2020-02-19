import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../core/game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameSettings = {};
  gameWinners = [];
  winner = {};

  constructor(private gameService: GameService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameSettings = this.route.snapshot.data.gameSettings;
    this.gameWinners = this.route.snapshot.data.gameWinners;
    console.log('Data', this);
  }

  sendResult() {
    this.gameService.sendResult(this.winner).subscribe((resp) => {
      console.log('all is ok');
    });
  }

}
