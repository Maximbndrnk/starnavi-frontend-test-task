import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-score-card',
  templateUrl: './user-score-card.component.html',
  styleUrls: ['./user-score-card.component.scss']
})
export class UserScoreCardComponent implements OnInit {
  @Input() card: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log('eee', this);
  }

}
