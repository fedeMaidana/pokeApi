buttonSearch.addEventListener('click', function(){
    if(inputSearch.value != ''){
        pokeSearch();
    }
});

inputSearch.addEventListener('keyup', function(key){
    if(key.keyCode == keys.ENTER){
        if(inputSearch.value != ''){
            pokeSearch();
        }
    }
});

async function pokeSearch (){
    try{
        let {data: dataName} = await api(`/pokemon/?limit=1154`);
        let url;

        lowercaseLetter = inputSearch.value.charAt(0).toLowerCase();
        inputSearch.value = lowercaseLetter + inputSearch.value.slice(1);

        dataName.results.forEach(element => {
            if(inputSearch.value == element.name){
                url = element.url;
            }
        });

        let {data: dataUrl} = await axios.get(url);

        if(inputSearch.value == dataUrl.name){
            poke(randomN = dataUrl.id);
            inputSearch.value = '';
        }
    }catch(error){
        console.log(error);
    }
}