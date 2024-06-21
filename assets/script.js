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

        console.log(user);
        closeModal();
    };

    // Event listeners
    closeModalButton.addEventListener('click', closeModal);
    saveUserButton.addEventListener('click', (event) => {
        event.preventDefault();
        saveUserData();
    });

    // Event listener for "My Mood" button to open the modal
    myMoodButton.addEventListener('click', openModal);
});
const GIPHYAPIKey = "ATZHOCugJY4c84N9kSARyOvLB2gL4xi6";
const userInterests = document.querySelector("#UserInterests"); //change id after querySelector to match form

//returns 5 GIFs in repsonse to keywords from the user's interests field in the form
//const GIFQueryURL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPIKey}&q=${userInterests}&limit=5&offset=0&rating=r&lang=en&bundle=messaging_non_clips`;
const GIFQueryURL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPIKey}&q=cats&limit=5&offset=0&rating=r&lang=en&bundle=messaging_non_clips`;

function fetchGifData() {
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

fetchGifData();