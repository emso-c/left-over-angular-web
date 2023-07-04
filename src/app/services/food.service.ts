import { Injectable, inject } from '@angular/core';
import { Food } from '../shared/models';
import { setDoc, deleteDoc, doc, Firestore, collection, collectionData } from '@angular/fire/firestore';

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
          title: food['title'],
          category: food['category'],
          createdBy: food['createdBy'],
        }
        return parsedFood;
      });
      this.setFoods(allFoods);
      this.loaded = true;
    });
  }

  addFood(food: Food) {
    this.foods.push(food);
    return setDoc(doc(this.firestore, 'foods', food._id), food);
  }

  deleteFood(foodId: string) {
    const foodIndex = this.foods.findIndex(food => food._id === foodId);
    this.foods.splice(foodIndex, 1);
    return deleteDoc(doc(this.firestore, 'foods', foodId));
  }

  updateFood(uid: string, newFood: Food) {
    const foodIndex = this.foods.findIndex(food => food._id === uid);
    this.foods[foodIndex] = newFood;
    return setDoc(doc(this.firestore, 'foods', newFood._id), newFood, { merge: true });
  }

  setFoods(foods: Food[]) {
    this.foods = foods;
  }

  getFoodById(id: string): Food | undefined {
    return this.foods.find(food => food._id === id);
  }

  getFoodsByCategory(category: string): Food[] {
    return this.foods.filter(food => food.category === category);
  }
}
