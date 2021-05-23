import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {async} from 'rxjs';
import {AWSService} from '../../../services/AWSService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(Router) private router: Router, private route: ActivatedRoute, private awsService: AWSService) { }
  AWS = this.awsService.AWS;
  idToken: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: any;
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    const that = this;
    console.log(form.value);
    // @ts-ignore




    const authenticationData = {
      Username: form.value.name,
      Password: form.value.password,
    };
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    const poolData = {
      UserPoolId: 'eu-west-3_NHmNCUvf2', // Your user pool id here
      ClientId: '3j5is0u1cehd626j7m85qqqqgr', // Your client id here
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Username: form.value.name,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    // tslint:disable-next-line:typedef only-arrow-functions

    cognitoUser.authenticateUser(authenticationDetails, {
      // tslint:disable-next-line:only-arrow-functions typedef
      onSuccess(result) {
        const accessToken = result.getAccessToken().getJwtToken();

        // POTENTIAL: Region needs to be set if not already set previously elsewhere.
        that.AWS.config.region = 'eu-west-3';

        that.AWS.config.credentials = new that.AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'eu-west-3:5cf7a538-8388-4aa3-99e1-8a095221b1e4', // your identity pool id here
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.eu-west-3.amazonaws.com/eu-west-3_NHmNCUvf2': result
              .getIdToken()
              .getJwtToken(),
          },
        });

        // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        // tslint:disable-next-line:no-unused-expression
        that.AWS.config.credentials.refresh(error => {
          if (error) {
            console.error(error);
          } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            console.log('Successfully logged!');
            that.idToken = result.getIdToken().getJwtToken();
            that.AWS.config.credentials.clearCachedId();

            // tslint:disable-next-line:only-arrow-functions
            that.AWS.config.credentials.get(err => {
              if (err){
                console.log(err.message);
              }
              else {
                that.awsService.accessKeyId =  that.AWS.config.credentials.accessKeyId;
                that.awsService.secretAccessKey=  that.AWS.config.credentials.secretAccessKey;
                that.awsService.sessionToken = that.AWS.config.credentials.sessionToken;
              }


            });
            that.router.navigate(['../contract']);
          }
        });
      },

      // tslint:disable-next-line:typedef
      onFailure(err) {
        alert(err.message || JSON.stringify(err));
      },
    });

  }

}
