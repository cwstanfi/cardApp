import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {AlertController} from "ionic-angular";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    setOfCards: any;

    constructor(public navCtrl: NavController, public data: DataProvider, public alertCtrl: AlertController) {

    }

    ionViewDidLoad() {
        this.setOfCards = this.data.getCards();
    }

    editCard(card): void {
        let prompt = this.alertCtrl.create({
            title: 'Edit card',
            message: "Enter a title and description for your new card.",
            inputs: [{name: 'title', value: card.title}, {name: 'content', value: card.content}],
            buttons: [{
                text: 'Cancel', handler: data => {
                    console.log('Cancel clicked');
                }
            }, {
                text: 'Edit Card', handler: data => {
                    let index = this.data.cards.indexOf(card);
                    if (index > -1) {
                        let obj = {"title": data.title, "content": data.content};
                        this.data.updateCardInDB(card.key, obj, index);
                    }
                }
            }]
        });
        prompt.present();
    }

    deleteCard(card): void {
        let confirm = this.alertCtrl.create({
            title: 'Delete card',
            message: 'Are you sure you want to delete card?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        let index = this.data.cards.indexOf(card);
                        if (index > -1) {
                            this.data.cards.splice(index, 1)
                        }
                        this.data.removeCardFromDB(card);
                    }
                }
            ]
        });
        confirm.present();
    }

    addCard(): void {
        let prompt = this.alertCtrl.create({
            title: 'Create a new card',
            message: 'Enter a title and description for your new card',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'title'
                },
                {
                    name: 'content',
                    placeholder: 'description'
                }
            ],
            buttons: [
                {
                    text: 'cancel',
                    handler: data => {
                        console.log('cancel clicked');
                    }
                },
                {
                    text: 'create card',
                    handler: data => {
                        // this.data.cards.push(data);
                        this.data.addCardToDB(data);
                    }
                }
            ]

        });
        prompt.present();
    }

}
