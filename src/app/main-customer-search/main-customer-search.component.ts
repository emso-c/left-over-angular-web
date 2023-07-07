import { Component, inject } from '@angular/core';
import { FoodService } from '../services/food.service';
import { CategoryService } from '../services/category.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Food } from '../shared/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-customer-search',
  templateUrl: './main-customer-search.component.html',
  styleUrls: ['./main-customer-search.component.css'],
})
export class MainCustomerSearchComponent {
  foodService: FoodService = inject(FoodService)
  categoryService: CategoryService = inject(CategoryService)
  router: Router = inject(Router)
  route: ActivatedRoute = inject(ActivatedRoute);

  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedCategory: string = '';
  filteredFoods: Food[] = [];

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    const retries = 10;
    let counter = 0;
    const interval = 100;
    const intervalId = setInterval(() => {
      if (this.foodService.loaded && this.categoryService.loaded) {
        this.options = this.foodService.foods.map(food => food.title);
        this.filteredFoods = this.foodService.foods;

        // get category query param
        this.route.queryParams.subscribe(params => {
          const category = params['category'];
          if (category && this.categoryService.categories.find(c => c.key === category)) {
            this.selectedCategory = category;
            this.filterFoods();
          }
        });

        clearInterval(intervalId);
      }
      else {
        counter++;
      }
      if (counter === retries) {
        clearInterval(intervalId);
      }
    }, interval);
  }

  inPriceRange(price: number): boolean {
    if(!this.minPrice && !this.maxPrice) {
      return true;
    }
    else if(this.maxPrice && !this.minPrice) {
      return price <= this.maxPrice;
    }
    else if(this.minPrice && !this.maxPrice) {
      return price >= this.minPrice;
    }
    return price >= this.minPrice! && price <= this.maxPrice!;
  }

  getDiscount(food: Food): number {
    return Math.round((1 - (food.sales_price / food.main_price)) * 100);
  }

  onCategoryChange(categoryKey: string) {
    this.selectedCategory = categoryKey;
    this.filterFoods();
  }

  handleFoodClick(foodId: string) {
    this.router.navigate(['main/foods', foodId]);
  }

  filterFoods() {
    this.filteredFoods = this.foodService.foods.filter(food => {
      return (
        ((this.selectedCategory && food.category===this.selectedCategory) || !this.selectedCategory) &&
        this.inPriceRange(food.sales_price) &&
        (this.myControl.value === '' || food.title.toLocaleLowerCase('tr-TR').includes(this.myControl.value!.toLocaleLowerCase('tr-TR')))
      );
    });
  }
}
