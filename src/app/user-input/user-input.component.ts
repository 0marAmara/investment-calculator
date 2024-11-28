import {Component, EventEmitter, output, Output, signal} from '@angular/core';
import {FormsModule, FormSubmittedEvent} from "@angular/forms";
import {InvestmentInputModel} from "../investment-input.model";
import {InvestmentService} from "../investment.service";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  initialInvestment=signal(0);
  annualInvestment=signal(0);
  expectedReturn=signal(10);
  duration=signal(5);
  calculate = output<InvestmentInputModel>()

  constructor(private investmentService:InvestmentService) {
  }

  onSubmit(event: FormSubmittedEvent) {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: this.initialInvestment(),
      annualInvestment: this.annualInvestment(),
      duration: this.duration(),
      expectedReturn: this.expectedReturn(),
    })
    this.initialInvestment.set(0);
    this.annualInvestment.set(0);
    this.duration.set(5);
    this.expectedReturn.set(10);
  }
}
