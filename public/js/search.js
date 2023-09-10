/*function displayResults(results) {
    const resultsList = document.querySelector('.nav__search-results');
    resultsList.innerHTML = '';
    results.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion.location;
        resultsList.appendChild(listItem);
    });
};

document.querySelector('.nav__search-input').addEventListener('input', function() {
    const query = this.value;
    const resultsList = document.querySelector('.nav__search-results');
    const listItem = document.createElement('li');
    listItem.textContent = query;
    resultsList.appendChild(listItem);
    listItem.addEventListener('click', () => {
        if (query.length >= 3) {
            fetch(`/results?location=${query}`)
                .then(response => response.json())
                .then(data => console.log(data))
        }
    })



    if (query.length > 3) {
        fetch(`/results?q=${query}`)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.log(error));
        }

});

document.querySelector('.nav__search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = this.value;
        window.location.href = `/Sydney/${query}`;
    }
});
*/