import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserScoreCardComponent } from './user-score-card/user-score-card.component';



@NgModule({
  declarations: [UserScoreCardComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    UserScoreCardComponent,
  ]
})
export class SharedModule { }
