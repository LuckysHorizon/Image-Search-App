document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const imageGallery = document.getElementById("image-gallery");
    const loadMoreButton = document.getElementById("load-more");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const title = document.getElementById("title");
    let query = "";
    let page = 1;
    const API_KEY = "49262872-982a7fb81e61a1b7d15cd675d";
    const API_URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=";
    
    const fetchImages = () => {
        if (!query) return;
        fetch(`${API_URL}${query}&page=${page}&per_page=20`)
            .then(response => response.json())
            .then(data => {
                if (data.hits.length > 0) {
                    data.hits.forEach(image => {
                        const imgContainer = document.createElement("div");
                        imgContainer.classList.add("image-container");
                        
                        const imgElement = document.createElement("img");
                        imgElement.src = image.webformatURL;
                        imgElement.alt = image.tags;
                        imgElement.addEventListener("click", () => {
                            window.open(image.largeImageURL, "_blank");
                        });
                        
                        const downloadButton = document.createElement("a");
                        downloadButton.href = image.largeImageURL;
                        downloadButton.download = "image.jpg";
                        downloadButton.innerText = "Download";
                        downloadButton.classList.add("download-button");
                        
                        imgContainer.appendChild(imgElement);
                        imgContainer.appendChild(downloadButton);
                        imageGallery.appendChild(imgContainer);
                    });
                    loadMoreButton.style.display = "block";
                } else {
                    alert("No images found");
                }
            })
            .catch(error => console.error("Error fetching images:", error));
    };
    
    searchButton.addEventListener("click", () => {
        imageGallery.innerHTML = "";
        query = searchInput.value;
        page = 1;
        fetchImages();
    });
    
    loadMoreButton.addEventListener("click", () => {
        page++;
        fetchImages();
    });
    
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            title.style.color = "white";
            darkModeToggle.innerHTML = "☀️";
        } else {
            title.style.color = "black";
            darkModeToggle.innerHTML = "🌙";
        }
    });
});
