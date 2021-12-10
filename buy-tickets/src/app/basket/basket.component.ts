import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { ITicket } from "../interfaces/ticket.interface";
import { TokenCardService } from "../services/token-card.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {
  public boughtTickets$?: Observable<ITicket[]>;

  constructor(
    public tokenCardService: TokenCardService,
  ) { }

  ngOnInit(): void {
    this.getBoughtTickets();
  }

  getBoughtTickets(): void {
    this.boughtTickets$ = this.tokenCardService.getListOfBoughtTickets();
  }
}
