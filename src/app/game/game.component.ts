import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../core/game/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ceil } from './ceil.interface';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  playGroundArr = [];
  gameSettings = [];
  gameWinners = [];
  winner = {
    winner: '',
    date: new Date(),
  };
  gameForm: FormGroup;
  score = {
    user: 0,
    ai: 0,
  };
  pointsToWin = -1;
  changeInterval = 0;
  gameCeilNumber = 0;
  isGameRunning = false;
  gameSbsc: any;
  message = 'Enter your name and difficulty';


  constructor(private gameService: GameService,
              private route: ActivatedRoute,
  ) {
    this.gameForm = new FormGroup({
      difficulty: new FormControl('5', [Validators.required]),
      name: new FormControl('User name', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
    this.gameSettings = this.getGameSettings(this.route.snapshot.data.gameSettings);
    this.gameWinners = this.route.snapshot.data.gameWinners;
  }

  getGameSettings(settings): any[] {
    return Object.keys(settings).map((ind) => {
      const s = settings[ind];
      s.label = ind;
      return s;
    });
  }

  sendResult() {
    this.winner.date = new Date(Date.now());
    this.winner.winner = this.score.user > this.score.ai ? this.gameForm.value.name : 'AI';
    this.gameService.sendResult(this.winner).subscribe((resp) => {
      this.gameWinners.push(this.winner);
    }, (err) => {
    }, () => {
      this.resetData();
    });
  }

  resetData() {
    this.message = `Last game ${ this.score.user > this.score.ai ? this.gameForm.value.name : 'AI'} win. Enter your name and difficulty`;
    this.pointsToWin = -1;
    this.playGroundArr = [];
    this.isGameRunning = false;
    this.gameSbsc.unsubscribe();
  }

  stopGame() {
    this.resetData();
  }

  endGame() {
    this.sendResult();
  }

  prepareGame() {
    this.isGameRunning = true;
    console.log('Val', this.gameForm.value);
    this.message = `Preparing game.`;
    this.createPlayGround();
    // this.startGame();
    this.score = {user: 0, ai: 0,};
    this.launchCountdown();
  }

  startGame() {
    this.message = `Go!!!`;
    const sbsc = interval(+this.changeInterval).pipe(take(this.gameCeilNumber ** 2));
    let currCeil = new Ceil();
    currCeil.alreadyUsed = true;
    this.gameSbsc = sbsc.subscribe((i) => {
      if (currCeil.winner !== 1 && currCeil.status === 1) {
        currCeil.winner = 2;
        currCeil.alreadyUsed = true;
        currCeil.status = 0;
        this.score.ai++;
      }

      if (this.score.user === this.pointsToWin || this.score.ai === this.pointsToWin) {
        this.endGame();
      } else {
        let counter = 0;
        while (currCeil.alreadyUsed) {
          if (counter > this.gameCeilNumber ** 2) {
            break;
          }
          counter++;
          const x = this.getRandomInt(this.gameCeilNumber - 1);
          const y = this.getRandomInt(this.gameCeilNumber - 1);
          currCeil = this.playGroundArr[x][y];
        }
        currCeil.status = 1;
      }
    });
  }

  createPlayGround() {
    const numOfCeils: number = +this.gameForm.value.difficulty;
    this.gameCeilNumber = numOfCeils;
    this.changeInterval = this.gameSettings.find(i => i.field == numOfCeils).delay;
    this.pointsToWin = Math.floor((numOfCeils ** 2) / 2) + 1;
    for (let i = 0; i < this.gameCeilNumber; i++) {
      for (let j = 0; j < this.gameCeilNumber; j++) {
        if (!this.playGroundArr[i]) {
          this.playGroundArr[i] = [];
        }
        this.playGroundArr[i][j] = new Ceil();
      }
    }
  }

  launchCountdown() {
    let counter = 3;
    const secondsCounter = interval(500).pipe(take(5));

    secondsCounter.subscribe((i) => {
      i === 4 ? this.startGame() : this.message = `The game will start in ${counter--}`;
    });

  }

  handleClick(ceil: Ceil) {
    if (ceil.status === 1) {
      ceil.winner = 1;
      ceil.alreadyUsed = true;
      this.score.user++;
    }

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
  }

}
