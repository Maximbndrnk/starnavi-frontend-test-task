import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  @Input() winners: [];

  constructor() { }

  ngOnInit(): void {
    console.log('www', this);
  }

}
