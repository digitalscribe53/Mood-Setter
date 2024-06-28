document.addEventListener('DOMContentLoaded', () => {
    const userModal = document.getElementById('userModal');
    const closeModalButton = document.getElementById('closeModal');
    const saveUserButton = document.getElementById('saveUser');
    const myMoodButton = document.getElementById('myMoodButton');
    const userForm = document.getElementById('userForm');

    const musicBox = document.getElementById('music-box');

    // Function to open the modal and clear the form inputs
    const openModal = () => {
        userForm.reset(); // Clear all input fields
        userModal.classList.add('is-active');
    };

    // Function to close the modal
    const closeModal = () => {
        userModal.classList.remove('is-active');
    };

    // Function to fetch data from YouTube API
    const fetchYouTubeData = (mood) => {
       
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${mood}&videoSyndicated=true&maxResults=5&key=AIzaSyDVp1DyejHjZNCIXEyHK7Uia4M86wviqQg`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                // Check if there are any items in the response
                if (data.items && data.items.length > 0) {
                    const videoIds = data.items.map(item => item.id.videoId).join(',');
                    fetchVideoDetails(videoIds);
                }
            })
            .catch(error => console.error('Error fetching YouTube data:', error));
    };

    // Function to fetch video details
    const fetchVideoDetails = (videoIds) => {
        
        const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoIds}&key=AIzaSyDVp1DyejHjZNCIXEyHK7Uia4M86wviqQg`;

        fetch(videoDetailsUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                for (let video of data.items) {
                    if (video.status.embeddable) {
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

        // Fetch YouTube data based on mood
        fetchYouTubeData(mood);
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
            for (let i = 0; i < GIFdata.data.length; i++) {
                let figure = document.createElement('figure');
                let image = document.createElement('img');
                image.src = GIFdata.data[i].images.fixed_height.url;
                image.alt = GIFdata.data[i].title;
                figure.append(image);
                let gifDisplay = document.querySelector('#gif-box')
                gifDisplay.append(figure);
            }
        })
}

// Function to set the theme based on the user's mood
function setTheme() {
    // pulls the most recent user from local storage
    var savedUserData = JSON.parse(localStorage.getItem('userDataArray'));
    if (!savedUserData || savedUserData.length === 0) {
        console.log('No user data found in local storage.');
        return;
    }

    var lastSavedUser = savedUserData[savedUserData.length - 1]; // This will pull the most recently added user in the local storage
    var mood = lastSavedUser.mood;
    console.log('Setting theme based on mood:',mood);

    const outerBox = document.querySelector('#outer-box');
    outerBox.classList.remove('happy', 'sad', 'angry', 'chill', 'love', 'inspired', 'hype', 'default');

    switch (mood.toUpperCase()) {
        case 'HAPPY':
            document.querySelector('#outer-box').classList.add('happy');
            break;
        case 'SAD':
            document.querySelector('#outer-box').classList.add('sad');
            break;
        case 'ANGRY':
            document.querySelector('#outer-box').classList.add('angry');
            break;
        case 'CHILL' :
            document.querySelector('#outer-box').classList.add('chill');
            break;
        case 'LOVE':
            document.querySelector('#outer-box').classList.add('love');

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

        case 'HYPE' :
            document.querySelector('#outer-box').classList.add('hype');
            break;

        default:
            document.querySelector('#outer-box').classList.add('default');
    }

    // takes the mood key from the user object 
    // uses switch case to handle their mood

}

// Function to fetch data from YouTube API
const fetchYouTubeData = (mood, musicBox) => {
    const apiKey = 'AIzaSyDVp1DyejHjZNCIXEyHK7Uia4M86wviqQg'; // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${mood}&videoSyndicated=true&maxResults=5&key=${apiKey}`;

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
    const apiKey = 'AIzaSyDVp1DyejHjZNCIXEyHK7Uia4M86wviqQg'; // Replace with your actual API key
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoIds}&key=${apiKey}`;

    fetch(videoDetailsUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (let video of data.items) {
                if (video.status.embeddable) {
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
