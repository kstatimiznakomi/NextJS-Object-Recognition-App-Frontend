import {configure, makeAutoObservable} from "mobx";

configure({enforceActions: 'always'})

export class WebcamStore {
    isActiveWebcam = false
    isVideoToServer = false

    constructor() {
        this.isVideoToServer = false
        this.isActiveWebcam = false
        makeAutoObservable(this)
    }

    public setWebcamState = (isActiveWebcam: boolean) => {
        this.isActiveWebcam = isActiveWebcam
    }

    public setWebcamToStream = (isVideoToServer: boolean) => {
        this.isVideoToServer = isVideoToServer
    }
}
