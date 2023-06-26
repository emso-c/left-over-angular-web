import { Injectable, inject } from '@angular/core';
import { Comment } from '../shared/models';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: Comment[] = [];
  loaded: boolean = false;
  private firestore = inject(Firestore);
  
  constructor() {
    const commentCollection = collection(this.firestore, 'comments');
    const commentQuery = collectionData(commentCollection, { idField: '_id' });
    commentQuery.subscribe((comments) => {
      const allComments = comments.map((comment) => {
        const parsedComment: Comment = {
          _id: comment['_id'],
          createdAt: comment['createdAt'],
          description: comment['description'],
          user: {
            _id: comment['user']['id'],
            fullName: comment['user']['fullName'],
            img: comment['user']['img'],
          }
        }
        return parsedComment;
      });
      this.comments = allComments;
      this.loaded = true;
    });
  }

  getCommentByID(id: string): Comment | undefined {
    return this.comments.find((comment) => comment._id === id);
  }
}
