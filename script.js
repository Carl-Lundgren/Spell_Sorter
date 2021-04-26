document.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector('.spell-search-form');
    submit.addEventListener('submit', (e) => {
        e.preventDefault();
        const li = document.createElement('li');
        const spellList = document.querySelector('#spell-list')
        
        fetch (`https://www.dnd5eapi.co/api/spells/${}`, )
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                document.body.append(error.message);
            });
      });
});