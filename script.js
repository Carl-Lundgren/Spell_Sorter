document.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector('#spell-search-form');
    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const spellList = document.querySelector('#spell-list');
        const input = document.querySelector('#spell-searched');
        spellList.innerHTML = '';

        fetch (`https://www.dnd5eapi.co/api/spells/?name=${input.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.results);
                for (const key in data.results) {
                    console.log(data.results[key]);
                    const li = document.createElement('li');
                    li.innerText = `${data.results[key].name}`;
                    spellList.append(li);
                }
            })
            .catch(error => {
                document.body.append(error.message);
            });
      });
});