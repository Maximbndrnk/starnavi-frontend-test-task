import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

gameSettings = {};
gameWinners = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameSettings = this.route.snapshot.data['gameSettings'];
    this.gameWinners = this.route.snapshot.data['gameWinners'];
    console.log('Data', this);
  }

}
