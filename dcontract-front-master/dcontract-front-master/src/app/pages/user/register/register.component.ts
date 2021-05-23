
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    console.log(form.value);
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    const poolData = {
      UserPoolId: 'eu-west-3_83C9YBCWh ', // Your user pool id here
      ClientId: 'r06spp9816qsktg1d90lcfvji', // Your client id here
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: form.value.email,
    };

    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    // tslint:disable-next-line:only-arrow-functions typedef
    userPool.signUp(form.value.name, form.value.password, attributeList, null, function(
      err,
      result
    ) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      const cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
    });



  }

}
