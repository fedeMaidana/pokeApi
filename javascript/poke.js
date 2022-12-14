let pokeChart;

let pokeName = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        h1.innerHTML = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.°${data.id.toString().padStart(3, 0)}`;
    }catch(error){
        console.log(error);
    }
}

let pokeImage = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        img.style.display = 'grid';
        img.src = data.sprites.other["official-artwork"].front_default;
        img.alt = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
    }catch(error){
        console.log(error);
    }

}

let pokeType = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        typesContainer.innerHTML = '';

        for (const typed of data.types){
            let spanishName = await getTypeName(typed.type.name);

            typesContainer.append(createTypes(typed.type.name, spanishName));
        }

    }catch(error){
        console.log(error);
    }
}

let pokeGraph = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

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

let pokeDescription = async () => {
    try{
        let dataSpecies = localStorage.getItem('dataSpecies') ? JSON.parse(localStorage.getItem('dataSpecies')) : '';

        //let {data} = await api(`/pokemon-species/${id}/`);

        /*let dataSpecies;

        if(!localStorage.getItem('dataSpecies')){
            console.log('dataSpecies no esta dentro del localStorage');

            dataSpecies = await api(`/pokemon-species/${id}/`).then(r => r.data);

            localStorage.setItem('dataSpecies', JSON.stringify(dataSpecies));
        }else{
            console.log('dataSpecies esta dentro del localStorage');

            dataSpecies = JSON.parse(localStorage.getItem('dataSpecies'));

            localStorage.removeItem('dataSpecies');
        }*/

        let pos = dataSpecies.flavor_text_entries.findIndex(info => info.language.name === 'es');

        description.innerHTML = dataSpecies.flavor_text_entries[pos].flavor_text;
    }catch(error){
        console.log(error);
    }
}

let pokeHeight = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        height.innerHTML = `${data.height / 10} m`;
    }catch(error){
        console.log(error);
    }
}

let pokeWeight = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        weight.innerHTML = `${data.weight / 10} Kg`;
    }catch(error){
        console.log(error);
    }
}

let pokeGender = async (name) => {
    try{
        let dataFemale = localStorage.getItem('dataFemale') ? JSON.parse(localStorage.getItem('dataFemale')) : '';
        let dataMale = localStorage.getItem('dataMale') ? JSON.parse(localStorage.getItem('dataMale')) : '';
        let dataGenderless = localStorage.getItem('dataGenderless') ? JSON.parse(localStorage.getItem('dataGenderless')) : '';

        let indexFemale = dataFemale.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
        let indexMale = dataMale.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);
        let indexGenderless = dataGenderless.pokemon_species_details.findIndex(info => info.pokemon_species.name === name);

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

let pokeCategory = async () => {
    try{
        let dataSpecies = localStorage.getItem('dataSpecies') ? JSON.parse(localStorage.getItem('dataSpecies')) : '';

        let pos = dataSpecies.genera.findIndex(info => info.language.name === 'es');

        let newString, string = dataSpecies.genera[pos].genus;

        if(string.includes('Pokémon')){
            newString = string.slice(8);
        }

        category.innerHTML = newString;
    }catch(error){
        console.log(error);
    }
}

let pokeAbility = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        abilityContainer.innerHTML = '';

        for(const abilities of data.abilities){
            if(abilities.is_hidden === false){
                let {data: dataUrl} = await axios.get(abilities.ability.url);

                let pos = dataUrl.names.findIndex(info => info.language.name === 'es');
                let spanishName = dataUrl.names[pos].name

                abilityContainer.append(createAbilities(spanishName));
            }
        }
    }catch(error){
        console.log(error);
    }
}

let pokeHiddenAbility = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        for(const hiddenAbility of data.abilities){
            hiddenAbilities.innerHTML = '';

            if(hiddenAbility.is_hidden === true){
                let {data: dataUrl} = await axios.get(hiddenAbility.ability.url);

                let pos = dataUrl.names.findIndex(info => info.language.name === 'es');
                let spanishName = dataUrl.names[pos].name;

                hiddenAbilities.append(createAbilities(spanishName));
            }else{
                hiddenAbilities.append(createAbilities('n/a'));
            }
        }
    }catch(error){
        console.log(error);
    }
}

let pokeQualities = async () => {
    try{
        let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : '';

        weaknessContainer.innerHTML = '';
        const weakness = {};

        enduranceContainer.innerHTML = '';
        const endurance = {};

        immunityContainer.innerHTML = '';
        const immunity = {};

        for (const typed of data.types) {
            const dataUrl = await axios.get(typed.type.url);
            const { half_damage_from,  double_damage_from, no_damage_from } = dataUrl.data.damage_relations;

            for (const halfDamageFrom of half_damage_from) {
                if(weakness[halfDamageFrom.name]){
                    delete weakness[halfDamageFrom.name];
                }else{
                    endurance[halfDamageFrom.name] = (endurance[halfDamageFrom.name] || 0) + 1;
                }
            }

            for (const doubleDamageFrom of double_damage_from) {
                if(endurance[doubleDamageFrom.name]){
                    delete endurance[doubleDamageFrom.name];
                }else{
                    weakness[doubleDamageFrom.name] = (weakness[doubleDamageFrom.name] || 0) + 1;
                }
            }

            for (const noDamageFrom of no_damage_from) {
                immunity[noDamageFrom.name] = immunity[noDamageFrom.name] || 0;
            }

            if(typed.type.name == "normal" && Object.keys(endurance).length == 0 && data.types.length == 1){
                endurance["none"] = 1;
            }
        }

        for(const key1 in endurance){
            for(const key2 in immunity){
                if(key1 == key2){
                    delete endurance[key1];
                }
            }
        }

        for(const key1 in weakness){
            for(const key2 in immunity){
                if(key1 == key2){
                    delete weakness[key1];
                }
            }
        }

        if(Object.keys(immunity).length == 0){
            immunity["none"] = undefined;
        }

        if(Object.keys(endurance).length == 0){
            endurance["none"] = undefined;
        }

        for (const key in weakness) {
            if (Object.hasOwnProperty.call(weakness, key)) {
                const value = weakness[key];
                const nameWeakness = await getTypeName(key);

                weaknessContainer.append(createQualities({
                    name: `${nameWeakness} ${value > 1 ? '<span class="multiplier">x4</span>' : ""}`,
                    orgName: key}, value))
            }
        }

        for (const key in endurance) {
            if (Object.hasOwnProperty.call(endurance, key)) {
                const value = endurance[key];
                const nameEndurance = key == "none" ? "n/a" : await getTypeName(key);

                enduranceContainer.append(createQualities({
                    name: `${nameEndurance} ${value > 1 ? '<span class="multiplier">1/4</span>' : ""}`,
                    orgName: key}, value))
            }
        }

        for (const key in immunity) {
            if (Object.hasOwnProperty.call(immunity, key)) {
                const nameImmunity = key == "none" ? "n/a" : await getTypeName(key);

                immunityContainer.append(createQualities({name: `${nameImmunity}`, orgName: key}))
            }
        }
    }catch(error){
        console.log(error);
    }
}

/*let evolutionaryChain = async () => {
    let dataSpecies = localStorage.getItem('dataSpecies') ? JSON.parse(localStorage.getItem('dataSpecies')) : '';

    let {data: dataChain} = await axios.get(dataSpecies.evolution_chain.url);

    console.log(dataSpecies);
    console.log(dataChain);

    let pokemonChain = [], subArray1 = [], subArray2 = [];

    pokemonChain.push([{name: dataChain.chain.species.name, url: dataChain.chain.species.url}]);

    for(const stage1 of dataChain.chain.evolves_to){
        pokemonChain[0][0].evolves_to = stage1.species.name;

        if(Object.keys(stage1).length > 1){
            subArray1.push({name:stage1.species.name, url: stage1.species.url,});
        }else{
            pokemonChain.push([{name: stage1.species.name, url: stage1.species.url}]);
        }

        for(const stage2 of stage1.evolves_to){
            if(Object.keys(stage2).length > 1){
                subArray2.push({name: stage2.species.name, url: stage2.species.url});
            }else{
                pokemonChain.push([{name: stage2.species.name,url: stage2.species.url}]);
            }
        }
    }

    if(subArray1.length > 0){
        pokemonChain.push(subArray1);
    }

    if(subArray2.length > 0){
        pokemonChain.push(subArray2);
    }

    console.log(pokemonChain);
}*/