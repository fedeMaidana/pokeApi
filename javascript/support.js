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

    Object.keys(typeColor).forEach((element, i) => {
        if(Object.keys(typeColor)[i] === name){
            color =  typeColor[name];
        }
    });

    return color;
}