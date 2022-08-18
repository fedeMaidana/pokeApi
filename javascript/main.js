const api = axios.create({baseURL: 'https://pokeapi.co/api/v2'});

let pokeChart, randomN;

document.getElementById('arrow-left').onclick = () => {poke(randomN -= 1)};
document.getElementById('arrow-right').onclick = () =>{poke(randomN += 1)};

let poke = async (id) => {
    /*let response = await fetch(URL_POKE(id));
    let data = await response.json();*/

    try{
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
    }catch(error){
        console.log(error);
    }
}

let pokeName = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        h1.innerHTML = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.°${data.id.toString().padStart(3, 0)}`;
    }catch(error){
        console.log(error);
    }
}

let pokeImage = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        img.src = data.sprites.other["official-artwork"].front_default;
        img.alt = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
    }catch(error){
        console.log(error);
    }

}

let pokeType = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        if(data.types.length == 2){
            pokemonTypes.style.gridTemplateColumns = '1fr 1fr';
            pokemonType2.style.display = 'grid';
            pokemonType2Text.setAttribute('style', 'display: grid');
        }else{
            pokemonTypes.style.gridTemplateColumns = '1fr';
            pokemonType2.style.display = 'none';
            pokemonType2Text.setAttribute('style', 'display: none');
        }

        let text;

        let urlType = async (x) => {
            let dataType = await api(`/type/${x}`);

            return dataType.data;
        };

        data.types.forEach(async(element, i) => {
            let dataType = await urlType(element.type.name);

            position = dataType.names.findIndex(info => info.language.name === 'es');
            text = dataType.names[position].name;

            if(i == 0){
                pokemonType1.style.backgroundColor = pokeTypeColor(element.type.name);
                pokemonType1.style.border = `1px solid`;
                pokemonType1Text.innerHTML = text;
            }

            if(data.types.length == 2){
                pokemonType2.style.backgroundColor = pokeTypeColor(element.type.name);
                pokemonType2.style.border = `1px solid`;
                pokemonType2Text.innerHTML = text;
            }
        });
    }catch(error){
        console.log(error);
    }
}

let pokeGraph = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        if(pokeChart){
            pokeChart.destroy();
        }

        pokeChart = new Chart(canvasGraph, {
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
    }catch(error){
        console.log(error);
    }
}

let pokeDescription = async (id) => {
    try{
        let {data} = await api(`/pokemon-species/${id}/`);

        let index = data.flavor_text_entries.findIndex(info => info.language.name === 'es');

        description.innerHTML = data.flavor_text_entries[index].flavor_text;
    }catch(error){
        console.log(error);
    }
}

let pokeHeight = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        height.innerHTML = `${data.height / 10} m`;
    }catch(error){
        console.log(error);
    }
}

let pokeWeight = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        weight.innerHTML = `${data.weight / 10} Kg`;
    }catch(error){
        console.log(error);
    }
}

let pokeSex = async (name) => {
    try{
        let dataFemale = await api(`/gender/1/`);
        let dataMale = await api(`/gender/2/`);
        let dataGenderless = await api(`/gender/3/`);

        let indexFemale = dataFemale.data.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
        let indexMale = dataMale.data.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
        let indexGenderless = dataGenderless.data.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);

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
    }catch(error){
        console.log(error);
    }
}

let pokeCategory = async (id) => {
    try{
        let {data} = await api(`/pokemon-species/${id}/`);

        let index = data.genera.findIndex(info => info.language.name === 'es');

        let newString, string = data.genera[index].genus;

        if(string.includes('Pokémon')){
            newString = string.slice(8);
        }

        category.innerHTML = newString;
    }catch(error){
        console.log(error);
    }
}

let pokeAbility = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        let abilities = [], url = [], dataUrl1, dataUrl2, indexUrl1, indexUrl2;

        data.abilities.forEach((element, i) => {
            if(data.abilities[i].is_hidden === false){
                abilities.push(data.abilities[i].ability.name);
                url.push(data.abilities[i].ability.url);
            }
        });

        if(url.length == 2){
            dataUrl1 = await axios.get(url[0]);
            dataUrl2 = await axios.get(url[1]);
        }else if(url.length == 1){
            dataUrl1 = await axios.get(url[0]);
        }

        if(url.length == 2){
            indexUrl1 = dataUrl1.data.names.findIndex(info => info.language.name === 'es');
            indexUrl2 = dataUrl2.data.names.findIndex(info => info.language.name === 'es');
        }else if(url.length == 1){
            indexUrl1 = dataUrl1.data.names.findIndex(info => info.language.name === 'es');
        }

        ability.appendChild(pokeAbility1);
        ability.appendChild(pokeAbility2);

        if(url.length == 2){
            ability.style.gridTemplateColumns = '1fr 1fr';
            pokeAbility1.style.display = 'grid';
            pokeAbility2.style.display = 'grid';
            abilityClass.style.width = '33vw';
            pokeAbility1.innerHTML = dataUrl1.data.names[indexUrl1].name;
            pokeAbility2.innerHTML = dataUrl2.data.names[indexUrl2].name;
        }else if(url.length == 1){
            ability.style.gridTemplateColumns = '1fr';
            pokeAbility1.style.display = 'grid';
            pokeAbility2.style.display = 'none';
            abilityClass.style.width = '20vw';
            pokeAbility1.innerHTML = dataUrl1.data.names[indexUrl1].name;
        }
    }catch(error){
        console.log(error);
    }
}

let pokeEndurance = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        let typeUrl1, typeUrl2, dataUrl1, dataUrl2, weakness1, weakness2, resistance1, resistance2;
        let wt1, wt2, rt1, rt2, pos, countR1 = 0, countR2 = 0;

        if(data.types.length == 1){
            typeUrl1 = data.types[0].type.url;
        }else if(data.types.length == 2){
            typeUrl1 = data.types[0].type.url;
            typeUrl2 = data.types[1].type.url;
        }

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
    }catch(error){
        console.log(error);
    }
}

let pokeWeakness = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        let typeUrl1, typeUrl2;

        if(data.types.length == 1){
            typeUrl1 = data.types[0].type.url;
        }else if(data.types.length == 2){
            typeUrl1 = data.types[0].type.url;
            typeUrl2 = data.types[1].type.url;
        }

        let dataUrl1, dataUrl2, weakness1, weakness2, resistance1, resistance2;

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
                    typesContainerWeakness.style.gridTemplate = '1fr / 1fr';
                    weaknessType1.style.display = 'grid';
                    weaknessType1.style.alignSelf = 'center';
                    weaknessType2.style.display = 'none';
                    weaknessType3.style.display = 'none';
                    weaknessType4.style.display = 'none';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    weaknessType1.style.backgroundColor = pokeTypeColor(element.name);

                    position = data.names.findIndex(info => info.language.name === 'es');
                    weaknessText1.innerHTML = data.names[position].name;
                }else if(wt1.length == 2){
                    typesContainerWeakness.style.gridTemplate = '1fr / 1fr 1fr';
                    weaknessType3.style.display = 'none';
                    weaknessType4.style.display = 'none';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    weaknessType1.style.alignSelf = 'center';
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    weaknessType2.style.alignSelf = 'center';
                }else if(wt1.length == 3){
                    typesContainerWeakness.style.gridTemplate = '1fr / repeat(3, 1fr)';
                    weaknessType4.style.display = 'none';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    weaknessType1.style.alignSelf = 'center';
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    weaknessType2.style.alignSelf = 'center';
                    wType3(data, weaknessType3, weaknessText3, i, element);
                    weaknessType3.style.alignSelf = 'center';
                }else if(wt1.length == 4){
                    typesContainerWeakness.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    weaknessType1.style.alignSelf = 'center';
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    weaknessType2.style.alignSelf = 'center';
                    wType3(data, weaknessType3, weaknessText3, i, element);
                    weaknessType3.style.alignSelf = 'center';
                    wType4(data, weaknessType4, weaknessText4, i, element);
                    weaknessType4.style.alignSelf = 'center';
                }else if(wt1.length == 5){
                    typesContainerWeakness.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    weaknessType1.style.alignSelf = 'center';
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    weaknessType2.style.alignSelf = 'center';
                    wType3(data, weaknessType3, weaknessText3, i, element);
                    weaknessType3.style.alignSelf = 'center';
                    wType4_5(data, weaknessType4, weaknessText4, i, element);
                    weaknessType4.style.alignSelf = 'center';
                    wType5(data, weaknessType5, weaknessText5, i, element);
                    weaknessType5.style.alignSelf = 'center';
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

                typesContainerWeakness.style.alignItems = 'center';

                if(uniqs.length == 1){
                    typesContainerWeakness.style.gridTemplate = '1fr / 1fr';
                    weaknessType1.style.display = 'grid';
                    weaknessType2.style.display = 'none';
                    weaknessType3.style.display = 'none';
                    weaknessType4.style.display = 'none';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    weaknessType1.style.backgroundColor = pokeTypeColor(element.name);

                    position = data.names.findIndex(info => info.language.name === 'es');
                    weaknessText1.innerHTML = data.names[position].name;
                }else if(uniqs.length == 2){
                    typesContainerWeakness.style.gridTemplate = '1fr / 1fr 1fr';
                    weaknessType3.style.display = 'none';
                    weaknessType4.style.display = 'none';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    wType2(data, weaknessType2, weaknessText2, i, element);
                }else if(uniqs.length == 3){
                    typesContainerWeakness.style.gridTemplate = '1fr / repeat(3, 1fr)';
                    weaknessType4.style.display = 'none';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    wType3(data, weaknessType3, weaknessText3, i, element);
                }else if(uniqs.length == 4){
                    typesContainerWeakness.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                    weaknessType5.style.display = 'none';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    wType3(data, weaknessType3, weaknessText3, i, element);
                    wType4(data, weaknessType4, weaknessText4, i, element);
                }else if(uniqs.length == 5){
                    typesContainerWeakness.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                    weaknessType6.style.display = 'none';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    wType3(data, weaknessType3, weaknessText3, i, element);
                    wType4_5(data, weaknessType4, weaknessText4, i, element);
                    wType5(data, weaknessType5, weaknessText5, i, element);
                }else if(uniqs.length == 6){
                    typesContainerWeakness.style.gridTemplate = '1fr 1fr / repeat(3, 1fr)';
                    weaknessType7.style.display = 'none';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    wType3(data, weaknessType3, weaknessText3, i, element);
                    wType4_4(data, weaknessType4, weaknessText4, i, element);
                    wType5_5(data, weaknessType5, weaknessText5, i, element);
                    wType6_6(data, weaknessType6, weaknessText6, i, element);
                }else if(uniqs.length == 7){
                    typesContainerWeakness.style.gridTemplate = 'repeat(3, 1fr) / repeat(3, 1fr)';

                    wType1(data, weaknessType1, weaknessText1, i, element);
                    wType2(data, weaknessType2, weaknessText2, i, element);
                    wType3(data, weaknessType3, weaknessText3, i, element);
                    wType4_7(data, weaknessType4, weaknessText4, i, element);
                    wType5_7(data, weaknessType5, weaknessText5, i, element);
                    wType6_7(data, weaknessType6, weaknessText6, i, element);
                    wType7(data, weaknessType7, weaknessText7, i, element);
                }
            });
        }
    }catch(error){
        console.log(error);
    }
}

let pokeRandom = () => {
    try{
        return randomNumber = Math.floor((Math.random() * (898 - 1 + 1)) + 1);
    }catch(error){
        console.log(error);
    }
}

poke(randomN = pokeRandom());