import { Injectable, inject } from '@angular/core';
import { CustomerDetails, Food, RestaurantDetails, User } from '../shared/models';
import { setDoc, doc, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Storage, deleteObject, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  currentUser: User | undefined;
  loaded: boolean = false;
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private auth = inject(Auth);

  constructor() {
    const userProfileCollection = collection(this.firestore, 'users');
    const userProfileQuery = collectionData(userProfileCollection, { idField: '_id' });
    userProfileQuery.subscribe((userProfiles) => {
      const allUsers = userProfiles.map((profile) => {
        const compositeId = profile['_id'];
        const email = compositeId.split('+')[0];
        const uid = compositeId.split('+')[1];
        const user = this.parseUser(uid, email, profile)
        return user;
      });
      this.setUsers(allUsers);

      const newUser: User = {
        uid: this.auth.currentUser?.uid!,
        email: this.auth.currentUser?.email!,
        details: null
      }
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          const currentUser = this.getUserByUID(user.uid);
          this.setCurrentUser(currentUser ?? newUser);
        }
        this.loaded = true;
      });
    });
  }

  getRestaurants() {
    return this.users.filter((user) => user.details?.type === 'restaurant');
  }

  private generateUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d/16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  uploadImage(uid: string, file: File) {
    const newFileName =  this.generateUUID();
    file = new File([file], newFileName, { type: file.type });
    const storageRef = ref(this.storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file)
    return uploadTask;
  }

  removeImage(fileName: string) {
    const storageRef = ref(this.storage, fileName);
    return deleteObject(storageRef)
  }

  deleteFood(foodId: string) {
    const foodIndex = this.currentUser!.details!.foods.findIndex((food: { _id: string; }) => food._id === foodId);
    this.currentUser!.details!.foods.splice(foodIndex, 1);
    const userRef = doc(this.firestore, 'users', this.currentUser!.details!._id);
    return setDoc(userRef, this.currentUser!.details!, { merge: true });
  }

  updateCurrentUserDetails(details: CustomerDetails | RestaurantDetails) {
    this.currentUser!.details = details;
    const userRef = doc(this.firestore, 'users', details._id);
    return setDoc(userRef, details, { merge: true });
  }

  addFavoriteRestaurant(restaurantCompositeId: string){
    if (this.currentUser!.details!.favoriteRestaurants.includes(restaurantCompositeId)) {
      return new Promise((resolve, reject) => {
        reject({
          message: 'Restoran zaten favorilerinizde.',
          code: 'restaurant-already-in-favorites'
        });
      });
    }
    this.currentUser!.details!.favoriteRestaurants.push(restaurantCompositeId);
    const userRef = doc(this.firestore, 'users', this.currentUser!.details!._id);
    return setDoc(userRef, this.currentUser!.details!, { merge: true });
  }
  removeFavoriteRestaurant(restaurantCompositeId: string){
    if (!this.currentUser!.details!.favoriteRestaurants.includes(restaurantCompositeId)) {
      return new Promise((resolve, reject) => {
        reject({
          message: 'Restoran favorilerinizde değil.',
          code: 'restaurant-not-in-favorites'
        });
      });
    }
    const restaurantIndex = this.currentUser!.details!.favoriteRestaurants.findIndex(
      (restaurant: string) => restaurant === restaurantCompositeId
    );
    this.currentUser!.details!.favoriteRestaurants.splice(restaurantIndex, 1);
    const userRef = doc(this.firestore, 'users', this.currentUser!.details!._id);
    return setDoc(userRef, this.currentUser!.details!, { merge: true });
  }

  addFavoriteDish(dishId: string){
    if (this.currentUser!.details!.favoriteDishes.includes(dishId)) {
      return new Promise((resolve, reject) => {
        reject({
          message: 'Yemek zaten favorilerinizde.',
          code: 'dish-already-in-favorites'
        });
      });
    }
    this.currentUser!.details!.favoriteDishes.push(dishId);
    const userRef = doc(this.firestore, 'users', this.currentUser!.details!._id);
    return setDoc(userRef, this.currentUser!.details!, { merge: true });
  }

  removeFavoriteDish(dishId: string){
    if (!this.currentUser!.details!.favoriteDishes.includes(dishId)) {
      return new Promise((resolve, reject) => {
        reject({
          message: 'Yemek favorilerinizde değil.',  
          code: 'dish-not-in-favorites'
        });
      });
    }
    const dishIndex = this.currentUser!.details!.favoriteDishes.findIndex(
      (dish: string) => dish === dishId
    );
    this.currentUser!.details!.favoriteDishes.splice(dishIndex, 1); 
    const userRef = doc(this.firestore, 'users', this.currentUser!.details!._id);
    return setDoc(userRef, this.currentUser!.details!, { merge: true });
  }

  setUsers(users: User[]) {
    this.users = users;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getUserByUID(uid: string): User | undefined {
    return this.users.find(user => user.uid === uid);
  }

  getUserByID(id: string): User | undefined {
    return this.users.find(user => user.details?._id === id);
  }

  getUserByCompositeId(compositeId: string): User | undefined {
    return this.users.find(user => user.details?._id === compositeId);
  }

  parseUser(uid: string, email: string, userProfile: any){
    let profileDetails: CustomerDetails | RestaurantDetails;
    if (userProfile['type'] === 'customer') {
      profileDetails = {
        _id: userProfile['_id'],
        type: userProfile['type'],
        createdAt: userProfile['createdAt'],
        email: userProfile['email'],
        name: userProfile['name'],
        surname: userProfile['surname'],
        gender: userProfile['gender'],
        img: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' ?? userProfile['img'],
        favoriteDishes: userProfile['favoriteDishes'] ?? [],
        favoriteRestaurants: userProfile['favoriteRestaurants'] ?? [],
        comments: userProfile['comments'] ?? [],
        orders: userProfile['orders'] ?? [],
        creditCards: userProfile['creditCards'] ?? [],
      }
    } else if (userProfile['type'] === 'restaurant') {
      profileDetails = {
        _id: userProfile['_id'],
        type: userProfile['type'],
        createdAt: userProfile['createdAt'],
        description: userProfile['description'],
        title: userProfile['title'],
        img: 'https://previews.123rf.com/images/bestvectorstock/bestvectorstock1808/bestvectorstock180809378/111743862-restaurant-icon-vector-isolated-on-white-background-restaurant-transparent-sign-line-or-linear.jpg' ?? userProfile['img'],
        comments: userProfile['comments'] ?? [],
        foods: userProfile['foods'] ?? [],
      }
    } else {
      throw new Error('invalid user type');
    }
    const user: User = {
      uid: uid,
      email : email,
      details: profileDetails
    }
    return user;
  }
}
