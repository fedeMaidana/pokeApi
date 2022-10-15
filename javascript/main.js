const api = axios.create({baseURL: 'https://pokeapi.co/api/v2'});

let poke = async (id) => {
    /*let response = await fetch(URL_POKE(id));
    let data = await response.json();*/

    try{
        let {data} = await api(`/pokemon/${id}/`);

        location.hash = data.name;
        hiddenArrow(data.id);
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
        pokeHiddenAbility(data.id);
        pokeQualities(data.id);
    }catch(error){
        console.log(error);
    }
}

poke(randomN);