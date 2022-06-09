// Creo una lista predefinita di elementi
var listItems = ['Fare meditazione', 'Colazione', 'Passeggiata'];

// Definisco dove andranno gli elementi della lista
var listElement = document.querySelector('#task-list');

// Trasformo la mia lista in una stringa (testo)
var listItemsAsString = JSON.stringify(listItems);

// se la chiave esiste in localstorage, la carico nel mio array, altrimenti creo la chiave
if (localStorage.listItems) {
    // recupero la lista da local storage e con JSON.parse converto la stringa salvata in array
    var listItems = JSON.parse(localStorage.listItems);
} else {
    // inserisco in localstorage una chiave chiamata listItems e la valorizzo con la mia stringa
    localStorage.listItems = listItemsAsString;
}

var renderItem = function (itemText) {
    // recupero il template inserito con id ...
    var template = document.querySelector('#item-template');
    // in memoria duplico il contenuto del tag template (che contiene li..)
    var clone = template.content.cloneNode(true);
    // inserisco il testo itemText nello span relativo al clone
    clone.querySelector("span").innerText = itemText;

    return clone;
}

// Vengono inseriti dinamicamente i task da listItems

var updateList = function (items) {
    var listElement = document.querySelector('#task-list');
    while (listElement.firstChild) listElement.removeChild(listElement.firstChild);

    items.forEach(function (item) {
        var element = renderItem(item);
        listElement.appendChild(element);
    });

    localStorage.listItems = JSON.stringify(items); // New line added
}

var createNew = function (event) {
    event.preventDefault();

    var newItemElement = document.querySelector('#new-item');
    var newItemValue = newItemElement.value.trim();

    if (!newItemValue) return;

    listItems.push(newItemValue);
    newItemElement.value = '';

    updateList(listItems);
}

var removeItem = function (event) {
    var clickedItemText = event.target.previousElementSibling.innerHTML;

    listItems = listItems.filter(function (itemText) {
        return clickedItemText != itemText;
    });

    updateList(listItems);
}

updateList(listItems);