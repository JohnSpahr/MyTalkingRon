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
        document.getElementById('talkBtn').value = "Talk to Ron!"; //change button text
        document.getElementById("ronImg").src = "ron.png"; //default state
    }
}

function speak() {
    if (isListening) { //only run if listening
        try { //If browser supports the speech recognition feature.
            const instructions = document.getElementById("tipTxt");
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.start(); //listen

            recognition.onstart = function() { //when voice recognition activated
                document.getElementById("ronImg").src = "listen.gif";
            };

            recognition.onresult = function(event) {
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript; //transcript of what Ron heard

                //speak input
                document.getElementById("ronImg").src = "speak.gif";
                const speech = new SpeechSynthesisUtterance();
                speech.text = transcript;
                speech.volume = 1;
                speech.rate = 1;
                speech.pitch = 0.1; //toggle for max voicage!!

                instructions.innerText = '"' + transcript + '"'; //show user what Ron heard

                window.speechSynthesis.speak(speech); //talk

                //handle speech synthesis end event
                speech.addEventListener("end", (event) => {
                    speak(); //keep listening when speech ends
                });
            };
        } catch {
            alert("Whoops! Looks like your browser isn't supported."); //only if browser badbad
        };
    }
}

function help() {
    alert("Didn't hear Ron reply? Your browser may not be fully supported, mic permission might not have been granted, or your device's volume may be muted.");
}

function about() {
    alert("My Talking Ron v0.0.5\n\nProgrammed and designed by John Spahr\ngithub.com/johnspahr\n\nMade with <3 and vanilla JS!");
}