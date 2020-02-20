import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../core/game/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameSettings = {};
  gameWinners = [];
  winner = {};
  gameForm: FormGroup;


  constructor(private gameService: GameService,
              private route: ActivatedRoute,
  ) {
    this.gameForm = new FormGroup({
      name: new FormControl(''),
      difficulty: new FormControl('', Validators.minLength(2))
    });
  }

  ngOnInit(): void {
    this.gameSettings = this.getGameSettings(this.route.snapshot.data.gameSettings);
    this.gameWinners = this.route.snapshot.data.gameWinners;
    console.log('Data', this);
  }

  getGameSettings(settings): any[] {
    return Object.keys(settings).map((ind) => {
      const s = settings[ind];
      s.label = ind;
      return s;
    });
  }

  sendResult() {
    this.gameService.sendResult(this.winner).subscribe((resp) => {
      console.log('all is ok');
    });
  }

  startGame() {
    console.log('Val', this.gameForm.value);
  }

}
