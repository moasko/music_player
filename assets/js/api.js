const API_KEY = "0f96cb8395msh47dac3619fd0fd0p186832jsn616026525b0d"


const ft = async(artiste) => {
    let res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artiste}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        }
    })
    let get = await res.json()
    let data = get.data
    let liste = ''
    let recherche_liste = document.querySelector('.recherche_liste')
    data.forEach(e => {
        liste += `
        <div id=${e.artist.id} class="music_recherche_liste">
        <div class="mini_cov">
        <img src=${e.album.cover_small} alt="">
        </div>
        <div class="infos_reche">
        <div class="music_title">${e.title_short}</div>
        <div class="artiste_name_rech">${e.artist.name}</div>
        </div>
        </div>
        `
    });
    recherche_liste.innerHTML = liste
    aficherArtist()

}


//rechercher bar
let valide = document.querySelector('.recherche_btn')
valide.onclick = () => {
    let nom = document.querySelector('#name').value
    ft(nom)
}

//afiche artiste infos
const aficherArtist = () => {
    const get_dom_list = document.querySelectorAll('.music_recherche_liste')
    get_dom_list.forEach(e => {
        e.onclick = async() => {
            let res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${e.id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": API_KEY
                }
            })
            let data = await res.json()
                //datas
            let nom = data.name
            let nombre_alb = data.nb_album
            let fans = data.nb_fan
            const pho = data.picture_medium

            //gets

            let atrp = document.querySelector('.art_photo')
            let bog_cover = document.querySelector('.album_img_g')
            const noma = document.querySelector('.n')
            const nabl = document.querySelector('.nabl')
            const nbf = document.querySelector('.nbf')

            //assigns
            atrp.src = pho
            bog_cover.src = pho
            noma.innerHTML = nom
            nbf.innerHTML = `${fans} fans`
            nabl.innerHTML = `${nombre_alb} albums`


            get_track(e.id)
        }
    })



    const get_track = async(dr) => {
        let res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${dr}/top?limit=50`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": API_KEY
            }
        })
        let data = await res.json()
        let play_data = data.data
        let pliy = ''
        let playliste_itm = document.querySelector('.playliste_track')
        play_data.forEach(e => {

            pliy += ` 
             <div class="play_item">
            <img class="play_placeholder" src="https://paprium.com/test/data/default_artwork/music_ph.png" alt="">
            <div class="ply_nom">${e.title}</div>
            <div class="prev">
            <audio>
            <source src=${e.preview} type="">
            </audio>
            </div>
            </div>`
        })

        playliste_itm.innerHTML = pliy


        let gettt = document.querySelectorAll('.play_item')
        gettt.forEach(e => {
            e.onclick = () => {
                let souce = e.querySelector('source')
                let aud = document.querySelector('.aud')
                aud.src = souce.src

            }
        })

    }

}