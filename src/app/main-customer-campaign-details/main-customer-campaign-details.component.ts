import { Component, inject } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Campaign, Food } from '../shared/models';

@Component({
  selector: 'app-main-customer-campaign-details',
  templateUrl: './main-customer-campaign-details.component.html',
  styleUrls: ['./main-customer-campaign-details.component.css']
})
export class MainCustomerCampaignDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  
  campaignService: CampaignService = inject(CampaignService);
  foodService: FoodService = inject(FoodService);

  campaign: Campaign | undefined;
  foods: Food[] | null = null;

  ngOnInit() {
    let count = 0;

    const interval = setInterval(() => {
      if (this.campaignService.loaded && this.foodService.loaded) {
        this.route.params.subscribe(params => {
          this.campaign = this.campaignService.getCampaign(params['id']);
          this.foods = this.foodService.getFoodsByCategory(this.campaign!.category);
        });
        clearInterval(interval);
      } else {
        count++;
        if (count === 20) {
          clearInterval(interval);
        }
      }
    }, 100);
  }

  handleFoodClick(foodId: string) {
    this.router.navigate(['main/foods', foodId]);
  }

  getDiscount(food: Food) {
    return Math.round((food.main_price - food.sales_price) / food.main_price * 100);    
  }
}
