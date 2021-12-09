import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITicket} from "../interfaces/ticket.interface";

@Injectable({
  providedIn: 'root'
})

export class TokenCardService {
  constructor(
    private httpClient: HttpClient
  ) {}

  sendPayment(token: string, amount: number, id: string): Observable<object> {
    return this.httpClient.post(`http://localhost:3000/tickets/buy`, {token, amount, id}) as Observable<object>;
  }

  getListOfTickets(): Observable<ITicket[]> {
    return this.httpClient.get(`http://localhost:3000/tickets`) as Observable<ITicket[]>;
  }

  getListOfBoughtTickets(): Observable<ITicket[]>{
    return this.httpClient.get(`http://localhost:3000/tickets/all`) as Observable<ITicket[]>;
  }

}
