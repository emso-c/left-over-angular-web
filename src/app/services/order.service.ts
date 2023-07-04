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
          foodAmount: order['foodAmount'],
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

  getOrderById(id: string): Order | undefined {
    return this.orders.find((order) => order._id === id);
  }

  getQuantity( orderId: string, foodId: string): number {
    const order = this.getOrderById(orderId);
    if(!order){
      return -1;
    }
    const food = order?.foodsId.find((id) => id === foodId);
    if (!food) {
      return -1;
    }

    return order.foodsId.filter((id) => id === foodId).length;
  }

  /* updateOrder(uid: string, newOrder: Order) {
    const orderIndex = this.orders.findIndex(order => order._id === uid);
    this.orders[orderIndex] = newOrder;
    return setDoc(doc(this.firestore, 'orders', newOrder._id), newOrder, { merge: true });
  } */

  addComment(orderId: string, commentId: string) {
    const order = this.getOrderById(orderId);
    if (!order) {
      return Promise.reject('Order not found');
    }

    order.commented = true;
    order.commentId = commentId;
    return setDoc(doc(this.firestore, 'orders', order!._id), order, { merge: true });
  }

  placeOrder(order: Order): Promise<void> {
    this.orders.push(order);
    return setDoc(doc(this.firestore, 'orders', order._id), order);
  }
}
