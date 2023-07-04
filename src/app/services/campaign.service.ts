import { Injectable, inject } from '@angular/core';
import { Campaign } from '../shared/models';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  campaigns: Campaign[] = [];
  loaded: boolean = false;
  private firestore = inject(Firestore);
  
  constructor() {
    const campaignCollection = collection(this.firestore, 'campaigns');
    const campaignQuery = collectionData(campaignCollection, { idField: '_id' });
    campaignQuery.subscribe((campaigns) => {
      const allCategories = campaigns.map((campaign) => {
        const parsedCampaign: Campaign = {
          _id: campaign['_id'],
          category: campaign['category'],
          description: campaign['description'],
          img: campaign['img'],
          title: campaign['title'],
        }
        return parsedCampaign;
      });
      this.campaigns = allCategories;
      this.loaded = true;
    });
  }

  getCampaign(id: string): Campaign | undefined {
    return this.campaigns.find((campaign) => campaign._id === id);
  }
}
