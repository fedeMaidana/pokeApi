let pokeChart;

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

        img.style.display = 'grid';
        img.src = data.sprites.other["official-artwork"].front_default;
        img.alt = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
    }catch(error){
        console.log(error);
    }

}

let pokeType = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        if(data.types.length == 1){
            pokemonTypes.style.gridTemplateColumns = '1fr';
            pokemonType2.style.display = 'none';
            pokemonType2Text.setAttribute('style', 'display: none');
        }else{
            pokemonTypes.style.gridTemplateColumns = '1fr 1fr';
            pokemonType2.style.display = 'grid';
            pokemonType2Text.setAttribute('style', 'display: grid');
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
                labels: [
                    `Salud (${data.stats[0].base_stat})`,
                    `Ataque (${data.stats[1].base_stat})`,
                    `At. Esp. (${data.stats[3].base_stat})`,
                    `Velocidad (${data.stats[5].base_stat})`,
                    `Def. Esp. (${data.stats[4].base_stat})`,
                    `Defensa (${data.stats[2].base_stat})`
                ],
                datasets: [{
                    data: [
                        `${data.stats[0].base_stat}`,
                        `${data.stats[1].base_stat}`,
                        `${data.stats[3].base_stat}`,
                        `${data.stats[5].base_stat}`,
                        `${data.stats[4].base_stat}`,
                        `${data.stats[2].base_stat}`
                    ],
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
                elements: {
                    point: {
                        radius: 0
                    }
                },
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

        let pos = data.flavor_text_entries.findIndex(info => info.language.name === 'es');

        description.innerHTML = data.flavor_text_entries[pos].flavor_text;
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

        sex.style.gridTemplateColumns = '1fr 1fr';

        icon1.style.display = 'inline';
        icon2.style.display = 'inline';

        if(indexMale == -1){
            sex.style.gridTemplateColumns = '1fr';
            icon1.style.display = 'none';
            unknown1.style.display = 'none';
            icon2.src = '../icons/female.svg';
        }else{
            unknown1.style.display = 'none';
            icon1.src = '../icons/male.svg';
            icon2.src = '../icons/female.svg';
        }

        if(indexFemale == -1){
            sex.style.gridTemplateColumns = '1fr';
            icon2.style.display = 'none';
            unknown1.style.display = 'none';
            icon1.src = '../icons/male.svg';
        }else{
            unknown1.style.display = 'none';
            icon1.src = '../icons/male.svg';
            icon2.src = '../icons/female.svg';
        }

        if((indexGenderless != -1) || (indexFemale == -1 && indexMale == -1 && indexGenderless == -1)){
            sex.style.gridTemplateColumns = '1fr';
            icon1.style.display = 'none';
            icon2.style.display = 'none';
            unknown1.style.display = 'inline';
            unknown1.innerHTML = 'Desconocido';
        }
    }catch(error){
        console.log(error);
    }
}

let pokeCategory = async (id) => {
    try{
        let {data} = await api(`/pokemon-species/${id}/`);

        let pos = data.genera.findIndex(info => info.language.name === 'es');

        let newString, string = data.genera[pos].genus;

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
            if(element.is_hidden === false){
                abilities.push(data.abilities[i].ability.name);
                url.push(data.abilities[i].ability.url);
            }
        });

        if(url.length == 1){
            dataUrl1 = await axios.get(url[0]);
        }else{
            dataUrl1 = await axios.get(url[0]);
            dataUrl2 = await axios.get(url[1]);
        }

        if(url.length == 1){
            indexUrl1 = dataUrl1.data.names.findIndex(info => info.language.name === 'es');
        }else{
            indexUrl1 = dataUrl1.data.names.findIndex(info => info.language.name === 'es');
            indexUrl2 = dataUrl2.data.names.findIndex(info => info.language.name === 'es');
        }

        if(url.length == 1){
            ability.style.gridTemplateColumns = '1fr';
            pokeAbility1.style.display = 'grid';
            pokeAbility2.style.display = 'none';
            abilityClass.style.width = '25vw';
            pokeAbility1.innerHTML = dataUrl1.data.names[indexUrl1].name;
        }else{
            ability.style.gridTemplateColumns = '1fr 1fr';
            pokeAbility1.style.display = 'grid';
            pokeAbility2.style.display = 'grid';
            abilityClass.style.width = '35vw';
            pokeAbility1.innerHTML = dataUrl1.data.names[indexUrl1].name;
            pokeAbility2.innerHTML = dataUrl2.data.names[indexUrl2].name;
        }

        if(window.outerWidth <= 425 && url.length == 1){
            abilityClass.style.width = '40vw';
        }else if(window.outerWidth <= 425 && url.length == 2){
            abilityClass.style.width = '60vw';
        }

    }catch(error){
        console.log(error);
    }
}

let pokeHiddenAbility = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        let hiddenAbility, url, dataUrl, indexUrl;

        data.abilities.forEach(async(element, i) => {
            if(element.is_hidden === true){
                hiddenAbility = data.abilities[i].ability.name;
                url = data.abilities[i].ability.url;
            }
        });

        if(url != undefined){
            dataUrl = await axios.get(url);

            indexUrl = dataUrl.data.names.findIndex(info => info.language.name === 'es');
        }

            if(hiddenAbility == undefined){
                hiddenAbilities.style.gridTemplateColumns = '1fr';
                hiddenAbilityTextNone.style.display = 'grid';
                hiddenAbilityText.style.display = 'none';
                hiddenAbilityTextNone.innerHTML = 'n/a';
            }else{
                hiddenAbilities.style.gridTemplateColumns = '1fr';
                hiddenAbilityTextNone.style.display = 'none';
                hiddenAbilityText.style.display = 'grid';
                hiddenAbilityText.innerHTML = dataUrl.data.names[indexUrl].name;
            }

            if(window.outerWidth <= 425){
                hiddenAbilityContainer.style.width = '60vw';
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
        }else{
            typeUrl1 = data.types[0].type.url;
            typeUrl2 = data.types[1].type.url;
        }

        if(data.types.length == 1){
            dataUrl1 = await axios.get(typeUrl1);

            resistance1 = dataUrl1.data.damage_relations.half_damage_from;
            weakness1 = dataUrl1.data.damage_relations.double_damage_from;

        }else{
            dataUrl1 = await axios.get(typeUrl1);
            dataUrl2 = await axios.get(typeUrl2);

            weakness1 = dataUrl1.data.damage_relations.double_damage_from;
            weakness2 = dataUrl2.data.damage_relations.double_damage_from;
            resistance1 = dataUrl1.data.damage_relations.half_damage_from;
            resistance2 = dataUrl2.data.damage_relations.half_damage_from;
        }

        if(data.types.length == 1){
            rt1 = resistance1.slice();

            let urlType = async (x) => {
                let dataType = await api(`/type/${x}`);

                return dataType.data;
            };

            if(data.types[0].type.name == 'normal'){
                eGeneralStyles('grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr');

                enduranceTypeNone.style.alignSelf = 'center';
                enduranceTypeNone.style.backgroundColor = 'rgb(0, 0, 0)';
                enduranceTextNone.innerHTML = 'n/a';
                enduranceTextNone.style.color = 'rgb(255, 255, 255';
            }

            rt1.forEach(async(element, i) => {
                let dataType = await urlType(element.name);

                if(rt1.length == 1){
                    eGeneralStyles('none', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr');
                    eType(dataType, type1, text1, '1 / 1 / 2 / 2', i, 0, element);

                }else if(rt1.length == 2){
                    eGeneralStyles('none', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr 1fr');
                    eType(dataType, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(dataType, type2, text2, '1 / 2 / 2 / 3', i, 1, element);

                }else if(rt1.length == 3){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / repeat(3, 1fr)');
                    eType(dataType, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(dataType, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(dataType, type3, text3, '1 / 3 / 2 / 4', i, 2, element);

                }else if(rt1.length == 4){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    eType(dataType, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(dataType, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(dataType, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(dataType, type4, text4, '2 / 1 / 3 / 4', i, 3, element);

                }else if(rt1.length == 5){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    eType(dataType, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(dataType, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(dataType, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(dataType, type4, text4, '2 / 1 / 4 / 3', i, 3, element);
                    eType(dataType, type5, text5, '2 / 2 / 4 / 4', i, 4, element);

                }else if(rt1.length == 6){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    eType(dataType, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(dataType, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(dataType, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(dataType, type4, text4, '2 / 1 / 4 / 2', i, 3, element);
                    eType(dataType, type5, text5, '2 / 2 / 4 / 3', i, 4, element);
                    eType(dataType, type6, text6, '2 / 3 / 4 / 4', i, 5, element);

                }else if(rt1.length == 10){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'repeat(4, 1fr) / repeat(3, 1fr)');
                    eType(dataType, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(dataType, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(dataType, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(dataType, type4, text4, '2 / 1 / 3 / 2', i, 3, element);
                    eType(dataType, type5, text5, '2 / 2 / 3 / 3', i, 4, element);
                    eType(dataType, type6, text6, '2 / 3 / 3 / 4', i, 5, element);
                    eType(dataType, type7, text7, '3 / 1 / 4 / 2', i, 6, element);
                    eType(dataType, type8, text8, '3 / 1 / 4 / 4', i, 7, element);
                    eType(dataType, type9, text9, '3 / 3 / 4 / 4', i, 8, element);
                    eType(dataType, type10, text10, '4 / 1 / 5 / 4', i, 9, element);
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

            let urlType = async (x) => {
                let dataType = await api(`/type/${x}`);

                return dataType.data;
            };

            uniqs.forEach(async(element, i) => {
                let data = await urlType(element.name);

                typesContainer.style.alignItems = 'center';

                if(uniqs.length == 1){
                    eGeneralStyles('none', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);

                }else if(uniqs.length == 2){
                    eGeneralStyles('none', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr 1fr');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);

                }else if(uniqs.length == 3){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);

                }else if(uniqs.length == 4){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 2 / 4 / 3', i, 3, element);

                }else if(uniqs.length == 5){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 1 / 4 / 3', i, 3, element);
                    eType(data, type5, text5, '2 / 2 / 4 / 4', i, 4, element);

                }else if(uniqs.length == 6){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 1 / 4 / 2', i, 3, element);
                    eType(data, type5, text5, '2 / 2 / 4 / 3', i, 4, element);
                    eType(data, type6, text6, '2 / 3 / 4 / 4', i, 5, element);

                }else if(uniqs.length == 7){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'none', 'repeat(3, 1fr) / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 1 / 3 / 2', i, 3, element);
                    eType(data, type5, text5, '2 / 2 / 3 / 3', i, 4, element);
                    eType(data, type6, text6, '2 / 3 / 3 / 4', i, 5, element);
                    eType(data, type7, text7, '3 / 1 / 4 / 4', i, 6, element);

                }else if(uniqs.length == 8){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', 'repeat(3, 1fr) / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 1 / 3 / 2', i, 3, element);
                    eType(data, type5, text5, '2 / 2 / 3 / 3', i, 4, element);
                    eType(data, type6, text6, '2 / 3 / 3 / 4', i, 5, element);
                    eType(data, type7, text7, '3 / 1 / 4 / 3', i, 6, element);
                    eType(data, type8, text8, '3 / 2 / 4 / 4', i, 7, element);

                }else if(uniqs.length == 9){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', 'repeat(3, 1fr) / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 1 / 3 / 2', i, 3, element);
                    eType(data, type5, text5, '2 / 2 / 3 / 3', i, 4, element);
                    eType(data, type6, text6, '2 / 3 / 3 / 4', i, 5, element);
                    eType(data, type7, text7, '3 / 1 / 4 / 2', i, 6, element);
                    eType(data, type8, text8, '3 / 1 / 4 / 4', i, 7, element);
                    eType(data, type9, text9, '3 / 3 / 4 / 4', i, 8, element);

                }else if(uniqs.length == 10){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', 'repeat(4, 1fr) / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 1 / 3 / 2', i, 3, element);
                    eType(data, type5, text5, '2 / 2 / 3 / 3', i, 4, element);
                    eType(data, type6, text6, '2 / 3 / 3 / 4', i, 5, element);
                    eType(data, type7, text7, '3 / 1 / 4 / 2', i, 6, element);
                    eType(data, type8, text8, '3 / 1 / 4 / 4', i, 7, element);
                    eType(data, type9, text9, '3 / 3 / 4 / 4', i, 8, element);
                    eType(data, type10, text10, '4 / 1 / 5 / 4', i, 9, element);

                }else if(uniqs.length == 11){
                    eGeneralStyles('none', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'repeat(4, 1fr) / repeat(3, 1fr)');
                    eType(data, type1, text1, '1 / 1 / 2 / 2', i, 0, element);
                    eType(data, type2, text2, '1 / 2 / 2 / 3', i, 1, element);
                    eType(data, type3, text3, '1 / 3 / 2 / 4', i, 2, element);
                    eType(data, type4, text4, '2 / 1 / 3 / 2', i, 3, element);
                    eType(data, type5, text5, '2 / 2 / 3 / 3', i, 4, element);
                    eType(data, type6, text6, '2 / 3 / 3 / 4', i, 5, element);
                    eType(data, type7, text7, '3 / 1 / 4 / 2', i, 6, element);
                    eType(data, type8, text8, '3 / 1 / 4 / 4', i, 7, element);
                    eType(data, type9, text9, '3 / 3 / 4 / 4', i, 8, element);
                    eType(data, type10, text10, '4 / 1 / 5 / 3', i, 9, element);
                    eType(data, type11, text11, '4 / 2 / 5 / 4', i, 10, element);
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

        let typeUrl1, typeUrl2, dataUrl1, dataUrl2, weakness1, weakness2, resistance1, resistance2, weaknessAll;

        if(data.types.length == 1){
            typeUrl1 = data.types[0].type.url;
        }else{
            typeUrl1 = data.types[0].type.url;
            typeUrl2 = data.types[1].type.url;
        }

        if(data.types.length == 1){
            dataUrl1 = await axios.get(typeUrl1);

            weakness1 = dataUrl1.data.damage_relations.double_damage_from;
            resistance1 = dataUrl1.data.damage_relations.half_damage_from;
        }else{
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

            let urlType = async (x) => {
                let dataType = await api(`/type/${x}`);

                return dataType.data;
            };

            wt1.forEach(async(element, i) => {
                let data = await urlType(element.name);

                if(wt1.length == 1){
                    wGeneralStyle('grid', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);

                }else if(wt1.length == 2){
                    wGeneralStyle('grid', 'grid', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr 1fr');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);

                }else if(wt1.length == 3){
                    wGeneralStyle('grid', 'grid', 'grid', 'none', 'none', 'none', 'none', '1fr / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);

                }else if(wt1.length == 4){
                    wGeneralStyle('grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);
                    wType(data, weaknessType4, weaknessText4, '2 / 2 / 4 / 3', i, 3, element);

                }else if(wt1.length == 5){
                    wGeneralStyle('grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);
                    wType(data, weaknessType4, weaknessText4, '2 / 1 / 4 / 3', i, 3, element);
                    wType(data, weaknessType5, weaknessText5, '2 / 2 / 4 / 4', i, 4, element);
                }
            });

        }else{
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

            //console.log(weaknessAll);

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

            let urlType = async (x) => {
                let dataType = await api(`/type/${x}`);

                return dataType.data;
            };

            uniqs.forEach(async(element, i) => {
                let data = await urlType(element.name);

                let repeatedElement = [];

                weaknessAll.forEach(element1 => {
                    let count = 0;
                    weaknessAll.forEach(element2 => {
                        if(element1.name == element2.name){
                            count += 1;

                            if(count == 2){
                                pos = weaknessAll.findIndex(element => element.name == element1.name);
                                let x = weaknessAll.splice(pos, 1);

                                repeatedElement.push(x[0].name);
                            }
                        }
                    });
                });

                if(uniqs.length == 1){
                    wGeneralStyle('grid', 'none', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);

                }else if(uniqs.length == 2){
                    wGeneralStyle('grid', 'grid', 'none', 'none', 'none', 'none', 'none', '1fr / 1fr 1fr');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);

                }else if(uniqs.length == 3){
                    wGeneralStyle('grid', 'grid', 'grid', 'none', 'none', 'none', 'none', '1fr / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);

                }else if(uniqs.length == 4){
                    wGeneralStyle('grid', 'grid', 'grid', 'grid', 'none', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);
                    wType(data, weaknessType4, weaknessText4, '2 / 2 / 4 / 3', i, 3, element);

                }else if(uniqs.length == 5){
                    wGeneralStyle('grid', 'grid', 'grid', 'grid', 'grid', 'none', 'none', '1fr 1fr / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);
                    wType(data, weaknessType4, weaknessText4, '2 / 1 / 4 / 3', i, 3, element);
                    wType(data, weaknessType5, weaknessText5, '2 / 2 / 4 / 4', i, 4, element);

                }else if(uniqs.length == 6){
                    wGeneralStyle('grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'none', '1fr 1fr / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);
                    wType(data, weaknessType4, weaknessText4, '2 / 1 / 4 / 2', i, 3, element);
                    wType(data, weaknessType5, weaknessText5, '2 / 2 / 4 / 3', i, 4, element);
                    wType(data, weaknessType6, weaknessText6, '2 / 3 / 4 / 4', i, 5, element);

                }else if(uniqs.length == 7){
                    wGeneralStyle('grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'grid', 'repeat(3, 1fr) / repeat(3, 1fr)');
                    wType(data, weaknessType1, weaknessText1, '1 / 1 / 2 / 2', i, 0, element);
                    wType(data, weaknessType2, weaknessText2, '1 / 2 / 2 / 3', i, 1, element);
                    wType(data, weaknessType3, weaknessText3, '1 / 3 / 2 / 4', i, 2, element);
                    wType(data, weaknessType4, weaknessText4, '2 / 1 / 3 / 2', i, 3, element);
                    wType(data, weaknessType5, weaknessText5, '2 / 2 / 3 / 3', i, 4, element);
                    wType(data, weaknessType6, weaknessText6, '2 / 3 / 3 / 4', i, 5, element);
                    wType(data, weaknessType7, weaknessText7, '3 / 1 / 4 / 4', i, 6, element);
                }
            });
        }
    }catch(error){
        console.log(error);
    }
}

let pokeImmunity = async (id) => {
    try{
        let {data} = await api(`/pokemon/${id}/`);

        let typeUrl1, typeUrl2, dataUrl1, dataUrl2, immnunity1, immnunity2, immunities;

        if(data.types.length == 1){
            typeUrl1 = data.types[0].type.url;
        }else{
            typeUrl1 = data.types[0].type.url;
            typeUrl2 = data.types[1].type.url;
        }

        if(data.types.length == 1){
            dataUrl1 = await axios.get(typeUrl1);

            immnunity1 = dataUrl1.data.damage_relations.no_damage_from;
        }else{
            dataUrl1 = await axios.get(typeUrl1);
            dataUrl2 = await axios.get(typeUrl2);

            immnunity1 = dataUrl1.data.damage_relations.no_damage_from;
            immnunity2 = dataUrl2.data.damage_relations.no_damage_from;
        }

        if(data.types.length == 1){

            let urlType = async (x) => {
                let dataType = await api(`/type/${x}`);

                return dataType.data;
            };

            if(immnunity1.length == 0){
                iGeneralStyles('grid', 'none', 'none', 'none', '1fr / 1fr');

                iStylesTypeNone('rgb(0, 0, 0)', 'n/a', 'rgb(255, 255, 255');
            }

            immnunity1.forEach(async(element, i) => {
                let dataType = await urlType(element.name);

                if(immnunity1.length == 1){
                    iGeneralStyles('none', 'grid', 'none', 'none', '1fr / 1fr');
                    iType(dataType, immnunityType1, immnunityText1, i, 0, element);

                }else if(immnunity1.length == 2 ){
                    iGeneralStyles('none', 'grid', 'grid', 'none', '1fr / 1fr 1fr');

                    iType(dataType, immnunityType1, immnunityText1, i, 0, element);
                    iType(dataType, immnunityType2, immnunityText2, i, 1, element);
                }
            });
        }else if(data.types.length == 2){
            if(immnunity1.length == 1 && immnunity2.length == 0){
                immunities = immnunity1.slice();
            }else if(immnunity1.length == 0 && immnunity2.length == 1){
                immunities = immnunity2.slice();
            }else if((immnunity1.length == 2 && immnunity2.length == 0) || (immnunity1.length == 0 && immnunity2.length == 2) || (immnunity1.length == 1 && immnunity2.length == 1)){
                immunities = immnunity1.concat(immnunity2);
            }else if((immnunity1.length == 1 && immnunity2.length == 2) || (immnunity1.length == 2 && immnunity2.length == 1)){
                immunities = immnunity1.concat(immnunity2);
            }

            let urlType = async (x) => {
                let dataType = await api(`/type/${x}`);

                return dataType.data;
            };

            if(immnunity1.length == 0 && immnunity2.length == 0){
                iGeneralStyles('grid', 'none', 'none', 'none', '1fr / 1fr');
                iStylesTypeNone('rgb(0, 0, 0)', 'n/a', 'rgb(255, 255, 255');
            }

            if(immunities != undefined){
                immunities.forEach(async(element, i) => {
                    let dataType = await urlType(element.name);

                    if((immnunity1.length == 1 && immnunity2.length == 0) || (immnunity1.length == 0 && immnunity2.length == 1)){
                        iGeneralStyles('none', 'grid', 'none', 'none', '1fr / 1fr');
                        iType(dataType, immnunityType1, immnunityText1, i, 0, element);

                    }else if((immnunity1.length == 2 && immnunity2.length == 0) || (immnunity1.length == 0 && immnunity2.length == 2) || (immnunity1.length == 1 && immnunity2.length == 1)){
                        iGeneralStyles('none', 'grid', 'grid', 'none', '1fr / 1fr 1fr');
                        iType(dataType, immnunityType1, immnunityText1, i, 0, element);
                        iType(dataType, immnunityType2, immnunityText2, i, 1, element);

                    }else if((immnunity1.length == 1 && immnunity2.length == 2) || (immnunity1.length == 2 && immnunity2.length == 1)){
                        iGeneralStyles('none', 'grid', 'grid', 'grid', '1fr / 1fr 1fr 1fr');
                        iType(dataType, immnunityType1, immnunityText1, i, 0, element);
                        iType(dataType, immnunityType2, immnunityText2, i, 1, element);
                        iType(dataType, immnunityType3, immnunityText3, i, 2, element);
                    }
                });
            }
        }
    }catch(error){
        console.log(error);
    }
}