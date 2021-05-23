import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AWSService} from '../../../services/AWSService';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit{
  constructor(private route: ActivatedRoute, private awsService: AWSService) { }
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  showButton = false;
  shwoButtonLoad = false;
  id: string;
  bucketlist: string[];
  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.bucketlist = this.awsService.bucketlist;
    console.log(this.bucketlist);
  }
  // tslint:disable-next-line:typedef
  addContract(label){
    if (label === 'new') {
      this.showButton = true;
    } else {
      this.showButton = false;
      this.files = [];
      this.shwoButtonLoad = false;
    }
  }

  /**
   * on file drop handler
   */
  // tslint:disable-next-line:typedef
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  // tslint:disable-next-line:typedef
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  // tslint:disable-next-line:typedef
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    if (this.files.length) { this.shwoButtonLoad = false; }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  // tslint:disable-next-line:typedef
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  // tslint:disable-next-line:typedef
  prepareFilesList(files: Array<any>) {
    this.shwoButtonLoad = true;
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  // tslint:disable-next-line:typedef
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
