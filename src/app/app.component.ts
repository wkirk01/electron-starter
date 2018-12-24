import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'

import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fs: any;
  path: any;

  @ViewChild('textarea') textArea: ElementRef;
  directory: string;

  constructor(private cd: ChangeDetectorRef, private electronService: ElectronService, private http: HttpClient) {
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
    if (!this.directory) { return }
    const data = new Uint8Array(Buffer.from(text));
    this.fs.writeFile(this.path.join(this.directory, '/file.txt'), data, (err) => {
      if (err) throw err;
    });
  }

  fetchRepos() {
    this.http.get<any>('https://api.github.com/search/repositories?q=angular')
      .pipe(
        map(data => data.items),
      )
      .subscribe(repos => {
        this.textArea.nativeElement.value = repos.map(repo => repo.url).join("\n")
      })
  }

}


