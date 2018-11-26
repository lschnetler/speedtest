export class SpeedtestResults {
    constructor(init?: Partial<SpeedtestResults>) {
        if (init) { Object.assign(this, init); }
    }

    testState = -1;
    downloadStatus;
    uploadStatus;
    pingStatus;
    clientIP;
    jitterStatus;
    downloadProgress;
    uploadProgress;
    pingProgress;
    testID;
}