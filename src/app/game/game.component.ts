import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../core/game/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ceil } from './ceil.interface';
import { interval, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  const;
  nums = of(3, 2, 1, 0);

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
  pointsToWin = 0;
  changeInterval = 0;
  isGameRunning = false;

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
    this.winner.date = new Date(Date.now());
    this.gameService.sendResult(this.winner).subscribe((resp) => {
      console.log('all is ok');
    });
  }

  endGame() {
    this.pointsToWin = 0;
    this.playGroundArr = [];
    this.isGameRunning = false;
    this.sendResult();
  }

  prepareGame() {
    console.log('Val', this.gameForm.value);
    this.message = `Preparing game.`;
    this.createPlayGround();
    this.launchCountdown();
  }

  startGame() {
    console.log('Val', this.gameForm.value);
    this.message = `Go!!!`;
    this.isGameRunning = true;
  }

  createPlayGround() {
    const numOfCeils: number = +this.gameForm.value.difficulty;
    this.changeInterval = this.gameSettings.find(i => i.field == numOfCeils).delay;
    console.log('changeInterval', this.changeInterval);
    this.pointsToWin = Math.floor((numOfCeils ** 2) / 2) + 1;
    this.playGroundArr = Array(numOfCeils).fill(Array(numOfCeils).fill(new Ceil()));
  }

  launchCountdown() {
    let counter = 3;
    const secondsCounter = interval(1000).pipe(take(5));

    secondsCounter.subscribe((i) => {
      console.log(i);
      i === 4 ? this.startGame() : this.message = `The game will start in ${counter--}`;
    });

  }

  handleClick(ceil: Ceil) {
    console.log('item clicked');
  }

}
