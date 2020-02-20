import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../core/game/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ceil } from './ceil.interface';

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
  pointsToWin = 0;

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
    this.sendResult();
  }

  startGame() {
    console.log('Val', this.gameForm.value);
    this.createPlayGround();
    this.launchCountdown();
  }

  createPlayGround() {
    const numOfCeils: number = +this.gameForm.value.difficulty;
    this.pointsToWin = Math.floor((numOfCeils ** 2) / 2) + 1;
    console.log('numof', numOfCeils, typeof numOfCeils);
    console.log('pointsToWin', this.pointsToWin);
    this.playGroundArr = Array(numOfCeils).fill(Array(numOfCeils).fill(new Ceil()));
    console.log('this.playGroundArr', this.playGroundArr);
  }

  launchCountdown(){

  }

  handleClick(ceil: Ceil) {
    console.log('item clicked');
  }

}
