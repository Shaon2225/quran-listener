// total global variable
const surahPlayer = document.getElementById('surah-player');
const surahText = document.getElementById('surah-text');
const surahContainer = document.getElementById('surah-name-container')
let surahName
getData();

// surah ayah link array
let ayahLinkAudio =[];
let ayahtext = []

function getData(){
    fetch('https://api.quran.sutanlab.id/surah')
    .then( res => res.json())
    .then( json =>{
        showSurahInContainer(json.data);
        getAyahAndSurahNumber();
    })
}

// show all surah in container
function showSurahInContainer(data){
    for(const x of data){
        surahContainer.innerHTML+=`
        <div id="surah-no" class="d-flex justify-content-between shadow my-2 py-2 px-5 border rounded-pill bg-white">
            <div class="text-left ms-3 mt-4">
                <img src="asset/img/Islam sign outline 12.png" alt="">
                <h3 class="fw-semibold fs-5 m-1 z-index-no" >${x.number}</h3>
            </div>
            <div class="text-left">
                <h2>${x.name.transliteration.en}(${x.name.short})</h2>
                <p>
                     Total verse : <span id="total-ayah-no">${x.numberOfVerses}</span> <br>
                    <small class="my-0">Origin : ${x.revelation.en}</small>
                </p>
            </div>
         </div>
            `;
    }
}

// getting all surah number
function getAyahAndSurahNumber(){
    const surahNameArray = document.querySelectorAll('#surah-name-container #surah-no');
    //  console.log(surahNameArray);
    surahNameArray.forEach((m,index)=>{
        m.addEventListener('click',()=>{
            // playlist push
            
            const url = `https://api.quran.sutanlab.id/surah/${index+1}`;
            fetch(url)
            .then(res => res.json())
            .then(json => {
                ayahLinkAudio = [];
                ayahtext = [];
                console.log('audio',ayahLinkAudio);
                console.log('text',ayahtext);
                console.log('clicked');
                let allAyah =json.data.verses;
                allAyah.forEach((ayah) =>{
                    ayahLinkAudio.push(ayah.audio.primary);
                    ayahtext.push(ayah.text.arab);
                })

                let ayahIndex = 0;
                ayahPlayer(ayahIndex);
                document.getElementById('audio-player').addEventListener('ended', ()=>{
                    ayahIndex++;
                    if(ayahIndex < ayahLinkAudio.length){
                        ayahPlayer(ayahIndex);
                    }
                    else{
                        ayahIndex = 0 ;
                        audio.pause();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Sura has been ended',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
                document.getElementById('prev').addEventListener('click',()=>{
                    ayahIndex--;
                    ayahPlayer(ayahIndex);
                })
                document.getElementById('next').addEventListener('click',()=>{
                    ayahIndex++;
                    ayahPlayer(ayahIndex);
                })
                function ayahPlayer(index){
                    const audioPlayer = document.getElementById('audio-player');
                    const ayahTextBox = document.getElementById('ayah-text-box');
                    ayahTextBox.innerHTML=`
                    <p class="py-3 px-auto">${ayahtext[index]}</p>
                    `;
                    audioPlayer.src=ayahLinkAudio[index];
                    audioPlayer.play();
                }
                
            })
        })
    });
}

// audio part 

