const searchBtn    = document.getElementById("search_btn");
const searchInput  = document.getElementById("search_input");
const searchResult = document.getElementById("search_result");
const lyrics       = document.getElementById("lyrics");

searchBtn.addEventListener("click", displaySearch);

/* ===== Search Lyrics====== */
function displaySearch() {
    const songTitle = searchInput.value;
    if (songTitle) {
        fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
        .then((res) => res.json())
        .then((data) => {
            const apiData = data.data;
            const songsData = apiData.map((item) => item).slice(0, 10);

            if (!songsData.length) {
                searchResult.innerHTML = `<h4 class="text-center">Sorry!Not Available</h4>`;
            }
            else {
                searchResult.innerHTML = "";
                songsData.map((item) => {
                    searchResult.innerHTML += `
                    <!-- single result -->
                    <div class="single-result d-flex align-items-center justify-content-between my-3 p-3">
                        <div>
                            <a href="${item.link}" target="_blank">
                                <img src="${item.album.cover}" 
                                alt="cover of ${item.album.title}">
                            </a>
                        </div>
                        <div>
                            <h3 class="lyrics-name">
                            <a href="${item.link}" 
                                target="_blank">${item.title}</a>
                            </h3>
                            <p class="author lead">
                                ${item.album.title} by <span style="font-style: italic;" >
                                ${item.artist.name}</span>
                            </p>
                        </div>
                        <div class="text-md-right text-center">
                            <button class="btn btn-success" 
                                onclick="getLyrics('${item.artist.name}', 
                                '${item.title}', 
                                '${item.title}', 
                                '${item.artist.name}')">Get Lyrics 
                            </button>
                        </div>
                    </div>
                    <!-- ./ single result -->
                    `;
                });
            }
                searchInput.value = "";
                searchResult.style.display = "block";
                lyrics.innerHTML = "";
        });
    }
    else {
        searchResult.innerHTML = `<h1 class="text-center">Please fill out search<h1>`;
    }
}

/* ============Lyrics Generate============ */
function getLyrics(artist, title, songTitle, artistName) {

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then((res) => res.json())
        .then((data) => {
            if(!data.error) {
                lyrics.innerHTML = `
                <h2 class="text-success mb-4">${artistName} - ${songTitle}</h2>
                <pre class="lyric text-white">${ data.lyrics }</pre>
                `;
                searchResult.style.display = "none";
            }
            else {
                lyrics.innerHTML = `
                <h2 class="text-success mb-4">${artistName} - ${songTitle}</h2>
                <h4 class="text-center text-danger">Sorry!</h4>
                <h2 class="text-center text-white">Lyrics Not Available At This Moment<h2>
                `;
                searchResult.style.display = "none";
            }   
        });
}