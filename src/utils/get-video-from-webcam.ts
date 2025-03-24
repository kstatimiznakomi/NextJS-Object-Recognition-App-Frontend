export const getVideoFromWebcam = async (): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia({video: true, audio: false})
}