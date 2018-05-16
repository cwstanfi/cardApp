import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, NavController, LoadingController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public loading: Loading;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public data: DataProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    loginClick(): void {
        let prompt = this.alertCtrl.create({
            title: 'Log into your account',
            message: 'Log in to view your account',
            inputs: [
                {
                    name: 'email',
                    placeholder: 'email address'
                },
                {
                    name: 'password',
                    placeholder: 'password',
                    type: "password"
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('cancel clicked');
                    }
                },
                {
                    text: 'Login',
                    handler: data => {
                        this.data.signInWithEP(data);
                    }
                }
            ]

        });
        this.loading = this.loadingCtrl.create();
        prompt.present();
    }

    createAccount():void {
        this.navCtrl.push(CreateAccountPage);
    }

}
