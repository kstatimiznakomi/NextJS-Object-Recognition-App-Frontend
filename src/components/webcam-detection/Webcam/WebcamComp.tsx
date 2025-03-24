import React, {useContext, useEffect, useRef} from "react";
import {webcamStore} from "../../../stores";
import {observer} from "mobx-react-lite";
import Webcam from "react-webcam";
import {OffWebcam} from "./OffWebcam";
import {WebcamSpan} from "./WebcamSpan";
import {webcamSendToAPI} from "@/utils/webcam-utils";

interface WebcamProps {
    className?: string
    text?: string
}

export const WebcamComp: React.FC<WebcamProps> = observer(() => {

    const webcamStore1 = useContext(webcamStore)
    const webcamRef = useRef(null)
    const imgRef = useRef(null)
    let intervalId: number | undefined

    const videoToImg = () => {
        //intervalId = window.setInterval(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            webcamStore1.isVideoToServer && (
                // @ts-ignore
                imgRef.current.src = webcamRef.current.getScreenshot(),
                webcamSendToAPI(webcamRef.current.getScreenshot())
            )
        //}, 250)
    }

    const bigCondition = () => {
        if (webcamStore1.isActiveWebcam) {
            if (webcamStore1.isVideoToServer) {
                return <>
                    <div>
                        <WebcamSpan
                            text={'Ваша камера'}/>
                        <Webcam onPlaying={() => videoToImg()}
                                className={'webcamVideo'}
                                ref={webcamRef}
                                mirrored={true}
                                autoPlay={true}
                                screenshotFormat={"image/jpeg"}
                                audio={false}
                                width={500}
                                height={375}/>
                    </div>
                    <div>
                        <WebcamSpan
                            text={'Распознанный жест'}/>
                        <img alt={''} ref={imgRef} className={'webcam_img'}/>
                    </div>
                </>
            } else return <>
                <div>
                    <WebcamSpan
                        text={'Ваша камера'}/>
                    <Webcam className={'webcamVideo'}
                            ref={webcamRef}
                            mirrored={true}
                            autoPlay={true}
                            screenshotFormat={"image/jpeg"}
                            audio={false}
                            width={500}
                            height={375}/>
                </div>
                <div>
                    <OffWebcam text={'Распознанный жест'}/>
                </div>
            </>

        } else return <>
            <div>
                <OffWebcam text={'Ваша камера'}/>
            </div>
            <div>
                <OffWebcam text={'Распознанный жест'}/>
            </div>
        </>
    }

    useEffect(() => {
        videoToImg()
    })

    return (
        <div id="img-div" className="max-w-[1107px] image-window mt-3 flex justify-center">
            <div className={'flex mb-3 flex-wrap gap-3 min-w-min justify-center items-center'}>
                {bigCondition()}
            </div>
        </div>
    )
})