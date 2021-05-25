import { Component, OnInit } from '@angular/core';
import {FileMetadata} from '../../models/FileMetadata';
import {FileService} from '../../services/file.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {

  constructor(private fileService: FileService, private route: ActivatedRoute) { }

  fileMetaData: FileMetadata;

  ngOnInit(): void {
    if(history.state.data == undefined) {
      this.route.params.subscribe(params => {
        const key = params['key'];
        this.fileService.getFileMetaDataByKey(key).subscribe( fileMetaData => {
          this.fileMetaData = fileMetaData;
        });
      });
    } else {
      this.fileMetaData = history.state.data;
    }
  }

}
