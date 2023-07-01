import { Injectable } from '@angular/core';
import { CreditCard } from '../shared/models';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private creditCardsSubject: BehaviorSubject<CreditCard[]> = new BehaviorSubject<CreditCard[]>([]);
  creditCards$: Observable<CreditCard[]> = this.creditCardsSubject.asObservable();
  companies = [
    {
      name: 'Visa Classic',
      key: 'visa',
      imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png' 
    },
    {
      name: 'Master Card',
      key: 'mastercard',
      imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png'
    },
    {
      name: 'Maestro Card',
      key: 'maestro',
      imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Maestro_logo.svg/2560px-Maestro_logo.svg.png'
    },
    {
      name: 'American Express',
      key: 'american_express',
      imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png'
    },
    {
      name: "Paypal",
      key: 'paypal',
      imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png'
    },
  ]

  constructor(private firestore: Firestore) {
    const creditCardCollection = collection(this.firestore, 'credit-cards');
    const creditCardQuery = collectionData(creditCardCollection, { idField: '_id' });

    creditCardQuery.pipe(
      map((creditCards) =>
        creditCards.map((creditCard) => ({
          _id: creditCard['_id'],
          company: creditCard['company'],
          createdBy: creditCard['createdBy'],
          cvc: creditCard['cvc'],
          expirationDate: creditCard['expirationDate'],
          number: creditCard['number'],
          placeholder: creditCard['placeholder']
        }))
      )
    ).subscribe((parsedCreditCards) => {
      this.creditCardsSubject.next(parsedCreditCards);
    });
  }

  addPaymentMethod(creditCard: CreditCard) {
    this.creditCardsSubject.next([...this.creditCardsSubject.value, creditCard]);
    return setDoc(doc(this.firestore, 'credit-cards', creditCard._id), creditCard);
  }

  getCompanyLogoURL(company: string) {
    const companyObj = this.companies.find((companyObj) => companyObj.key === company);
    if (companyObj) {
      return companyObj.imgURL;
    }
    throw new Error('Company not found');
  }

  getCompany(company: string): any | undefined {
    return this.companies.find((companyObj) => companyObj.key === company);;
  }

  maskCardNumber(creditCardNumber: string) {
    // only show last 4 digit
    let num: string | undefined = creditCardNumber.slice(-4).padStart(creditCardNumber.length, '*');
    // add space every 4 digit
    num = num.match(/.{1,4}/g)?.join(' ');
    return num;
  }
}
