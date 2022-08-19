let iType1 = (data, type, text, i, element) => {
    type.style.display = 'grid';

    if(i == 0){
        type.style.backgroundColor = pokeTypeColor(element.name);

        position = data.names.findIndex(info => info.language.name === 'es');
        text.innerHTML = data.names[position].name;
    }
}

let iType2 = (data, type, text, i, element) => {
    type.style.display = 'grid';

    if(i == 1){
        type.style.backgroundColor = pokeTypeColor(element.name);

        position = data.names.findIndex(info => info.language.name === 'es');
        text.innerHTML = data.names[position].name;
    }
}

let iType3 = (data, type, text, i, element) => {
    type.style.display = 'grid';

    if(i == 2){
        type.style.backgroundColor = pokeTypeColor(element.name);

        position = data.names.findIndex(info => info.language.name === 'es');
        text.innerHTML = data.names[position].name;
    }
}