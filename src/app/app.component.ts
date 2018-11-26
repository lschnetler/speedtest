import { Component } from '@angular/core';
import { SpeedtestService } from './services/speedtest.service';
import { SpeedtestResults } from './classes/speedtest-results';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ping = 0;
  download = 0;
  upload = 0;
  jitter = 0;

  constructor(private speedtest: SpeedtestService) {
    speedtest.startService();
    speedtest.getResultSub().subscribe(
      (res) => { this.update(res) },
      (err) => {  },
      () => {}
    );
  }

  private update(res: SpeedtestResults) {
    this.ping = res.pingStatus;
    this.download = res.downloadStatus;
    this.upload = res.uploadStatus;
    this.jitter = res.jitterStatus;
  }


}
