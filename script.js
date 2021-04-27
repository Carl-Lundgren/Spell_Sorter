document.addEventListener("DOMContentLoaded", () => {

    const submit = document.querySelector('#spell-search-form');
    const spellList = document.querySelector('#spell-list');

    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = document.querySelector('#spell-searched');
        spellList.innerHTML = '';

        fetch (`https://www.dnd5eapi.co/api/spells/?name=${input.value}`)
            .then(response => response.json())
            .then(data => {
                for (const key in data.results) {
                    const li = document.createElement('li');
                    li.innerText = `${data.results[key].name}`;
                    spellList.append(li);
                }
            })
            .catch(error => {
                document.body.append(error.message);
            });
      });

    spellList.li.addEventListener('click', (e) => {
        fetch (`https://www.dnd5eapi.co/api/spells/${li.value.split(" ").join("-").toLowerCase()}`)
            .then(response => response.json())
            .then(data => {
                const ul = document.createElement('ul');
                const desc = document.createElement('li');
                desc.innerText = `${data.desc}`;
                ull.append(desc);
                li.append(ul);
            })
            .catch(error => {
                document.body.append(error.message);
            });
      });

});