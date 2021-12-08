import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CreateTokenComponent} from "../create-token/create-token.component";
import {TokenCardService} from "../services/token-card.service";
import {Observable} from "rxjs";
import {ITicket} from "../interfaces/ticket.interface";

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})

export class ListTicketsComponent implements OnInit {
  public tickets$?: Observable<ITicket[]>

  constructor(
    public dialog: MatDialog,
    public tokenCardService: TokenCardService,
    ) {

  }

  ngOnInit(): void {
    this.getTicketsFromDB()
  }

  getTicketsFromDB():void {
    this.tickets$ = this.tokenCardService.getListOfTickets()
  }


  openDialog(price:number, id: string) {
    const dialogRef = this.dialog.open(CreateTokenComponent, {
      width: '600px',
      height: '200px',
      data: {price: price, id: id}
    });
  }

}
