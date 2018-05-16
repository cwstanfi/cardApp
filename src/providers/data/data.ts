import {Injectable} from '@angular/core';
import firebase, {User} from 'firebase';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    cardsRef: any;
    cards: any = [];
    updateCardIndex: any = "";

    constructor() {

    }


    getCards(): Array<any> {
        this.cardsRef = firebase.database().ref('Cards');

        this.cardsRef.on('child_added', (data) => {
            return this.cards.push(data);

        });
        this.cardsRef.on('child_removed', (data) => {

        });
        this.cardsRef.on('child_changed', (data) => {
            this.cards[this.updateCardIndex] = data;
        });

        return this.cards;
    }


    findKeyInArray(snapshot) {
        let returnArr = [];

        snapshot.forEach(function (idx, child) {
        })
    }


    snapshotToArray(snapshot) {
        let returnArr = [];
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    }

    addCardToDB(newCard): void {
        firebase.database().ref('Cards').push(newCard);
    }

    removeCardFromDB(cardToDelete): void {
        firebase.database().ref('Cards').child(cardToDelete.key).remove();
        firebase.database().ref('Cards').on('child_removed', function (data) {
        })
    }

    updateCardInDB(key, newData, idx): void {
        this.updateCardIndex = idx;
        firebase.database().ref(`Cards/${key}`).update(newData);
    }

    async signInWithEP(loginObject): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(loginObject.email, loginObject.password);
    }

    async createAccount(userObject): Promise<any> {
        try {
            const newUser:User = await firebase
            .auth()
            .createUserWithEmailAndPassword(userObject.email, userObject.password);

            await firebase
            .database()
            .ref(`/userProfile/${newUser.uid}`)
            .set({email: userObject.email, firstName: userObject.firstName, lastName: userObject.lastName});
            return newUser;
        } catch (error) {
            throw error;
        }
    }

}

