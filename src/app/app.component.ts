import { Component, ChangeDetectorRef } from '@angular/core';

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fs: any;
  path: any;

  text: string = "";

  constructor(private cd: ChangeDetectorRef, private electronService: ElectronService) {
    this.fs = electronService.remote.require('fs');
    this.path = electronService.remote.require('path');
  }

  openDialog() {
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }, (filepaths) => {
      if (filepaths) {
        let text = this.fs.readFileSync(filepaths[0], "utf-8")
        this.text = text;
        this.cd.detectChanges(); //we need to detech changes because we've left angular's zone with the fs call. 
      }
    })
  }

}


