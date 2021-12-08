import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TokenCardService {
  constructor(
    private httpClient: HttpClient
  ) {}

  sendPayment(token: string, amount: number, id: string): Observable<any> {
    return this.httpClient.post(`http://localhost:3000/tickets/buy`, {token, amount, id})
  }

  getListOfTickets(): Observable<any> {
    return  this.httpClient.get(`http://localhost:3000/tickets`)
  }

  getListOfBoughtTickets(): Observable<any>{
    return this.httpClient.get(`http://localhost:3000/tickets/all`)
  }

}
