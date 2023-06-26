import { Injectable, inject } from '@angular/core';
import { Category } from '../shared/models';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[] = [];
  loaded: boolean = false;
  private firestore = inject(Firestore);
  
  constructor() {
    const categoryCollection = collection(this.firestore, 'categories');
    const categoryQuery = collectionData(categoryCollection, { idField: '_id' });
    categoryQuery.subscribe((categories) => {
      const allCategories = categories.map((category) => {
        const parsedCategory: Category = {
          _id: category['_id'],
          key: category['key'],
          label: category['label'],
          img: category['img'],
        }
        return parsedCategory;
      });
      this.categories = allCategories;
      this.loaded = true;
    });
  }
}
