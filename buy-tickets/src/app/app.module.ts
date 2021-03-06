import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxStripeModule } from "ngx-stripe";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";

import { CreateTokenComponent } from './create-token/create-token.component';
import { AppRoutingModule } from './app-routing.module';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTicketsComponent,
    BasketComponent,
    CreateTokenComponent,
    ConfirmationPageComponent,
    LoaderComponent,
  ],
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      FormsModule,
      MatInputModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatButtonModule,
      MatDialogModule,
      MatTreeModule,
      MatGridListModule,
      HttpClientModule,
      NgxStripeModule.forRoot('pk_test_51K2WhCFyWxzlg6TW5WwDfauuFOvHXlCdB81Jmj0JxMWvI2lpiFWzQqgPnv1btlWUQ9cYWfZbBfyMxeOaHIEgVswb00AvU1GnOG'),
      MatProgressBarModule,
    ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
