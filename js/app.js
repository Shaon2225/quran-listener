// total global variable
const surahPlayer = document.getElementById('surah-player');
const surahText = document.getElementById('surah-text');
const surahContainer = document.getElementById('surah-name-container')

// surah ayah link array
let ayahLinkAudio =[];
let ayahtext = []

function getData(){
    fetch('http://api.alquran.cloud/v1/quran/ar.alafasy')
    .then( res => res.json())
    .then( json =>{
        showSurahInContainer(json.data.surahs);
    })
}

// show all surah in container
function showSurahInContainer(data){
    for(const x of data){
        surahContainer.innerHTML+=`
        <div class="d-flex justify-content-between shadow my-2 py-2 px-5 border rounded-pill bg-white">
            <div class="text-left ms-3 mt-4">
                <img src="asset/img/Islam sign outline 12.png" alt="">
                <h3 class="fw-semibold fs-5 m-1 z-index-no">${x.number}</h3>
            </div>
            <div class="text-left">
                <h2>${x.englishName}</h2>
                <p>
                     Total verse : ${x.ayahs.length} <br>
                    <small class="my-0">Origin : ${x.revelationType}</small>
                </p>
            </div>
         </div>
            `;
    }
}
getData();
document.getElementById('surah-fatiha').addEventListener('click', function (){
    
})