import { Component, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CampaignService } from '../services/campaign.service';
import { Category } from '../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-customer',
  templateUrl: './main-customer.component.html',
  styleUrls: ['./main-customer.component.css']
})
export class MainCustomerComponent {
  categoryService: CategoryService = inject(CategoryService);
  campaignService: CampaignService = inject(CampaignService);
  router: Router = inject(Router);
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 6,
            numScroll: 1
        },
        {
            breakpoint: '1200px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '1000px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '800px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '400px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  handleCategoryClick(categoryKey: Category) {
    this.router.navigate(['/main/search'], { queryParams: { category: categoryKey } });
  }
}