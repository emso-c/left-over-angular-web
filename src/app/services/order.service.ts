import { Injectable, inject } from '@angular/core';
import { Order } from '../shared/models';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [];
  loaded: boolean = false;
  private firestore = inject(Firestore);
  
  constructor() {
    const orderCollection = collection(this.firestore, 'orders');
    const orderQuery = collectionData(orderCollection, { idField: '_id' });
    orderQuery.subscribe((orders) => {
      const allCategories = orders.map((order) => {
        const parsedOrder: Order = {
          _id: order['_id'],
          cardId: order['cardId'],
          commentId: order['commentId'],
          commented: order['commented'],
          createdAt: order['createdAt'],
          createdBy: order['createdBy'],
          foodAmount: order['foodsAmount'],
          foodsId: order['foodsId'],
          restaurantId: order['restaurantId'],
          totalAmount: order['totalAmount'],
        }
        return parsedOrder;
      });
      this.orders = allCategories;
      this.loaded = true;
    });
  }

  placeOrder(order: Order): Promise<void> {
    this.orders.push(order);
    return setDoc(doc(this.firestore, 'orders', order._id), order);
  }
}
