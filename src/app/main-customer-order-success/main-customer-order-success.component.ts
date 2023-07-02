import { Component } from '@angular/core';

@Component({
  selector: 'app-main-customer-order-success',
  templateUrl: './main-customer-order-success.component.html',
  styleUrls: ['./main-customer-order-success.component.css']
})
export class MainCustomerOrderSuccessComponent {
  dots: string = '.'

  ngOnInit() {
    setInterval(() => {
      if (this.dots.length < 3) {
        this.dots += '.';
      } else {
        this.dots = '';
      }
    }, 500);
  }
}
