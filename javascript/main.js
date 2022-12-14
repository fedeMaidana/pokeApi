const api = axios.create({baseURL: 'https://pokeapi.co/api/v2'});

let poke = async (id) => {
    /*let response = await fetch(URL_POKE(id));
    let data = await response.json();*/

    try{
        let {data} = await api(`/pokemon/${id}/`);
        let {data: dataSpecies} = await api(`/pokemon-species/${id}/`);
        let {data: dataFemale} = await api(`/gender/1/`);
        let {data: dataMale} = await api(`/gender/2/`);
        let {data: dataGenderless} = await api(`/gender/3/`);

        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('dataSpecies', JSON.stringify(dataSpecies));
        localStorage.setItem('dataFemale', JSON.stringify(dataFemale));
        localStorage.setItem('dataMale', JSON.stringify(dataMale));
        localStorage.setItem('dataGenderless', JSON.stringify(dataGenderless));

        location.hash = data.name;
        hiddenArrow();
        pokeName();
        pokeImage();
        pokeType();
        pokeGraph();
        pokeDescription();
        pokeHeight();
        pokeWeight();
        pokeGender(data.name);
        pokeCategory();
        pokeAbility();
        pokeHiddenAbility();
        pokeQualities();
        evolutionaryChain();
    }catch(error){
        console.log(error);
    }
}

poke(randomN);