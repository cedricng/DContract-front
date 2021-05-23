import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AWSService} from '../../../services/AWSService';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  isProject = true;
  id: string;
  AWS: any;
  bucketlist: string[];
  s3: any;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: any;

  constructor(private route: ActivatedRoute, private awsService: AWSService) { }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log('liste component');
    // this.id = this.route.snapshot.queryParams.id;
    // console.log(this.id);
    this.AWS = this.awsService.AWS;
    this.bucketlist = this.awsService.bucketlist;
    this.bucketlist = [];
    this.bucketlist  = this.getAWSS3BucketObjects();
    this.accessKeyId = this.awsService.accessKeyId;
    this.sessionToken = this.awsService.sessionToken;
    this.secretAccessKey = this.awsService.secretAccessKey;
    console.log(this.bucketlist);
    this.awsService.bucketlist = this.bucketlist ;
  }
  // tslint:disable-next-line:typedef
  getAWSS3BucketObjects(): string[]{

    // @ts-ignore
    this.s3 = new AWS.S3({accessKeyID : this.accessKeyId, secretAccessKey : this.secretAccessKey});
    const params = {
      Bucket: 'dcontract'
    };
    const bucketlist = [];
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.s3.listObjects(params, (err, data) => {
      if (err) { console.log(err.message, err.stack);  }
      else{
        console.log('');
        console.log('====== S3 Bucket Objects ======');
        data.Contents.forEach(element => {
          console.log(element.Key);
          that.bucketlist.push(element.Key);
          // console.log(this.bucketlist);
        });
        console.log('');
        console.log(that.bucketlist);
      }

      // $("#loader").hide();
    });
    return that.bucketlist.slice();
  }
  // tslint:disable-next-line:typedef
  addProject(){
    this.isProject = true;
  }

}
