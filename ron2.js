const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition(); //The recognition variable will give us access to all the API's methods and properties. 

var isListening = false;

function listen() {
    if (!isListening) {
        //if listening is disabled
        isListening = true;
        speak();
        document.querySelector('#talkBtn').value = "Stop Listening";
    } else {
        //if listening already
        isListening = false;
        document.querySelector('#ShowButton').value = "Talk to Ron!";
    }
}

function speak() {
    if (isListening) {
        document.getElementById("ronImg").src = "ron.png";
        try { //If browser supports the speech recognition feature.
            const instructions = document.getElementById("tipTxt");
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition(); //The recognition variable will give us access to all the API's methods and properties. 
            recognition.start();

            recognition.onstart = function() { //voice recognition activated.
                document.getElementById("ronImg").src = "listen.gif";
            };

            recognition.onresult = function(event) {
                console.log("test");
                const current = event.resultIndex;
                const transcript = event.results[current][0].transcript;
                console.log(transcript);

                document.getElementById("ronImg").src = "speak.gif";
                const speech = new SpeechSynthesisUtterance();
                speech.text = transcript;
                speech.volume = 1;
                speech.rate = 1;
                speech.pitch = 0.2;

                instructions.innerText = '"' + transcript + '"';
                window.speechSynthesis.speak(speech);
                speak();
            };
        } catch (e) {
            console.error(e);
            alert("Whoops! Looks like your browser isn't supported.");
        };
    }
}

function help() {
    alert("Didn't hear Ron reply? Your browser may not be fully supported, mic permission might not have been granted, or your device's volume may be muted.");
}

function about() {
    alert("My Talking Ron v0.0.1\n\nProgrammed and designed by John Spahr\ngithub.com/johnspahr");
}