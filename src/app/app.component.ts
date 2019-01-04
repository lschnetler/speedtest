import { Component } from '@angular/core';
import { SpeedtestService } from './services/speedtest.service';
import { SpeedtestResults } from './classes/speedtest-results';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ping;
  download;
  upload;
  jitter;

  pingThreshold = {
    '0': {color: 'green'},
    '300': {color: 'orange'},
    '500': {color: 'red'},
  };
  downloadThreshold = {
    '0': {color: 'red'},
    '0.2': {color: 'orange'},
    '1.0': {color: 'green'},
  };
  uploadThreshold = {
    '0': {color: 'red'},
    '0.2': {color: 'orange'},
    '1.0': {color: 'green'},
  };
  jitterThreshold = {
    '0': {color: 'green'},
    '2': {color: 'orange'},
    '5': {color: 'red'},
  };

  started = false;

  constructor(private speedtest: SpeedtestService) {
  }

  toggleStart() {
    if (this.started) {
      this.stopService();
    } else {
      requestAnimationFrame(() => {
        this.resetAll();
        this.startService();
      });
    }
  }

  private startService() {
    this.speedtest.startService();
    this.speedtest.getResultSub().subscribe(
      (res) => { this.update(res); },
      (err) => {  },
      () => {}
    );
    this.started = true;
  }

  private stopService() {
    this.speedtest.stopService();
    this.started = false;
  }

  private update(res: SpeedtestResults) {
    this.ping = Math.round(res.pingStatus * 100) / 100;
    this.download = Math.round(res.downloadStatus * 100) / 100;
    this.upload = Math.round(res.uploadStatus * 100) / 100;
    this.jitter = Math.round(res.jitterStatus * 100) / 100;
    this.started = res.testState !== 4;
  }

  private resetAll() {
    this.ping = 0;
    this.download = 0;
    this.upload = 0;
    this.jitter = 0;
  }

}
