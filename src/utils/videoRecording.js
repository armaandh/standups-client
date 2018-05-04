let mediaSource
let mediaRecorder
let recordedBlobs
let sourceBuffer

let constraints = {
    audio: true,
    video: true
}

const handleSuccess = (stream, callback) => {
    console.log('getUserMedia() got stream: ', stream)
    console.log('callback' , callback)
    window.stream = stream
    callback(stream)
}

const handleError = (error, callback) => {
    console.log('navigator.getUserMedia error', error)
    callback(error)
}

const handleSourseOpen = (event) => {
    console.log('MediaSourse opened')
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"')
    console.log('Source buffer: ', sourceBuffer)
}

const handleDataAvailable = (event) => {
    if (event.data && event.data.size > 0){
        recordedBlobs.push(event.data)        
    }
}

const handleStop = (event) => {
    console.log('Recorder stopped: ', event)
}

export const startRecording = () => {
    mediaSource = new MediaSource()
    mediaSource.addEventListener('sourceopen', handleSourseOpen, false)
    
    recordedBlobs = []
    let options = { mimeType: 'video/webm;codecs=vp9' }
    if (!MediaRecorder.isTypeSupported(options.mimeType)){
        console.log(options.mimeType + ' is not supported')
        options = { mimeType: 'video/webm;codecs=vp8' }
        if (!MediaRecorder.isTypeSupported(options.mimeType)){
            console.log(options.mimeType + ' is not supported')
            options = { mimeType: 'video/webm' }
            if (!MediaRecorder.isTypeSupported(options.mimeType)){
                console.log(options.mimeType + 'is not supported')
                options = { mimeType: '' }
            }
        }
    }

    try{
        mediaRecorder = new MediaRecorder(window.stream, options)
        console.log('Created Media Recorder', mediaRecorder, 'with options', options)   
        mediaRecorder.onstop = handleStop
        mediaRecorder.ondataavailable = handleDataAvailable
        mediaRecorder.start(10)
        console.log('Media Recorder started', mediaRecorder)
    } catch (e){
        console.error('Exception while creating MediaRecorder: ' + e)
        //alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType)
        return false
    }
}

export const stopRecording = () => {
    if (mediaRecorder !== undefined && mediaRecorder.state !== 'inactive'){
        mediaRecorder.stop()
        console.log('Recorded Blobs: ', recordedBlobs)
        stopStreamedVideo()
    }
}

const stopStreamedVideo = (videoElem) => {
    let tracks = window.stream.getTracks();

    tracks.forEach(function(track) {
        track.stop();
    });
  }

export const getVideoStreamURL = () => {
    return window.URL.createObjectURL(window.stream)
}

export const getVideoRecordURL = () => {
    let supperBuffer = new Blob(recordedBlobs, { type: 'video/webm' })
    return window.URL.createObjectURL(supperBuffer)
}

export const getVideoBlob = () => {
    return new Blob(recordedBlobs, { type: 'video/webm' })
}

export const initVideoRecording = () => {
    return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => handleSuccess(stream, resolve))
            .catch((error) => handleError(error, reject))
    })
}

export const isMediaRecordingSupported = () => {
    return window.MediaRecorder !== undefined
}