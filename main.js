const mic = document.getElementById("mictoggle");




// mic.addEventListener('click', togglemic); 

let recorder = null;
let is_recording = false;
let can_record = false;

let chunks = []; // audio storage


function SetupAudio() {

    // Checking these things exist
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: true,
        }).then(SetupStream)
        .catch(err => {console.error(err)});
    }
}

SetupAudio()

function SetupStream(stream) {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        chunks.push(e.data);
    }

    recorder.onstop = e => {    
        const blob = new Blob(chunks, {type: "audio/ogg; codecs=opus"}
        )
        chunks = [];
        const audioURL = window.URL.createObjectURL(chunks);
    }

}