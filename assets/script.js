document.addEventListener('DOMContentLoaded', () => {
    const userModal = document.getElementById('userModal');
    const closeModalButton = document.getElementById('closeModal');
    const saveUserButton = document.getElementById('saveUser');
    const myMoodButton = document.getElementById('myMoodButton');
    const userForm = document.getElementById('userForm');

    // Function to open the modal and clear the form inputs
    const openModal = () => {
        userForm.reset(); // Clear all input fields
        userModal.classList.add('is-active');
    };

    // Function to close the modal
    const closeModal = () => {
        userModal.classList.remove('is-active');
    };

    // Function to save user data
    const saveUserData = () => {
        const name = document.getElementById('userName').value.trim();
        const mood = document.getElementById('userMood').value.trim();
        const interests = document.getElementById('userInterests').value.trim();

        // Check if all fields are filled
        if (name === '' || mood === '' || interests === '') {
            closeModal();
            return;
        }

        const user = {
            name: name,
            mood: mood,
            interests: interests
        };

        // Retrieve the current user data array from local storage
        let userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || [];

        // Add the new user data to the array
        userDataArray.push(user);

        // Store the updated array back to local storage
        localStorage.setItem('userDataArray', JSON.stringify(userDataArray));

        fetchGifData(user.interests);

        console.log(user);
        closeModal();
    };

    // Event listeners
    closeModalButton.addEventListener('click', closeModal);
    saveUserButton.addEventListener('click', (event) => {
        event.preventDefault();
        saveUserData();
        setTheme();
    });

    // Event listener for "My Mood" button to open the modal
    myMoodButton.addEventListener('click', openModal);
});

giphyapi
// GIPHY API Key
const GIPHYAPIKey = "ATZHOCugJY4c84N9kSARyOvLB2gL4xi6";

//returns 5 GIFs in repsonse to keywords from the user's interests field in the form

// const userInterests = JSON.parse(localStorage.getItem(userDataArray[0].interests));
function fetchGifData(userInterests) {

const GIFQueryURL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPIKey}&q=${userInterests}&limit=5&offset=0&rating=r&lang=en&bundle=messaging_non_clips`;
console.log(GIFQueryURL);

    fetch(GIFQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (GIFdata) {
            
            for (i = 0; i < GIFdata.data.length; i++) {
                let figure = document.createElement('figure');
                let image = document.createElement('img');
                image.src = GIFdata.data[i].images.fixed_height.url;
                image.alt = GIFdata.data[i].title;
                figure.append(image);
                let gifDisplay = document.querySelector('#gif-box')
                gifDisplay.append(figure);
            }

        })
};

=======
function setTheme() {
    // pulling the most recent user from local storage
    var savedUserData = JSON.parse(localStorage.getItem('userDataArray'));
    var lastSavedUser = savedUserData[savedUserData.length-1] // This will pull the most recently added user in the localstorage
    var mood = lastSavedUser.mood;
    console.log(mood);
    switch (mood.toUpperCase()) {
        case 'HAPPY' :
            document.querySelector('#outer-box').classList.add('happy');
            break;
        case 'SAD' :
            document.querySelector('#outer-box').classList.add('sad');
            break;
        case 'ANGRY' :
            document.querySelector('#outer-box').classList.add('angry');
            break;
        case 'CALM' :
            document.querySelector('#outer-box').classList.add('calm');
            break;
        case 'LOVE' :
            document.querySelector('#outer-box').classList.add('love');
            break;
        case 'INSPIRED' :
            document.querySelector('#outer-box').classList.add('inspired');
            break;
        case 'SPONTANEOUS' :
            document.querySelector('#outer-box').classList.add('spontaneous');
            break;
        default:
            document.querySelector('#outer-box').classList.add('default');
    }
    // take the mood key from the user object 
    // build our switch case to handle their mood
}
dev
