const btn = document.querySelector("#btn");
const audioCheckbox = document.querySelector("#audioCheckbox");
const audio = document.querySelector("#audio");

const dictionary = async (word) => {
    try {
        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        let response = await data.json();
        return response;
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
        return null;
    }
};

btn.addEventListener("click", async () => {
    let word = document.querySelector("#text").value.trim();
    if (word !== "") {
        let resultContainer = document.querySelector("#result");
        resultContainer.innerHTML = ""; // Clear previous results

        let result = await dictionary(word);
        if (result !== null && result.length > 0) {
            // Display the first definition
            resultContainer.innerHTML = `
                <strong>${word}:</strong><br>
                <em>${result[0].meanings[0].definitions[0].definition}</em>
            `;

            // Check if audio should be played
            if (audioCheckbox.checked) {
                speak(result[0].meanings[0].definitions[0].definition);
            }
        } else {
            resultContainer.innerHTML = "No definition found.";
        }
    } else {
        alert('Please enter a word.');
    }
});

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}
