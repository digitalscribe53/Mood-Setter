document.addEventListener('DOMContentLoaded', () => {
    const userModal = document.getElementById('userModal');
    const closeModalButton = document.getElementById('closeModal');
    const saveUserButton = document.getElementById('saveUser');
    const myMoodButton = document.getElementById('myMoodButton');
    const userForm = document.getElementById('userForm');
    const musicBox = document.getElementById('music-box');
    const welcomeMessageContainer = document.getElementById('welcome-message'); // Welcome message container

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
        fetchYouTubeData(user.mood, musicBox); // Fetch YouTube data based on the mood
        console.log(user);
        closeModal();
        displayWelcomeMessage();
    };

    // Function to display welcome message
    const displayWelcomeMessage = function() {
        let userDataArray = JSON.parse(localStorage.getItem('userDataArray')) || [];
        let welcomeMessage = "Welcome, click the button to set your mood";
        if (userDataArray.length > 0) {
            let lastUser = userDataArray[userDataArray.length - 1];
            welcomeMessage = `Welcome, ${lastUser.name}. Click the button to set your mood.`;
        }
        welcomeMessageContainer.innerHTML = `<div class="notification is-primary">${welcomeMessage}</div>`;
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

    // Display welcome message on page load
    displayWelcomeMessage();
});

// GIPHY API Key
const GIPHYAPIKey = "ATZHOCugJY4c84N9kSARyOvLB2gL4xi6";

// Function to fetch GIF data from GIPHY API
function fetchGifData(userInterests) {
    const GIFQueryURL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPIKey}&q=${userInterests}&limit=5&offset=0&rating=r&lang=en&bundle=messaging_non_clips`;

    console.log(GIFQueryURL);

    fetch(GIFQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (GIFdata) {
            let gifDisplay = document.querySelector('#gif-box');
            // Clear previous GIFs
            gifDisplay.innerHTML = '';

            for (let i = 0; i < GIFdata.data.length; i++) {
                let figure = document.createElement('figure');
                let image = document.createElement('img');
                image.src = GIFdata.data[i].images.fixed_height.url;
                image.alt = GIFdata.data[i].title;
                figure.append(image);
                gifDisplay.append(figure);
            }
        })
}

// Function to set the theme based on the user's mood
function setTheme() {
    var savedUserData = JSON.parse(localStorage.getItem('userDataArray'));
    if (!savedUserData || savedUserData.length === 0) {
        console.log('No user data found in local storage.');
        return;
    }

    var lastSavedUser = savedUserData[savedUserData.length - 1]; // This will pull the most recently added user in the local storage
    var mood = lastSavedUser.mood;
    console.log('Setting theme based on mood:',mood);

    const outerBox = document.querySelector('#outer-box');
    outerBox.classList.remove('happy', 'sad', 'angry', 'chill', 'romantic', 'inspired', 'hype', 'default');

    switch (mood.toUpperCase()) {
        case 'HAPPY':
            document.querySelector('#outer-box').classList.add('happy');
               
                // Function that creates bubble animation
                const bubbleContainer = document.createElement("div");
                document.querySelector('#outer-box').appendChild(bubbleContainer);
                const bubble1 = document.createElement("div");
                bubble1.classList.add('bubble','x1');
                bubbleContainer.appendChild(bubble1);
                const bubble2 = document.createElement("div");
                bubble2.classList.add('bubble','x2');
                bubbleContainer.appendChild(bubble2);
                const bubble3 = document.createElement("div");
                bubble3.classList.add('bubble','x3');
                bubbleContainer.appendChild(bubble3);
                const bubble4 = document.createElement("div");
                bubble4.classList.add('bubble','x4');
                bubbleContainer.appendChild(bubble4);
                const bubble5 = document.createElement("div");
                bubble5.classList.add('bubble','x5');
                bubbleContainer.appendChild(bubble5);
                const bubble6 = document.createElement("div");
                bubble6.classList.add('bubble','x6');
                bubbleContainer.appendChild(bubble6);
                const bubble7 = document.createElement("div");
                bubble7.classList.add('bubble','x7');
                bubbleContainer.appendChild(bubble7);
                const bubble8 = document.createElement("div");
                bubble8.classList.add('bubble','x8');
                bubbleContainer.appendChild(bubble8);
                const bubble9 = document.createElement("div");
                bubble9.classList.add('bubble','x9');
                bubbleContainer.appendChild(bubble9);
                const bubble10 = document.createElement("div");
                bubble10.classList.add('bubble','x10');
                bubbleContainer.appendChild(bubble10);
                
            break;
        case 'SAD':
            document.querySelector('#outer-box').classList.add('sad');
            break;
        case 'ANGRY':
            document.querySelector('#outer-box').classList.add('angry');
            break;
        case 'CALM':
            document.querySelector('#outer-box').classList.add('calm');
            break;
        case 'CHILL':
            document.querySelector('#outer-box').classList.add('chill');
            break;
        case 'ROMANTIC':
            document.querySelector('#outer-box').classList.add('romantic');
            


            // Special thanks to Developers Today
            // website for heart animation: https://medium.com/@developerstoday99/create-animated-hearts-87b3271ae774
            // Function that creates a heart element with random properties
            function createHeart() {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.width = `${Math.floor(Math.random() * 65) + 10}px`;
                heart.style.height = heart.style.width;
                heart.style.left = `${Math.floor(Math.random() * 100) + 1}%`;
                heart.style.background = `rgba(255, ${Math.floor(Math.random() * 25) + 100 - 25}, ${Math.floor(Math.random() * 25) + 100}, 1)`;
                const duration = Math.floor(Math.random() * 5) + 5;
                heart.style.animation = `love2 ${duration}s ease`;
                return heart;
            }
 
            // Get the container element where the hearts will be added
            const container = document.querySelector('#outer-box');
 
            // Function that removes hearts that have gone off screen
            function removeHearts() {
                const hearts = container.querySelectorAll('.heart');
                hearts.forEach((heart) => {
                const top = parseFloat(getComputedStyle(heart).getPropertyValue('top'));
                const width = parseFloat(getComputedStyle(heart).getPropertyValue('width'));
                if (top <= -100 || width >= 150) {
                    heart.remove();
                }
                });
            }
 
            // Define a function that repeatedly adds hearts to the container
            function addHeart() {
                const heart1 = createHeart();
                const heart2 = createHeart();
                container.appendChild(heart1);
                container.appendChild(heart2);
                setTimeout(removeHearts, 1000);
            }
           
            // Start the animation loop
            const love2 = setInterval(addHeart, 500);


            break;

        case 'INSPIRED':
            document.querySelector('#outer-box').classList.add('inspired');
            break;
        case 'SPONTANEOUS':
            document.querySelector('#outer-box').classList.add('spontaneous');
            break;
        case 'HYPE':
            document.querySelector('#outer-box').classList.add('hype');
            break;
        default:
            document.querySelector('#outer-box').classList.add('default');
    }
}

// Function to fetch data from YouTube API
const fetchYouTubeData = (mood, musicBox) => {
    const apiKey = 'AIzaSyBn-nf1Q4mq1qw_QElG_AKuMiAQNaQZ3c8'; 
    const searchTerm = `${mood} beat`; // Append "beat" to the user's mood
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(searchTerm)}&videoSyndicated=true&videoEmbeddable=true&maxResults=5&key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Check if there are any items in the response
            if (data.items && data.items.length > 0) {
                const videoIds = data.items.map(item => item.id.videoId).join(',');
                fetchVideoDetails(videoIds, musicBox);
            }
        })
        .catch(error => console.error('Error fetching YouTube data:', error));
};

// Function to fetch video details
const fetchVideoDetails = (videoIds, musicBox) => {
    const apiKey = 'AIzaSyBn-nf1Q4mq1qw_QElG_AKuMiAQNaQZ3c8'; 
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoIds}&key=${apiKey}`;
    fetch(videoDetailsUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let video of data.items) {
                if (video.status.embeddable) { // Filter out non-embeddable videos
                    // Create an iframe element to embed the YouTube video
                    const iframe = document.createElement('iframe');
                    iframe.width = '100%';
                    iframe.height = '100%';
                    iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
                    iframe.frameBorder = '0';
                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                    iframe.allowFullscreen = true;
                    // Clear previous content and append the iframe to the music box
                    musicBox.innerHTML = '';
                    musicBox.appendChild(iframe);
                    break; // Stop after embedding the first embeddable video
                }
            }
        })
        .catch(error => console.error('Error fetching video details:', error));
};
