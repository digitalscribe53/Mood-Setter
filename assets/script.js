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
        setTheme();
    });

    // Event listener for "My Mood" button to open the modal
    myMoodButton.addEventListener('click', openModal);
});

function setTheme() {
    // pulls the most recent user from local storage
    var savedUserData = JSON.parse(localStorage.getItem('userDataArray'));
    var lastSavedUser = savedUserData[savedUserData.length-1]
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
        case 'CHILL' :
            document.querySelector('#outer-box').classList.add('chill');
            break;
        case 'LOVE' :
            document.querySelector('#outer-box').classList.add('love');
            break;
        case 'INSPIRED' :
            document.querySelector('#outer-box').classList.add('inspired');
            break;
        case 'HYPE' :
            document.querySelector('#outer-box').classList.add('hype');
            break;
        default:
            document.querySelector('#outer-box').classList.add('default');
    }
    // takes the mood key from the user object 
    // uses switch case to handle their mood
}
