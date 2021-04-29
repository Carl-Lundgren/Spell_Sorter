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