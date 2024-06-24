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
    });

    // Event listener for "My Mood" button to open the modal
    myMoodButton.addEventListener('click', openModal);
});
