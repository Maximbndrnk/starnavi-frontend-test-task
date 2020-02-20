export class Ceil {
  /*
  * winner: 1-user, 2-AI, 0-untouched
  * status: 0-default, 1-active
  * */
  constructor() {
    this.status = 0;
    this.alreadyUsed = false;
    this.winner = 0;
  }
  status: number;
  winner: number;
  alreadyUsed: boolean;
}
