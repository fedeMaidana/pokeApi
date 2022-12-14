var keys = {
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39
};

let pokeTypeColor = (name) => {
    let typeColor = {
        normal: 'rgba(164, 172, 175, .5)',
        fighting: 'rgb(213, 103, 35)',
        flying: 'rgb(114, 217, 247)',
        poison: 'rgb(185, 127, 201)',
        ground: 'rgb(171, 152, 66)',
        rock: 'rgb(163, 140, 33)',
        bug: 'rgb(114, 159, 63)',
        ghost: 'rgb(123, 98, 163)',
        steel: 'rgb(158, 183, 184)',
        fire: 'rgb(253, 125, 36)',
        water: 'rgb(69, 146, 196)',
        grass: 'rgb(155, 204, 80)',
        electric: 'rgb(238, 213, 53)',
        psychic: 'rgb(243, 102, 185)',
        ice: 'rgb(81, 196, 231)',
        dragon: 'rgb(241, 110, 87)',
        dark: 'rgb(112, 112, 112)',
        fairy: 'rgb(253, 185, 233)'
    }

    let color;

    Object.keys(typeColor).forEach((element, i) => {
        if(Object.keys(typeColor)[i] === name){
            color =  typeColor[name];
        }
    });

    return color;
}

let getTypeName = async (x) => {
    let {data} = await api(`/type/${x}`);
    const pos = data.names.findIndex(info => info.language.name === 'es');

    return data.names[pos].name;
}

let createTypes = (name, spanishName) => {
    let container = document.createElement('div');
    let text = document.createElement('p');

    container.classList.add('main__poke__types__type');
    container.style.backgroundColor = pokeTypeColor(name);

    text.classList.add('main__poke__types__text');
    text.innerHTML = spanishName;

    container.append(text);

    return container;
}

let createAbilities = (name) => {
    let text = document.createElement('p');

    text.classList.add('secondary__info__container--text', 'abilities');
    text.innerHTML = name;

    return text;
}

let createQualities = ({name, orgName}, value) => {
    let container = document.createElement("div");
    let text = document.createElement("p");

    container.classList.add("secondary__qualities__types--general")
    container.style.display = "grid";
    container.style.width = "calc(110px - 20px)";

    if(orgName == "none"){
        container.style.backgroundColor = "rgb(0,0,0)";
        container.style.color = "#fff";
    }else{
        container.style.backgroundColor = pokeTypeColor(orgName)
    }

    text.classList.add("secondary__qualities__types--text")
    text.innerHTML = name;

    if(value > 1){
        text.style.gridTemplateColumns = '2fr 1fr';
    }

    container.append(text);

    return container;
}