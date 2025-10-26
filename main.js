const mic = document.getElementById("mictoggle");




// mic.addEventListener('click', togglemic); 

let recorder = null;
let is_recording = false;
let can_record = false;

let chunks = []; // audio storage


function SetupAudio() {

    // Checking these things exist

    // so this is a promise, where the first argument is what to do if it succeeds.
    // the setupstream function will be called if the promise succeeds.
    // The setup stream function is passed the return of the promise
    // Another way to write this would be ".then(stream => setupStream(stream)"
    // REmember the stream object returned is a stream of media content, in this instance audio
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: true,
        }).then(SetupStream) 
        .catch(err => {
            console.error("Error accessing microphone:", err);
            if (err.name === "NotAllowedError") {
            document.getElementById("WarningLbl").textContent = "Microphone access denied. Please grant permission in your browser settings.";
            } else if (err.name === "NotFoundError") {
            document.getElementById("WarningLbl").textContent = "No microphone found. Please check your system settings.";
            }
        });
    }
}

 

/**
 * 
 * Take the audio stream (mic) and creats media recorder 
 * 
 * @param {Audio stream} stream - passed form the setup, only works if the audio perismissions are accepted.
 *  
 */
function SetupStream(stream) {
    // This is a constantly ongoing recording that you will set to true or false to record
    recorder = new MediaRecorder(stream);

    // fired periodically, when a 'timeslice' milliseconds of data has been recorded
    // OR entire media is recorded if timeslice wasn't specified.
    recorder.ondataavailable = e => {
        chunks.push(e.data);
    }

    // When we stop the recording, we will clear the memory and send the audio to the user in .ogg file
    recorder.onstop = e => {    
        const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"}
        )
        chunks = []; // Clear the memory so it can start again from nothing.
        const audioURL = window.URL.createObjectURL(chunks);
    }

}

function main() { 
    SetupAudio();

    document.getElementById("mictoggle").onclick = function () {
        if (recorder.state === "inactive") {
            console.log("Recording inactive")
        } else if (recorder.state === "paused") {
            
            console.log("Recording paused")
        } else {
            console.log("Recording active")
    
        }
    }

}

main();