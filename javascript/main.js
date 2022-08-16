const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

const URL_POKE = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`;
const URL_POKE_SPECIES = (id) => `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
const URL_POKE_GENDER_FEMALE = `https://pokeapi.co/api/v2/gender/1/`;
const URL_POKE_GENDER_MALE = `https://pokeapi.co/api/v2/gender/2/`;
const URL_POKE_GENDERLESS = `https://pokeapi.co/api/v2/gender/3/`;
const URL_POKE_TYPES = (name) => `https://pokeapi.co/api/v2/type/${name}`;

let pokeChart, randomN;

document.getElementById('arrow-left').onclick = () => {poke(randomN -= 1)};
document.getElementById('arrow-right').onclick = () =>{poke(randomN += 1)};

let poke = async (id) => {
    /*let response = await fetch(URL_POKE(id));
    let data = await response.json();*/

    let {data} = await api(`/pokemon/${id}/`);

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
    pokeEndurance(data.id);
    pokeWeakness(data.id);
}

let pokeName = async (id) => {
    let {data} = await api(`/pokemon/${id}/`);

    let h1 = document.querySelector('h1');

    h1.innerHTML = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.°${data.id.toString().padStart(3, 0)}`
}

let pokeImage = async (id) => {
    let {data} = await api(`/pokemon/${id}/`);

    let img = document.getElementById('img-poke').src = data.sprites.other["official-artwork"].front_default;

    img.alt = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
}

let pokeTypeColor = (name) => {
    switch(name) {
        case "normal":
            color = 'rgba(164, 172, 175, .5)';
        break;

        case "fighting":
            color = 'rgb(213, 103, 35)';
        break;

        case "flying":
            color = 'rgb(114, 217, 247)';
        break;

        case "poison":
            color = 'rgb(185, 127, 201)';
        break;

        case "ground":
            color = 'rgb(171, 152, 66)';
        break;

        case "rock":
            color = 'rgb(163, 140, 33)';
        break;

        case "bug":
            color = 'rgb(114, 159, 63)';
        break;

        case "ghost":
            color = 'rgb(123, 98, 163)';
        break;

        case "steel":
            color = 'rgb(158, 183, 184)';
        break;

        case "fire":
            color = 'rgb(253, 125, 36)';
        break;

        case "water":
            color = 'rgb(69, 146, 196)';
        break;

        case "grass":
            color = 'rgb(155, 204, 80)';
        break;

        case "electric":
            color = 'rgb(238, 213, 53)';
        break;

        case "psychic":
            color = 'rgb(243, 102, 185)';
        break;

        case "ice":
            color = 'rgb(81, 196, 231)';
        break;

        case "dragon":
            color = 'rgb(241, 110, 87)';
        break;

        case "dark":
            color = 'rgb(112, 112, 112)';
        break;

        case "fairy":
            color = 'rgb(253, 185, 233)';
        break;
    }

    return color;
}

let pokeType = async (id) => {
    let {data} = await api(`/pokemon/${id}/`);

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
    let {data} = await api(`/pokemon/${id}/`);

    let marksCanvas = document.getElementById('marcks-chart');

    if(pokeChart){
        pokeChart.destroy();
    }

    pokeChart = new Chart(marksCanvas, {
        type: 'radar',
        data: {
            labels: ['Salud', 'Ataque', 'At. Esp.', 'Velocidad', 'Def. Esp.', 'Defensa'],
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

let pokeDescription = async (id) => {
    let {data} = await api(`/pokemon-species/${id}/`);

    let description = document.getElementById('description');
    let index = data.flavor_text_entries.findIndex(info => info.language.name === 'es');

    description.innerHTML = data.flavor_text_entries[index].flavor_text;
}

let pokeHeight = async (id) => {
    let {data} = await api(`/pokemon/${id}/`);

    let height = document.getElementById('height').innerHTML = `${data.height / 10} m`;
}

let pokeWeight = async (id) => {
    let {data} = await api(`/pokemon/${id}/`);

    let weight = document.getElementById('weight').innerHTML = `${data.weight / 10} Kg`;
}

let pokeSex = async (name) => {
    let dataFemale = await api(`/gender/1/`);
    let dataMale = await api(`/gender/2/`);
    let dataGenderless = await api(`/gender/3/`);

    let indexFemale = dataFemale.data.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
    let indexMale = dataMale.data.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
    let indexGenderless = dataGenderless.data.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);

    let sex = document.getElementById('sex');
    let icon1 = document.getElementById('icon1');
    let icon2 = document.getElementById('icon2');
    let unknown1 = document.getElementById('unknown1');
    let unknown2 = document.getElementById('unknown2');

    sex.appendChild(unknown2);

    sex.style.gridTemplateColumns = '1fr 1fr';

    icon1.style.display = 'inline';
    icon2.style.display = 'inline';

    if(indexMale == -1){
        sex.style.gridTemplateColumns = '1fr';
        icon1.style.display = 'none';
        unknown1.style.display = 'none';
        unknown2.style.display = 'none';
        icon2.src = '../icons/female.svg';
    }else{
        unknown1.style.display = 'none';
        unknown2.style.display = 'none';
        icon1.src = '../icons/male.svg';
        icon2.src = '../icons/female.svg';
    }

    if(indexFemale == -1){
        sex.style.gridTemplateColumns = '1fr';
        icon2.style.display = 'none';
        unknown1.style.display = 'none';
        unknown2.style.display = 'none';
        icon1.src = '../icons/male.svg';
    }else{
        unknown1.style.display = 'none';
        unknown2.style.display = 'none';
        icon1.src = '../icons/male.svg';
        icon2.src = '../icons/female.svg';
    }

    if(indexGenderless != -1){
        sex.style.gridTemplateColumns = '1fr';
        icon1.style.display = 'none';
        icon2.style.display = 'none';
        unknown2.style.display = 'none';
        unknown1.style.display = 'inline';
        unknown1.innerHTML = 'Desconocido';
    }

    if(indexFemale == -1 && indexMale == -1 && indexGenderless == -1){
        sex.style.gridTemplateColumns = '1fr';
        icon1.style.display = 'none';
        icon2.style.display = 'none';
        unknown1.style.display = 'none';
        unknown2.style.display = 'inline';
        unknown2.innerHTML = '???';
    }
}

let pokeCategory = async (id) => {
    let {data} = await api(`/pokemon-species/${id}/`);

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
    let {data} = await api(`/pokemon/${id}/`);

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

    let dataUrl1, dataUrl2, dataUrl3;

    if(data.abilities.length == 3){
        dataUrl1 = await axios.get(url1);
        dataUrl2 = await axios.get(url2);
        dataUrl3 = await axios.get(url3);
    }else if(data.abilities.length == 2){
        dataUrl1 = await axios.get(url1);
        dataUrl2 = await axios.get(url2);
    }else if(data.abilities.length == 1){
        dataUrl1 = await axios.get(url1);
    }

    let indexUrl1, indexUrl2, indexUrl3;

    if(data.abilities.length == 3){
        indexUrl1 = dataUrl1.data.names.findIndex(info => info.language.name === 'es');
        indexUrl2 = dataUrl2.data.names.findIndex(info => info.language.name === 'es');
        indexUrl3 = dataUrl3.data.names.findIndex(info => info.language.name === 'es');
    }else if(data.abilities.length == 2){
        indexUrl1 = dataUrl1.data.names.findIndex(info => info.language.name === 'es');
        indexUrl2 = dataUrl2.data.names.findIndex(info => info.language.name === 'es');
    }else if(data.abilities.length == 1){
        indexUrl1 = dataUrl1.data.names.findIndex(info => info.language.name === 'es');
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
        ability.style.gridTemplateColumns = '1fr 1fr 1fr';
        pokeAbility1.style.display = 'grid';
        pokeAbility2.style.display = 'grid';
        pokeAbility3.style.display = 'grid';
        abilityClass.style.width = '43vw';
        pokeAbility1.innerHTML = dataUrl1.data.names[indexUrl1].name;
        pokeAbility2.innerHTML = dataUrl2.data.names[indexUrl2].name;
        pokeAbility3.innerHTML = dataUrl3.data.names[indexUrl3].name;
    }else if(data.abilities.length == 2){
        ability.style.gridTemplateColumns = '1fr 1fr';
        pokeAbility1.style.display = 'grid';
        pokeAbility2.style.display = 'grid';
        pokeAbility3.style.display = 'none';
        abilityClass.style.width = '33vw';
        pokeAbility1.innerHTML = dataUrl1.data.names[indexUrl1].name;
        pokeAbility2.innerHTML = dataUrl2.data.names[indexUrl2].name;
    }else if(data.abilities.length == 1){
        ability.style.gridTemplateColumns = '1fr';
        pokeAbility1.style.display = 'grid';
        pokeAbility2.style.display = 'none';
        pokeAbility3.style.display = 'none';
        abilityClass.style.width = '20vw';
        pokeAbility1.innerHTML = dataUrl1.data.names[indexUrl1].name;
    }
}

let pokeEndurance = async (id) => {
    let {data} = await api(`/pokemon/${id}/`);

    let typeUrl1, typeUrl2;

    if(data.types.length == 1){
        typeUrl1 = data.types[0].type.url;
    }else if(data.types.length == 2){
        typeUrl1 = data.types[0].type.url;
        typeUrl2 = data.types[1].type.url;
    }

    let dataUrl1, dataUrl2;

    let weakness1, weakness2, resistance1, resistance2;

    if(data.types.length == 1){
        dataUrl1 = await axios.get(typeUrl1);

        resistance1 = dataUrl1.data.damage_relations.half_damage_from;
        weakness1 = dataUrl1.data.damage_relations.double_damage_from;

    }else if(data.types.length == 2){
        dataUrl1 = await axios.get(typeUrl1);
        dataUrl2 = await axios.get(typeUrl2);

        weakness1 = dataUrl1.data.damage_relations.double_damage_from;
        weakness2 = dataUrl2.data.damage_relations.double_damage_from;
        resistance1 = dataUrl1.data.damage_relations.half_damage_from;
        resistance2 = dataUrl2.data.damage_relations.half_damage_from;
    }

    let wt1, wt2, rt1, rt2, pos, countR1 = 0, countR2 = 0;

    let enduranceContainer = document.getElementById('e-c');
    let typesContainer = document.getElementById('types-e-container');
    let type1 = document.getElementById('e-type-1');
    let text1 = document.getElementById('e-text-1');
    let type2 = document.getElementById('e-type-2');
    let text2 = document.getElementById('e-text-2');
    let type3 = document.getElementById('e-type-3');
    let text3 = document.getElementById('e-text-3');
    let type4 = document.getElementById('e-type-4');
    let text4 = document.getElementById('e-text-4');
    let type5 = document.getElementById('e-type-5');
    let text5 = document.getElementById('e-text-5');
    let type6 = document.getElementById('e-type-6');
    let text6 = document.getElementById('e-text-6');
    let type7 = document.getElementById('e-type-7');
    let text7 = document.getElementById('e-text-7');
    let type8 = document.getElementById('e-type-8');
    let text8 = document.getElementById('e-text-8');
    let type9 = document.getElementById('e-type-9');
    let text9 = document.getElementById('e-text-9');
    let type10 = document.getElementById('e-type-10');
    let text10 = document.getElementById('e-text-10');
    let type11 = document.getElementById('e-type-11');
    let text11 = document.getElementById('e-text-11');

    if(data.types.length == 1){
        rt1 = resistance1.slice();

        let position;

        let urlType = async (x) => {
            let dataType = await api(`/type/${x}`);

            return dataType.data;
        };

        if(data.types[0].type.name == 'normal'){
            typesContainer.style.gridTemplate = '1fr / 1fr';
            type1.style.display = 'grid';
            type1.style.alignSelf = 'center';
            type1.style.border = 'none';
            type1.style.backgroundColor = 'transparent';

            text1.innerHTML = 'n/a';

            type2.style.display = 'none';
            type3.style.display = 'none';
            type4.style.display = 'none';
            type5.style.display = 'none';
            type6.style.display = 'none';
            type7.style.display = 'none';
            type8.style.display = 'none';
            type9.style.display = 'none';
            type10.style.display = 'none';
            type11.style.display = 'none';
        }else{
            type1.style.border = '1px solid';
        }

        rt1.forEach(async(element, i) => {
            let dataType = await urlType(element.name);

            if(rt1.length == 1){
                typesContainer.style.gridTemplate = '1fr / 1fr';
                type1.style.display = 'grid';
                type1.style.alignSelf = 'center';
                type1.style.border = '1px solid';
                type2.style.display = 'none';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                type1.style.backgroundColor = pokeTypeColor(element.name);

                position = dataType.names.findIndex(info => info.language.name === 'es');
                text1.innerHTML = dataType.names[position].name;
            }else if(rt1.length == 2){
                typesContainer.style.gridTemplate = '1fr / 1fr 1fr';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(dataType, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                eType2(dataType, type2, text2, i, element);
                type2.style.alignSelf = 'center';
            }else if(rt1.length == 3){
                typesContainer.style.gridTemplate = '1fr / repeat(3, 1fr)';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(dataType, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                eType2(dataType, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                eType3(dataType, type3, text3, i, element);
                type3.style.alignSelf = 'center';
            }else if(rt1.length == 4){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(dataType, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                eType2(dataType, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                eType3(dataType, type3, text3, i, element);
                type3.style.alignSelf = 'center';
                eType4(dataType, type4, text4, i, element);
                type4.style.alignSelf = 'center';
            }else if(rt1.length == 5){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(dataType, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                eType2(dataType, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                eType3(dataType, type3, text3, i, element);
                type3.style.alignSelf = 'center';
                eType4_5(dataType, type4, text4, i, element);
                type4.style.alignSelf = 'center';
                eType5(dataType, type5, text5, i, element);
                type5.style.alignSelf = 'center';
            }else if(rt1.length == 6){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(dataType, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                eType2(dataType, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                eType3(dataType, type3, text3, i, element);
                type3.style.alignSelf = 'center';
                eType4_4(dataType, type4, text4, i, element);
                type4.style.alignSelf = 'center';
                eType5_5(dataType, type5, text5, i, element);
                type5.style.alignSelf = 'center';
                eType6_6(dataType, type6, text6, i, element);
                type6.style.alignSelf = 'center';
            }else if(rt1.length == 10){
                enduranceContainer.style.paddingBottom = '5px';
                typesContainer.style.gridTemplate = 'repeat(4, 1fr) / repeat(3, 1fr)';
                typesContainer.style.rowGap = '5px';
                type11.style.display = 'none';

                eType1(dataType, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                eType2(dataType, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                eType3(dataType, type3, text3, i, element);
                type3.style.alignSelf = 'center';
                eType4_10(dataType, type4, text4, i, element);
                type4.style.alignSelf = 'center';
                eType5_10(dataType, type5, text5, i, element);
                type5.style.alignSelf = 'center';
                eType6_10(dataType, type6, text6, i, element);
                type6.style.alignSelf = 'center';
                eType7(dataType, type7, text7, i, element);
                type7.style.alignSelf = 'center';
                eType8(dataType, type8, text8, i, element);
                type8.style.alignSelf = 'center';
                eType9(dataType, type9, text9, i, element);
                type9.style.alignSelf = 'center';
                eType10_10(dataType, type10, text10, i, element);
                type10.style.alignSelf = 'center';
            }
        });

    }else if(data.types.length == 2){
        wt1 = weakness1.slice();
        wt2 = weakness2.slice();
        rt1 = resistance1.slice();
        rt2 = resistance2.slice();

        rt1.forEach(elementRT1 => {
            wt2.forEach(elementWT2 => {
                if(elementRT1.name == elementWT2.name){
                    countR1 += 1;
                }
            });
        });

        for(let i = 0; i < countR1; i++){
            rt1.forEach(elementRT1 => {
                wt2.forEach(elementWT2 => {
                    if(elementRT1.name == elementWT2.name){
                        pos = rt1.findIndex(element => element.name == elementRT1.name);
                        rt1.splice(pos, 1);
                    }
                });
            });
        }

        dataUrl1.data.damage_relations.no_damage_from.forEach(element => {
            let name = element.name;

            rt2.forEach(elementRT2 => {
                if(elementRT2.name == name){
                    pos = rt2.findIndex(element => element.name == elementRT2.name);
                    rt2.splice(pos, 1);
                }
            });
        });

        rt2.forEach(elementRT2 => {
            wt1.forEach(elementWT1 => {
                if(elementRT2.name == elementWT1.name){
                    countR2 += 1;
                }
            });
        });

        for(let i = 0; i < countR2; i++){
            rt2.forEach(elementRT2 => {
                wt1.forEach(elementWT1 => {
                    if(elementRT2.name == elementWT1.name){
                        pos = rt2.findIndex(element => element.name == elementRT2.name);
                        rt2.splice(pos, 1);
                    }
                });
            });
        }

        dataUrl2.data.damage_relations.no_damage_from.forEach(element => {
            let name = element.name;

            rt1.forEach(elementRT1 => {
                if(elementRT1.name == name){
                    pos = rt1.findIndex(element => element.name == elementRT1.name);
                    rt1.splice(pos, 1);
                }
            });
        });

        enduranceAll = rt1.concat(rt2);

        let uniqs = enduranceAll.slice();

        enduranceAll.forEach(element1 => {
            let count = 0;

            uniqs.forEach(element2 => {
                if(element1.name == element2.name){
                    count += 1;

                    if(count == 2){
                        pos = uniqs.findIndex(element => element.name == element1.name);
                        uniqs.splice(pos, 1);
                    }
                }
            });
        });

        let position;

        let urlType = async (x) => {
            let dataType = await api(`/type/${x}`);

            return dataType.data;
        };

        uniqs.forEach(async(element, i) => {
            let data = await urlType(element.name);

            typesContainer.style.alignItems = 'center';

            if(uniqs.length == 1){
                typesContainer.style.gridTemplate = '1fr / 1fr';
                type1.style.display = 'grid';
                type2.style.display = 'none';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                type1.style.backgroundColor = pokeTypeColor(element.name);

                position = data.names.findIndex(info => info.language.name === 'es');
                text1.innerHTML = data.names[position].name;
            }else if(uniqs.length == 2){
                typesContainer.style.gridTemplate = '1fr / 1fr 1fr';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
            }else if(uniqs.length == 3){
                typesContainer.style.gridTemplate = '1fr / repeat(3, 1fr)';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
            }else if(uniqs.length == 4){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4(data, type4, text4, i, element);
            }else if(uniqs.length == 5){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type6.style.display = 'none';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4_5(data, type4, text4, i, element);
                eType5(data, type5, text5, i, element);
            }else if(uniqs.length == 6){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type7.style.display = 'none';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4_4(data, type4, text4, i, element);
                eType5_5(data, type5, text5, i, element);
                eType6_6(data, type6, text6, i, element);
            }else if(uniqs.length == 7){
                typesContainer.style.gridTemplate = 'repeat(3, 1fr) / repeat(3, 1fr)';
                type8.style.display = 'none';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4_7(data, type4, text4, i, element);
                eType5_7(data, type5, text5, i, element);
                eType6_7(data, type6, text6, i, element);
                eType7_7(data, type7, text7, i, element);
            }else if(uniqs.length == 8){
                typesContainer.style.gridTemplate = 'repeat(3, 1fr) / repeat(3, 1fr)';
                type9.style.display = 'none';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4_9(data, type4, text4, i, element);
                eType5_9(data, type5, text5, i, element);
                eType6_8(data, type6, text6, i, element);
                eType7_8(data, type7, text7, i, element);
                eType8_8(data, type8, text8, i, element);
            }else if(uniqs.length == 9){
                typesContainer.style.gridTemplate = 'repeat(3, 1fr) / repeat(3, 1fr)';
                type10.style.display = 'none';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4_9(data, type4, text4, i, element);
                eType5_9(data, type5, text5, i, element);
                eType6_9(data, type6, text6, i, element);
                eType7(data, type7, text7, i, element);
                eType8(data, type8, text8, i, element);
                eType9(data, type9, text9, i, element);
            }else if(uniqs.length == 10){
                typesContainer.style.gridTemplate = 'repeat(4, 1fr) / repeat(3, 1fr)';
                type11.style.display = 'none';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4_10(data, type4, text4, i, element);
                eType5_10(data, type5, text5, i, element);
                eType6_10(data, type6, text6, i, element);
                eType7(data, type7, text7, i, element);
                eType8(data, type8, text8, i, element);
                eType9(data, type9, text9, i, element);
                eType10_10(data, type10, text10, i, element);
            }else if(uniqs.length == 11){
                typesContainer.style.gridTemplate = 'repeat(4, 1fr) / repeat(3, 1fr)';

                eType1(data, type1, text1, i, element);
                eType2(data, type2, text2, i, element);
                eType3(data, type3, text3, i, element);
                eType4_9(data, type4, text4, i, element);
                eType5_9(data, type5, text5, i, element);
                eType6_9(data, type6, text6, i, element);
                eType7(data, type7, text7, i, element);
                eType8(data, type8, text8, i, element);
                eType9(data, type9, text9, i, element);
                eType10_11(data, type10, text10, i, element);
                eType11(data, type11, text11, i, element);
            }
        });
    }
}

let pokeWeakness = async (id) => {
    let {data} = await api(`/pokemon/${id}/`);

    let typeUrl1, typeUrl2;

    if(data.types.length == 1){
        typeUrl1 = data.types[0].type.url;
    }else if(data.types.length == 2){
        typeUrl1 = data.types[0].type.url;
        typeUrl2 = data.types[1].type.url;
    }

    let responseUrl1, dataUrl1, responseUrl2, dataUrl2;

    let weakness1, weakness2, resistance1, resistance2;

    if(data.types.length == 1){
        dataUrl1 = await axios.get(typeUrl1);

        weakness1 = dataUrl1.data.damage_relations.double_damage_from;
        resistance1 = dataUrl1.data.damage_relations.half_damage_from;

    }else if(data.types.length == 2){
        dataUrl1 = await axios.get(typeUrl1);
        dataUrl2 = await axios.get(typeUrl2);

        weakness1 = dataUrl1.data.damage_relations.double_damage_from;
        weakness2 = dataUrl2.data.damage_relations.double_damage_from;
        resistance1 = dataUrl1.data.damage_relations.half_damage_from;
        resistance2 = dataUrl2.data.damage_relations.half_damage_from;
    }

    let wt1, wt2, rt1, rt2, pos, countW1 = 0, countW2 = 0;

    let typesContainer = document.getElementById('types-w-container');
    let type1 = document.getElementById('w-type-1');
    let text1 = document.getElementById('w-text-1');
    let type2 = document.getElementById('w-type-2');
    let text2 = document.getElementById('w-text-2');
    let type3 = document.getElementById('w-type-3');
    let text3 = document.getElementById('w-text-3');
    let type4 = document.getElementById('w-type-4');
    let text4 = document.getElementById('w-text-4');
    let type5 = document.getElementById('w-type-5');
    let text5 = document.getElementById('w-text-5');
    let type6 = document.getElementById('w-type-6');
    let text6 = document.getElementById('w-text-6');
    let type7 = document.getElementById('w-type-7');
    let text7 = document.getElementById('w-text-7');

    if(data.types.length == 1){
        wt1 = weakness1.slice();

        let position;

        let urlType = async (x) => {
            let dataType = await api(`/type/${x}`);

            return dataType.data;
        };

        wt1.forEach(async(element, i) => {
            let data = await urlType(element.name);

            if(wt1.length == 1){
                typesContainer.style.gridTemplate = '1fr / 1fr';
                type1.style.display = 'grid';
                type1.style.alignSelf = 'center';
                type2.style.display = 'none';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                type1.style.backgroundColor = pokeTypeColor(element.name);

                position = data.names.findIndex(info => info.language.name === 'es');
                text1.innerHTML = data.names[position].name;
            }else if(wt1.length == 2){
                typesContainer.style.gridTemplate = '1fr / 1fr 1fr';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                wType2(data, type2, text2, i, element);
                type2.style.alignSelf = 'center';
            }else if(wt1.length == 3){
                typesContainer.style.gridTemplate = '1fr / repeat(3, 1fr)';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                wType2(data, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                wType3(data, type3, text3, i, element);
                type3.style.alignSelf = 'center';
            }else if(wt1.length == 4){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                wType2(data, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                wType3(data, type3, text3, i, element);
                type3.style.alignSelf = 'center';
                wType4(data, type4, text4, i, element);
                type4.style.alignSelf = 'center';
            }else if(wt1.length == 5){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                type1.style.alignSelf = 'center';
                wType2(data, type2, text2, i, element);
                type2.style.alignSelf = 'center';
                wType3(data, type3, text3, i, element);
                type3.style.alignSelf = 'center';
                wType4_5(data, type4, text4, i, element);
                type4.style.alignSelf = 'center';
                wType5(data, type5, text5, i, element);
                type5.style.alignSelf = 'center';
            }
        });

    }else if(data.types.length == 2){
        wt1 = weakness1.slice();
        wt2 = weakness2.slice();
        rt1 = resistance1.slice();
        rt2 = resistance2.slice();

        wt1.forEach(elementWT1 => {
            rt2.forEach(elementRT2 => {
                if(elementWT1.name == elementRT2.name){
                    countW1 += 1;
                }
            });
        });

        for(let i = 0; i < countW1; i++){
            wt1.forEach(elementWT1 => {
                rt2.forEach(elementRT2 => {
                    if(elementWT1.name == elementRT2.name){
                        pos = wt1.findIndex(element => element.name == elementWT1.name);
                        wt1.splice(pos, 1);
                    }
                });
            });
        }

        dataUrl1.data.damage_relations.no_damage_from.forEach(element => {
            let name = element.name;

            wt2.forEach(elementWT2 => {
                if(elementWT2.name == name){
                    pos = wt2.findIndex(element => element.name == elementWT2.name);
                    wt2.splice(pos, 1);
                }
            });
        });

        wt2.forEach(elementWT2 => {
            rt1.forEach(elementRT1 => {
                if(elementWT2.name == elementRT1.name){
                    countW2 += 1;
                }
            });
        });

        for(let i = 0; i < countW2; i++){
            wt2.forEach(elementWT2 => {
                rt1.forEach(elementRT1 => {
                    if(elementWT2.name == elementRT1.name){
                        pos = wt2.findIndex(element => element.name == elementWT2.name);
                        wt2.splice(pos, 1);
                    }
                });
            });
        }

        dataUrl2.data.damage_relations.no_damage_from.forEach(element => {
            let name = element.name;

            wt1.forEach(elementWT1 => {
                if(elementWT1.name == name){
                    pos = wt1.findIndex(element => element.name == elementWT1.name);
                    wt1.splice(pos, 1);
                }
            });
        });

        weaknessAll = wt1.concat(wt2);

        let uniqs = weaknessAll.slice();

        weaknessAll.forEach(element1 => {
            let count = 0;
            uniqs.forEach(element2 => {
                if(element1.name == element2.name){
                    count += 1;

                    if(count == 2){
                        pos = uniqs.findIndex(element => element.name == element1.name);
                        uniqs.splice(pos, 1);
                    }
                }
            });
        });

        let position;

        let urlType = async (x) => {
            let dataType = await api(`/type/${x}`);

            return dataType.data;
        };

        uniqs.forEach(async(element, i) => {
            let data = await urlType(element.name);

            typesContainer.style.alignItems = 'center';

            if(uniqs.length == 1){
                typesContainer.style.gridTemplate = '1fr / 1fr';
                type1.style.display = 'grid';
                type2.style.display = 'none';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                type1.style.backgroundColor = pokeTypeColor(element.name);

                position = data.names.findIndex(info => info.language.name === 'es');
                text1.innerHTML = data.names[position].name;
            }else if(uniqs.length == 2){
                typesContainer.style.gridTemplate = '1fr / 1fr 1fr';
                type3.style.display = 'none';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                wType2(data, type2, text2, i, element);
            }else if(uniqs.length == 3){
                typesContainer.style.gridTemplate = '1fr / repeat(3, 1fr)';
                type4.style.display = 'none';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                wType2(data, type2, text2, i, element);
                wType3(data, type3, text3, i, element);
            }else if(uniqs.length == 4){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type5.style.display = 'none';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                wType2(data, type2, text2, i, element);
                wType3(data, type3, text3, i, element);
                wType4(data, type4, text4, i, element);
            }else if(uniqs.length == 5){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type6.style.display = 'none';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                wType2(data, type2, text2, i, element);
                wType3(data, type3, text3, i, element);
                wType4_5(data, type4, text4, i, element);
                wType5(data, type5, text5, i, element);
            }else if(uniqs.length == 6){
                typesContainer.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                type7.style.display = 'none';

                wType1(data, type1, text1, i, element);
                wType2(data, type2, text2, i, element);
                wType3(data, type3, text3, i, element);
                wType4_4(data, type4, text4, i, element);
                wType5_5(data, type5, text5, i, element);
                wType6_6(data, type6, text6, i, element);
            }else if(uniqs.length == 7){
                typesContainer.style.gridTemplate = 'repeat(3, 1fr) / repeat(3, 1fr)';

                wType1(data, type1, text1, i, element);
                wType2(data, type2, text2, i, element);
                wType3(data, type3, text3, i, element);
                wType4_7(data, type4, text4, i, element);
                wType5_7(data, type5, text5, i, element);
                wType6(data, type6, text6, i, element);
                wType7(data, type7, text7, i, element);
            }
        });
    }
}

let pokeRandom = () => {
    let randomNumber = Math.floor((Math.random() * (898 - 1 + 1)) + 1);

    return randomNumber;
}

poke(randomN = pokeRandom());