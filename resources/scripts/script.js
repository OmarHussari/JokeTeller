const button = document.getElementById('button');

let joke = '';

const toggleButton = () => {
    button.disabled = !button.disabled;
}

// Get jokes from JokeAPI, then call speakify
const getJoke = async () => {
    try {
        let response = await fetch('https://v2.jokeapi.dev/joke/Programming,Dark');
        let data = await response.json();
        // Add logic to set joke both single joke, or setup and response
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Disable button when voice is speaking
        toggleButton();
        // Text-to-Speach
        speakify();
    } catch (error) {
        console.log(error);
    }   
}

// Convert text fetched to speech and playaudio
const speakify = () => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(joke);
    // Event listener to enable button when SpeechSynthesisUtterance event is done
    utterThis.addEventListener('end', toggleButton);
    utterThis.rate = 0.75;
    synth.speak(utterThis);
}

// Event listener for our button
button.addEventListener('click', getJoke);