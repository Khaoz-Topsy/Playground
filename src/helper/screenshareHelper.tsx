export const getScreenshareStream = async (
    setCapturedStream: (stream: MediaStream) => void,
    failedToGetStream: () => void = () => { },
) => {
    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true
        });
        setCapturedStream(captureStream);
    } catch (err) {
        failedToGetStream();
    }
}