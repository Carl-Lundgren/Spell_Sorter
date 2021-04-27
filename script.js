document.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector('#spell-search-form');
    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const spellList = document.querySelector('#spell-list');
        const input = document.querySelector('#spell-searched');

        fetch (`https://www.dnd5eapi.co/api/spells/?name=${input.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (const key in data) {
                    const li = document.createElement('li');
                    li.innerText = `${data.name}`
                    spellList.append(li);
                }
            })
            .catch(error => {
                document.body.append(error.message);
            });
      });
});