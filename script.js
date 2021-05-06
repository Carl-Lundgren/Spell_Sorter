document.addEventListener("DOMContentLoaded", () => {

    const submit = document.querySelector('#spell-search-form');
    const spellList = document.querySelector('#spell-list');
    const Favorites = document.querySelector('#favorites');
    const FavoriteList = document.querySelector('#favorite-spell-list');
    Favorites.style.display = "none";

    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = document.querySelector('#spell-searched');
        spellList.innerHTML = '';

        fetch (`https://www.dnd5eapi.co/api/spells/?name=${input.value}`)
            .then(response => response.json())
            .then(data => {
                for (const obj of data.results) {
                    const li = document.createElement('li');
                    li.innerText = `${obj.name}`;
                    attachClickListener (li, obj.url);
                    spellList.append(li);
                }
            })
            .catch(error => {
                document.body.append(error.message);
            });
      });

    function attachClickListener(li, url){
        let i = 1;
        li.addEventListener('click', (e) => {
            fetch (`https://www.dnd5eapi.co${url}`)
                .then(response => response.json())
                .then(data => {
                    if (i === 0){
                        li.removeChild(li.lastChild);
                        i = 1;
                        
                    } else {
                        const ul = document.createElement('ul');
                        ul.classList.add("inner");
                        const desc = document.createElement('li');
                        if (data.higher_level){
                            desc.innerHTML = 
                            `level: ${data.level} <br> range: ${data.range} <br> casting time: ${data.casting_time} <br>
                            duration: ${data.duration} <br> concentration: ${data.concentration} <br> components: ${data.components} <br> <br>
                            ${data.desc} <br> <br> ${data.higher_level} <br>`;
                        } else {
                            desc.innerHTML = 
                            `level: ${data.level} <br> range: ${data.range} <br> casting time: ${data.casting_time} <br>
                            duration: ${data.duration} <br> concentration: ${data.concentration} <br> components: ${data.components} <br> <br>
                            ${data.desc} <br>`;
                        }
                        i = 0;
                        attachFavoriteButton(data, desc);
                        ul.append(desc);
                        li.append(ul);
                    }
                })
                .catch(error => {
                    document.body.append(error.message);
                });
        });
    }

    function attachFavoriteButton(data, desc){
        const submit = document.createElement('form');
        submit.innerHTML = `<input type="submit" value="Favorite">`;
  
        submit.addEventListener('submit', (e) => {
            e.preventDefault();
            Favorites.style.display = "block";

            const configObject = {
                    method: 'POST',
                    headers: 
                {
                "Content-Type": "application/json",
                Accept: "application/json"
                },
                body: JSON.stringify({
                    "name": `${data.name}`,
                    "level": `${data.level}`,
                    "range": `${data.range}`,
                    "casting_time": `${data.casting_time}`,
                    "duration": `${data.duration}`,
                    "concentration": `${data.concentration}`,
                    "components": `${data.components}`,
                    "desc": `${data.desc}`,
                    "higher_level": `${data.higher_level}`
                }) 
            }
            favoriteFetcher(configObject);
        });
        desc.append(submit);
    }

    function favoriteFetcher(data) {
        FavoriteList.innerHTML = ''
        fetch ('http://localhost:3000/spells', data)
        .then(() => fetch('http://localhost:3000/spells', favoriteCompiler)
        .then(response => response.json())
        .then(data => favoriteCompiler(data)))
        .catch(error => {
            document.body.append(error.message);
        });
    }

    function favoriteCompiler(input) {
        for (const data of input) {
            const li = document.createElement('li');
            li.innerText = `${data.name}`;
            const ul = document.createElement('ul');
            ul.classList.add("favorite");
            const desc = document.createElement('li');
            if (data.higher_level){
                desc.innerHTML = 
                    `level: ${data.level} <br> range: ${data.range} <br> casting time: ${data.casting_time} <br>
                    duration: ${data.duration} <br> concentration: ${data.concentration} <br> components: ${data.components} <br> <br>
                    ${data.desc} <br> <br> ${data.higher_level} <br>`;
            } else {
                desc.innerHTML = 
                    `level: ${data.level} <br> range: ${data.range} <br> casting time: ${data.casting_time} <br>
                    duration: ${data.duration} <br> concentration: ${data.concentration} <br> components: ${data.components} <br> <br>
                    ${data.desc} <br>`;
            }
            favoriteToggleVisibility(li, ul)
            ul.append(desc);
            li.append(ul);
            FavoriteList.append(li);
        }
    }

    function favoriteToggleVisibility(x, y){
        x.addEventListener('click', (e) => {
            if (y.style.display === "none") {
                y.style.display = "block";
            } else {
                y.style.display = "none";
            }
        });
    }

});