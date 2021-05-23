import {Component, OnInit} from '@angular/core';
import {AWSService} from './services/AWSService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dcontract-front';
  AWS: any;
  bucketlist: string[];
  constructor(private awsService: AWSService) {}
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.AWS = this.awsService.AWS;
    this.bucketlist = this.awsService.bucketlist;
  }
}
