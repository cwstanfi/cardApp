import {Injectable} from '@angular/core';
import firebase, {User} from 'firebase';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    cardsRef:any;
    cards:any = [];
    updateCardIndex:any = "";

    constructor() {

    }


    getCards():Array<any> {

        this.cardsRef = firebase.database().ref('Cards');

        this.cardsRef.on('child_added',(data) => {
            console.log("data ", data);
            this.cards.push(data);
        });
        this.cardsRef.on('child_removed', (data) => {
            console.log('data ', data);
        });
        this.cardsRef.on('child_changed', (data) => {
            this.cards[this.updateCardIndex] = data;
        });
        return this.cards;
    }

    addCardToDB(newCard):void {
        firebase.database().ref('Cards').push(newCard);
    }

    removeCardFromDB(cardToDelete):void {
        firebase.database().ref('Cards').child(cardToDelete.key).remove();
    }

    updateCardInDB(key, newData, idx):void {
        this.updateCardIndex = idx;
        firebase.database().ref(`Cards/${key}`).update(newData);
    }

    async signInWithEP(loginObject):Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(loginObject.email, loginObject.password);
    }

    async createAccount(email, password, fName, lName):Promise<any> {
        try {
            const newUser:User = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            await firebase
                .database()
                .ref(`/userProfile/${newUser.uid}`)
                .set({email:email, firstName:fName, lastName:lName});
            return newUser;
        } catch (error){
            throw error;
        }
    }

}
