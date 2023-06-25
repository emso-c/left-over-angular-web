import { Injectable, inject } from '@angular/core';
import { Food } from '../shared/models';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  foods: Food[] = [];
  loaded: boolean = false;
  private firestore = inject(Firestore);
  
  constructor() {
    const foodCollection = collection(this.firestore, 'foods');
    const foodQuery = collectionData(foodCollection, { idField: '_id' });
    foodQuery.subscribe((foods) => {
      const allFoods = foods.map((food) => {
        const parsedFood: Food = {
          _id: food['_id'],
          description: food['description'],
          img: food['img'],
          main_price: food['main_price'],
          sales_price: food['sales_price'],
          title: food['title']
        }
        return parsedFood;
      });
      this.setFoods(allFoods);
      this.loaded = true;
    });
  }

  setFoods(foods: Food[]) {
    this.foods = foods;
  }

  getFoodById(id: string): Food | undefined {
    return this.foods.find(food => food._id === id);
  }
}
