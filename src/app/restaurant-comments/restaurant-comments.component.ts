import { Component, inject } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { Food, RestaurantDetails } from '../shared/models';
import { FoodService } from '../services/food.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-restaurant-comments',
  templateUrl: './restaurant-comments.component.html',
  styleUrls: ['./restaurant-comments.component.css']
})
export class RestaurantCommentsComponent {
  userService: UserService = inject(UserService);
  commentService: CommentService = inject(CommentService);
  utilsService: UtilsService = inject(UtilsService);
  isFetchingData = false;
  comments: any[] = [];

  constructor() {
    this.loadComments();
  }

  loadComments() {
    this.isFetchingData = true;
    let retries = 10;
    const interval = 100;
    let counter = 0;

    const intervalId = setInterval(() => {
      const commentIDs = this.userService.currentUser?.details?.comments;
      if (!commentIDs) {
        this.isFetchingData = false;
        return;
      }
      commentIDs.forEach((commentID: string) => {
        const comment = this.commentService.getCommentByID(commentID);
        if (comment) {
          comment.createdAt = this.utilsService.formatDate(comment.createdAt); 
          this.comments.push(comment);
          this.comments.push(comment);
          this.comments.push(comment);
          this.comments.push(comment); // populate for test purposes
        }  
      });

      if (this.comments.length > 0) {
        // TODO sort comments by date
        this.isFetchingData = false;
        clearInterval(intervalId);
      }
      if (counter >= retries) {
        this.isFetchingData = false;
        clearInterval(intervalId);
      }
      
      counter++;
    }, interval);
  }

}