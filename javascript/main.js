const URL_POKE = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`;
const URL_POKE_SPECIES = (id) => `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
const URL_POKE_GENDER_FEMALE = `https://pokeapi.co/api/v2/gender/1/`;
const URL_POKE_GENDER_MALE = `https://pokeapi.co/api/v2/gender/2/`;
const URL_POKE_GENDERLESS = `https://pokeapi.co/api/v2/gender/3/`;

let pokeChart;

let poke = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let arrowL = document.getElementById('arrow-left').onclick = () => arrowLeft(data.id);
    let arrowR = document.getElementById('arrow-right').onclick = () => arrowRight(data.id);

    pokeName(data.id);
    pokeImage(data.id);
    pokeType(data.id);
    pokeGraph(data.id);
    pokeDescription(data.id);
    pokeHeight(data.id);
    pokeWeight(data.id);
    pokeSex(data.name);
    pokeCategory(data.id);
    pokeAbility(data.id);
}

let pokeName = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let h1 = document.querySelector('h1');

    h1.innerHTML = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.°${data.id.toString().padStart(3, 0)}`
}

let pokeImage = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let img = document.getElementById('img-poke').src = data.sprites.other["official-artwork"].front_default;

    img.alt = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
}

let pokeType = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let typesPoke = document.getElementsByClassName('types-poke');
    let typePoke = document.getElementsByClassName('type-poke');
    let type = document.getElementById('type');
    let secondTypePoke = document.getElementsByClassName('second-type-poke');
    let secondType = document.getElementById('second-type');

    if(data.types.length == 2){
        typesPoke[0].setAttribute('style', 'grid-template-columns: 1fr 1fr;');
        secondTypePoke[0].style.display = 'grid';
        secondType.setAttribute('style', 'display: grid');
    }else{
        typesPoke[0].setAttribute('style', 'grid-template-columns: 1fr;');
        secondTypePoke[0].style.display = 'none';
        secondType.setAttribute('style', 'display: none');
    }

    let color;
    let text;
    let l;

    if(data.types.length == 1){
        l = 1;
    }else{
        l = 2;
    }

    for(let i = 0; i < l; i++){

        switch(data.types[i].type.name) {
            case "normal":
                color = 'rgba(164, 172, 175, .5)';
                text = "Normal";
            break;

            case "fighting":
                color = 'rgb(213, 103, 35)';
                text = "Lucha";
            break;

            case "flying":
                color = 'rgb(114, 217, 247)';
                text = "Volador";
            break;

            case "poison":
                color = 'rgb(185, 127, 201)';
                text = "Veneno";
            break;

            case "ground":
                color = 'rgb(171, 152, 66)';
                text = "Tierra";
            break;

            case "rock":
                color = 'rgb(163, 140, 33)';
                text = "Roca";
            break;

            case "bug":
                color = 'rgb(114, 159, 63)';
                text = "Bicho";
            break;

            case "ghost":
                color = 'rgb(123, 98, 163)';
                text = "Fantasma";
            break;

            case "steel":
                color = 'rgb(158, 183, 184)';
                text = "Acero";
            break;

            case "fire":
                color = 'rgb(253, 125, 36)';
                text = "Fuego";
            break;

            case "water":
                color = 'rgb(69, 146, 196)';
                text = "Agua";
            break;

            case "grass":
                color = 'rgb(155, 204, 80)';
                text = "Planta";
            break;

            case "electric":
                color = 'rgb(238, 213, 53)';
                text = "Eléctrico";
            break;

            case "psychic":
                color = 'rgb(243, 102, 185)';
                text = "Psíquico";
            break;

            case "ice":
                color = 'rgb(81, 196, 231)';
                text = "Hielo";
            break;

            case "dragon":
                color = 'rgb(241, 110, 87)';
                text = "Dragón";
            break;

            case "dark":
                color = 'rgb(112, 112, 112)';
                text = "Siniestro";
            break;

            case "fairy":
                color = 'rgb(253, 185, 233)';
                text = "Hada";
            break;
        }

        if(i == 0){
            typePoke[0].style.backgroundColor = color;
            typePoke[0].style.border = `1px solid`;
            type.innerHTML = text;
        }

        if(data.types.length == 2){
            secondTypePoke[0].style.backgroundColor = color;
            secondTypePoke[0].style.border = `1px solid`;
            secondType.innerHTML = text;
        }
    }
}

let pokeGraph = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let marksCanvas = document.getElementById('marcks-chart');

    if(pokeChart){
        pokeChart.destroy();
    }

    pokeChart = new Chart(marksCanvas, {
        type: 'radar',
        data: {
            labels: ['Salud', 'Ataque', 'Ataque Especial', 'Velocidad', 'Defensa Especial', 'Defensa'],
            datasets: [{
                data: [`${data.stats[0].base_stat}`, `${data.stats[1].base_stat}`, `${data.stats[3].base_stat}`, `${data.stats[5].base_stat}`, `${data.stats[4].base_stat}`, `${data.stats[2].base_stat}`],
                backgroundColor: [
                    'rgba(198, 243, 133, .4)',
                ],
                borderColor: [
                    'rgba(122, 198, 12, .4)',
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(122, 198, 12, .4)'
                    },
                    ticks: {
                        stepSize: 20,
                        display: false
                    },
                    grid: {
                        color: 'rgba(122, 198, 12, .4)'
                    },
                    pointLabels: {
                        color: 'rgb(0, 0, 0)',
                        font: {
                            family: 'Times New Roman',
                            size: 13,
                            weight: 'bold'
                        },
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                }
            }
        }
    });
}

let arrowLeft = async (id) => {

    poke(id -= 1);
    pokeGraph(id -= 1);
}

let arrowRight = async (id) => {

    poke(id += 1);
    pokeGraph(id += 1);
}

let pokeDescription = async (id) => {
    let response = await fetch(URL_POKE_SPECIES(id));
    let data = await response.json();

    let description = document.getElementById('description');
    let index = data.flavor_text_entries.findIndex(info => info.language.name === 'es');

    description.innerHTML = data.flavor_text_entries[index].flavor_text;
}

let pokeHeight = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let height = document.getElementById('height').innerHTML = `${data.height / 10} m`;
}

let pokeWeight = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let weight = document.getElementById('weight').innerHTML = `${data.weight / 10} Kg`;
}

let pokeSex = async (name) => {
    let responseFemale = await fetch(URL_POKE_GENDER_FEMALE);
    let dataFemale = await responseFemale.json();
    let responseMale = await fetch(URL_POKE_GENDER_MALE);
    let dataMale = await responseMale.json();
    let responseGenderless = await fetch(URL_POKE_GENDERLESS);
    let dataGenderless = await responseGenderless.json();

    let indexFemale = dataFemale.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
    let indexMale = dataMale.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
    let indexGenderless = dataGenderless.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);

    let sex = document.getElementById('sex');
    let icon1 = document.getElementById('icon1');
    let icon2 = document.getElementById('icon2');
    let icon3 = document.getElementById('icon3');
    let unknown = document.getElementById('unknown');

    sex.appendChild(unknown);

    icon1.style.display = 'inline';
    icon2.style.display = 'inline';
    icon3.style.display = 'inline';

    if(indexMale == -1){
        icon2.src = '../icons/female.svg';
        icon1.style.display = 'none';
        icon3.style.display = 'none';
        unknown.style.display = 'none';
        sex.style.gridTemplateColumns = '1fr';
    }else{
        icon1.src = '../icons/male.svg';
        icon2.src = '../icons/female.svg';
        icon3.style.display = 'none';
        unknown.style.display = 'none';
    }

    if(indexFemale == -1){
        icon1.src = '../icons/male.svg';
        icon2.style.display = 'none';
        icon3.style.display = 'none';
        unknown.style.display = 'none';
        sex.style.gridTemplateColumns = '1fr';
    }else{
        icon1.src = '../icons/male.svg';
        icon2.src = '../icons/female.svg';
        icon3.style.display = 'none';
        unknown.style.display = 'none';
    }

    if(indexGenderless != -1){
        icon3.style.display = 'inline';
        icon3.src = '../icons/genderless.svg';
        icon1.style.display = 'none';
        icon2.style.display = 'none';
        unknown.style.display = 'none';
        sex.style.gridTemplateColumns = '1fr';
    }

    if(indexFemale == -1 && indexMale == -1 && indexGenderless == -1){
        unknown.style.display = 'inline';
        icon1.style.display = 'none';
        icon2.style.display = 'none';
        icon3.style.display = 'none';
        unknown.innerHTML = '???';
        sex.style.gridTemplateColumns = '1fr';
    }
}

let pokeCategory = async (id) => {
    let response = await fetch(URL_POKE_SPECIES(id));
    let data = await response.json();

    let category = document.getElementById('category');

    let index = data.genera.findIndex(info => info.language.name === 'es');

    let string = data.genera[index].genus;
    let newString;

    if(string.includes('Pokémon')){
        newString = string.slice(8);
    }

    category.innerHTML = newString;
}

let pokeAbility = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    console.log(data.abilities.length);

    let url1, url2, url3;

    if(data.abilities.length == 3){
        url1 = data.abilities[0].ability.url;
        url2 = data.abilities[1].ability.url;
        url3 = data.abilities[2].ability.url;
    }else if(data.abilities.length == 2){
        url1 = data.abilities[0].ability.url;
        url2 = data.abilities[1].ability.url;
    }else if(data.abilities.length == 1){
        url1 = data.abilities[0].ability.url;
    }

    let responseUrl1, dataUrl1, responseUrl2, dataUrl2, responseUrl3, dataUrl3;

    if(data.abilities.length == 3){
        responseUrl1 = await fetch(url1);
        dataUrl1 = await responseUrl1.json();
        responseUrl2 = await fetch(url2);
        dataUrl2 = await responseUrl2.json();
        responseUrl3 = await fetch(url3);
        dataUrl3 = await responseUrl3.json();
    }else if(data.abilities.length == 2){
        responseUrl1 = await fetch(url1);
        dataUrl1 = await responseUrl1.json();
        responseUrl2 = await fetch(url2);
        dataUrl2 = await responseUrl2.json();
    }else if(data.abilities.length == 1){
        responseUrl1 = await fetch(url1);
        dataUrl1 = await responseUrl1.json();
    }

    let indexUrl1, indexUrl2, indexUrl3;

    if(data.abilities.length == 3){
        indexUrl1 = dataUrl1.names.findIndex(info => info.language.name === 'es');
        indexUrl2 = dataUrl2.names.findIndex(info => info.language.name === 'es');
        indexUrl3 = dataUrl3.names.findIndex(info => info.language.name === 'es');
    }else if(data.abilities.length == 2){
        indexUrl1 = dataUrl1.names.findIndex(info => info.language.name === 'es');
        indexUrl2 = dataUrl2.names.findIndex(info => info.language.name === 'es');
    }else if(data.abilities.length == 1){
        indexUrl1 = dataUrl1.names.findIndex(info => info.language.name === 'es');
    }

    let abilityClass = document.getElementById('ability-container');
    let ability = document.getElementById('ability');
    let pokeAbility1 = document.getElementById('ability1');
    let pokeAbility2 = document.getElementById('ability2');
    let pokeAbility3 = document.getElementById('ability3');

    ability.appendChild(pokeAbility1);
    ability.appendChild(pokeAbility2);
    ability.appendChild(pokeAbility3);

    if(data.abilities.length == 3){
        pokeAbility1.innerHTML = dataUrl1.names[indexUrl1].name;
        pokeAbility2.innerHTML = dataUrl2.names[indexUrl2].name;
        pokeAbility3.innerHTML = dataUrl3.names[indexUrl3].name;
    }else if(data.abilities.length == 2){
        pokeAbility1.innerHTML = dataUrl1.names[indexUrl1].name;
        pokeAbility2.innerHTML = dataUrl2.names[indexUrl2].name;
        pokeAbility3.style.display = 'none';
        ability.style.gridTemplateColumns = '1fr 1fr';
        abilityClass.style.width = '33vw';
    }else if(data.abilities.length == 1){
        pokeAbility1.innerHTML = dataUrl1.names[indexUrl1].name;
        pokeAbility2.style.display = 'none';
        pokeAbility3.style.display = 'none';
        ability.style.gridTemplateColumns = '1fr';
        abilityClass.style.width = '20vw';
    }
}

let pokeRandom = async () => {
    let randomNumber = Math.floor((Math.random() * (898 - 1 + 1)) + 1);

    poke(randomNumber);
}

pokeRandom();