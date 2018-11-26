import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { SpeedtestResults } from "../classes/speedtest-results";

@Injectable()
export class SpeedtestService {

    isRunning = false;

    private speedtestResults: BehaviorSubject<SpeedtestResults>;
    private intervalUpdate;
    private worker: Worker;

    startService() {
        if (this.isRunning) { console.log('Speedtest service is already running'); return; }
        this.initWorker();
        this.speedtestResults = new BehaviorSubject(new SpeedtestResults());
        this.initIntervalUpdate();
        this.worker.postMessage('start');
        this.isRunning = true;
    }

    getResultSub() {
        if (!this.isRunning) {
            throw new Error('Speedtest service not started');
        }
        return this.speedtestResults;
    }

    stopService() {
        if (!this.isRunning) { console.log('Speedtest service is not running'); return; }
        this.abortWorker();
        this.abortInterval();
        this.speedtestResults.complete();

        this.isRunning = false;
    }

    private initWorker() {
        this.worker = new Worker('speedtest_worker.js');
        this.worker.onmessage = (res) => {
            if (res) { this.updateResultsFromJson(res);}
        }
    }

    private initIntervalUpdate() {
        this.intervalUpdate = setInterval(() => {
            this.worker.postMessage('status');
        }, 100);
    }

    private abortWorker() {
        this.worker.postMessage('abort');
        this.worker = undefined;
    }

    private abortInterval() {
        clearInterval(this.intervalUpdate);
        this.intervalUpdate = undefined;
    }

    private updateResultsFromJson(json) {
        const data = JSON.parse(json.data);
        this.speedtestResults.next(new SpeedtestResults({
            testState: data.testState,
            downloadStatus: data.dlStatus,
            uploadStatus: data.ulStatus,
            pingStatus: data.pingStatus,
            clientIP: data.clientIp,
            jitterStatus: data.jitterStatus,
            downloadProgress: data.dlProgress,
            uploadProgress: data.ulProgress,
            pingProgress: data.pingProgress,
            testID: data.testId
        }));

        if (data.testState >= 4) {
            this.stopService();
        }
    }
}