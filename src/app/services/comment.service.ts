import { Injectable, inject } from '@angular/core';
import { Comment, Food } from '../shared/models';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';

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
            fullname: comment['user']['fullname'],
            img: comment['user']['img'],
          }
        }
        return parsedComment;
      });
      this.comments = allComments;
      this.loaded = true;
    });
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
    return setDoc(doc(this.firestore, 'comments', comment._id), comment);
  }

  getCommentByID(id: string): Comment | undefined {
    return this.comments.find((comment) => comment._id === id);
  }
}
