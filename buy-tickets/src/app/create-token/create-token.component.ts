import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ITicket } from "../interfaces/ticket.interface";
import { ConfirmationPageComponent } from "../confirmation-page/confirmation-page.component";
import { Observable } from "rxjs";
import { TokenCardService } from "../services/token-card.service";
import {IPaymentInterface} from "../interfaces/payment.interface";

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
})

export class CreateTokenComponent implements OnInit {
  @ViewChild(StripeCardComponent) card?: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  public isLoading?: boolean;

  stripeTest?: FormGroup;

  constructor(
    public tokenCardService: TokenCardService,
    public dialogRef: MatDialogRef<CreateTokenComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: ITicket) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.isLoading = false
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  openConfirmationDialog(statusMessage?:string) {
    const dialogRef = this.dialog.open(ConfirmationPageComponent, {
      width: '600px',
      height: '200px',
      data: {
        status: statusMessage
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  sendPayment(paymentData: IPaymentInterface): Observable<any> {
    return this.tokenCardService.sendPayment(paymentData.token, paymentData.amount, paymentData.id)
  }

  createToken(): void {
    this.isLoading = true;
    const name = this.stripeTest?.get('name')?.value;
    this.stripeService
      .createToken(this.card!.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this.sendPayment({token: result.token.id, amount: this.data.price, id: this.data.id}).subscribe(
            s => {
              this.isLoading = false
              this.openConfirmationDialog('Payment successful')
              this.closeModal()
            }
          )
        } else if (result.error) {
          this.isLoading = false
          this.openConfirmationDialog(result.error.message)
          this.closeModal()
        }
      });
  }

}
