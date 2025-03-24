import React from "react";
import {WebcamComp} from "@/components/webcam-detection/Webcam/WebcamComp";
import {OnOffCam} from "@/components/webcam-detection/OnOffCam/OnOffCam";


export const HGR: React.FC = () => {
    return (
        <div className={'flex flex-col items-center m-4'}>
            <WebcamComp/>
            <OnOffCam/>
        </div>
    )
}