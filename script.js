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
                        const desc = document.createElement('li');
                        desc.innerText = `${data.desc}`;
                        i = 0;
                        ul.append(desc);
                        li.append(ul);
                    }
                })
                .catch(error => {
                    document.body.append(error.message);
                });
        });
    }

});