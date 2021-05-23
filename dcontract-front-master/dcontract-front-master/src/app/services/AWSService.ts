import * as AWS from 'aws-sdk';
export class AWSService {
  AWS = require('aws-sdk/global');
  bucketlist: string[];
  s3 = new AWS.S3();
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: any;
}
