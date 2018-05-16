import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-create-account',
    templateUrl: 'create-account.html',
})
export class CreateAccountPage {

    private registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {

        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required])],
            fName: ['', Validators.compose([Validators.required])],
            lName: ['', Validators.compose([Validators.required])]
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateAccountPage');
    }

}
