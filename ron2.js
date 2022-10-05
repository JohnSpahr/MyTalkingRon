const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition(); //The recognition variable will give us access to all the API's methods and properties. 

function speak() {

    document.getElementById("ronImg").src = "ron.JPEG";
    try { //If browser supports the speech recognition feature.
        const instructions = document.getElementById("tipTxt");
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition(); //The recognition variable will give us access to all the API's methods and properties. 
        recognition.start();

        recognition.onstart = function() { //voice recognition activated.
            document.getElementById("ronImg").src = "listen.JPEG";
        };

        recognition.onresult = function(event) {
            console.log("test");
            const current = event.resultIndex;
            const transcript = event.results[current][0].transcript;
            console.log(transcript);

            document.getElementById("ronImg").src = "speak.JPEG";
            const speech = new SpeechSynthesisUtterance();
            speech.text = transcript;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            instructions.innerText = '"' + transcript + '"';
            window.speechSynthesis.speak(speech);
        };

    } catch (e) {
        console.error(e);
        alert("Whoops! Looks like your browser isn't supported.");
    };


}

function about() {
    alert("My Talking Ron v0.0.1\n\nProgramming by John Spahr (johnspahr.org)\nCharacter design by Jasa Fye")
}