import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fs: any;
  path: any;

  directory: string;

  constructor(private cd: ChangeDetectorRef, private electronService: ElectronService) {
    this.fs = electronService.remote.require('fs');
    this.path = electronService.remote.require('path');
  }

  selectDirectory() {
    this.electronService.remote.dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (paths) => {
      this.directory = paths[0]
      this.cd.detectChanges()
    })
  }

  saveFile(text: string) {
    const data = new Uint8Array(Buffer.from(text));
    this.fs.writeFile(this.path.join(this.directory, '/file.txt'), data, (err) => {
      if (err) throw err;
    });
  }

}


