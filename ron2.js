//talking ron code!!
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition(); //speech recognition api

var isListening = false; //tracks whether or not Ron should listen

function listen() {
    if (!isListening) {
        //if listening is disabled
        isListening = true;
        speak(); //start speech loop
        document.getElementById('talkBtn').value = "Stop Listening"; //change button text
    } else {
        //if listening already
        isListening = false;
        document.getElementById("ronImg").src = "ron.png"; //default state
        recognition.abort() //no more listening
        document.getElementById('talkBtn').value = "Stopping..."; //change button text
    }
}

function speak() {
    if (isListening) { //only run if listening
        try { //if browser supports the speech recognition feature
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.start(); //listen

            recognition.onstart = function() { //when voice recognition activated
                document.getElementById("ronImg").src = "listen.gif";
            };

            recognition.onresult = function(event) {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript; //transcript of what Ron heard
                const transcriptTxt = document.getElementById("transcriptTxt"); //where transcript is shown to user

                //speak input
                document.getElementById("ronImg").src = "speak.gif";
                const speech = new SpeechSynthesisUtterance();
                speech.text = transcript;
                speech.volume = 1;
                speech.rate = 1;
                speech.pitch = 0.1; //toggle for max voicage!!

                transcriptTxt.innerText = '"' + transcript + '"'; //show user what Ron heard

                window.speechSynthesis.speak(speech); //talk

                //handle speech synthesis end event
                speech.addEventListener("end", (event) => {
                    speak(); //keep listening when speech ends
                });
            };
        } catch {
            alert("Whoops! Looks like your browser isn't supported."); //only if browser badbad
        };
    } else {
        document.getElementById("transcriptTxt").innerText = "your talking skeleton pal"
        document.getElementById("ronImg").src = "ron.png"; //default state
        document.getElementById('talkBtn').value = "Talk to Ron!"; //change button text
    }
}

function help() {
    alert("Didn't hear Ron reply? Your browser may not be fully supported, mic permission might not have been granted, or your device's volume may be muted.");
}

function about() {
    alert("My Talking Ron v0.1.1\n\nProgrammed and designed by John Spahr\ngithub.com/johnspahr\n\nMade with <3 and vanilla JS!");
}