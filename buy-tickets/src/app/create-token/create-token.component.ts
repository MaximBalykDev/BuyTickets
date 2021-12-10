import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { Observable, Subject, takeUntil } from "rxjs";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

import { ITicket } from "../interfaces/ticket.interface";
import { ConfirmationPageComponent } from "../confirmation-page/confirmation-page.component";
import { TokenCardService } from "../services/token-card.service";
import { IPaymentInterface } from "../interfaces/payment.interface";
import {cardOptions} from "../../assets/constant";

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.scss']
})
export class CreateTokenComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent) card?: StripeCardComponent;

  cardOptions: StripeCardElementOptions = cardOptions;
  stripeCardForm: FormGroup;
  elementsOptions: StripeElementsOptions = { locale: 'en' };

  public isLoading = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public tokenCardService: TokenCardService,
    public dialogRef: MatDialogRef<CreateTokenComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: ITicket) {
    this.stripeCardForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  openConfirmationDialog(statusMessage?: string): void {
    this.dialog.open(ConfirmationPageComponent, {
      width: '600px',
      height: '300px',
      data: {
        status: statusMessage,
      },
    });
  }

  sendPayment(paymentData: IPaymentInterface): Observable<object> {
    return this.tokenCardService.sendPayment(paymentData.token, paymentData.amount, paymentData.id);
  }

  createToken(): void {
    this.isLoading = true;
    const name = this.stripeCardForm.value.name;
    this.stripeService
      .createToken(this.card!.element, { name }).pipe(
        takeUntil(this.unsubscribe$)
    )
      .subscribe((result) => {
        if (result.token) {
          this.sendPayment({token: result.token.id, amount: this.data.price, id: this.data.id})
            .subscribe(
            s => {
              this.isLoading = false;
              this.openConfirmationDialog('Payment successful');
              this.closeModal();
            }
          )
        } else if (result.error) {
          this.isLoading = false;
          this.openConfirmationDialog(result.error.message);
          this.closeModal();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
