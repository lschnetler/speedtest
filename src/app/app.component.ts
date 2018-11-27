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

  started = false;

  constructor(private speedtest: SpeedtestService) {
  }

  toggleStart() {
    if (this.started) {
      this.stopService();
    } else {
      this.startService();
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
    this.ping = res.pingStatus;
    this.download = res.downloadStatus;
    this.upload = res.uploadStatus;
    this.jitter = res.jitterStatus;
    this.started = res.testState !== 4
  }


}
