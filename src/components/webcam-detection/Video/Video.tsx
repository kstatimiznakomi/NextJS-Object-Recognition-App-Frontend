import React from "react";

interface VideoProps {
    src?: string
    id?: string | undefined
    srcObject?: MediaProvider | null;
    ref?: HTMLMediaElement | null
}

export const Video: React.FC<VideoProps> = ({src, id, srcObject, ref}) => {
    return (
        <video id={id} src={src}></video>
    )
}