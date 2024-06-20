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
                let caption = document.createElement('figcaption');
                image.src = GIFdata.data[i].images.fixed_height.url;
                image.alt = GIFdata.data[i].title;
                //caption.textContent = GIFdata.data[i].title;
                figure.append(image);
                let gifDisplay = document.querySelector('#gif-box')
                gifDisplay.append(figure);
            }

        })
};

fetchGifData();