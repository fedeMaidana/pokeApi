const URL_POKE = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

let pokeChart;

let poke = async (id) => {

    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    console.log(data);

    let arrowL = document.getElementById('arrow-left');
    let arrowR = document.getElementById('arrow-right');

    arrowL.onclick = () => arrowLeft(data.id);
    arrowR.onclick = () => arrowRight(data.id);

    pokeName(data.id);
    pokeImage(data.id);
    pokeType(data.id);
    pokeGraph(data.id);
}

let pokeName = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let h1 = document.querySelector('h1');

    h1.innerHTML = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.°${data.id.toString().padStart(3, 0)}`;
}

let pokeImage = async (id) => {
    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let img = document.getElementById('img-poke');

    img.src = data.sprites.other["official-artwork"].front_default;
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
        typesPoke[0].setAttribute('style', 'grid-template-columns: 1fr 1fr;')
        secondTypePoke[0].style.display = 'grid';
        secondType.setAttribute('style', 'display: grid')
    }else{
        typesPoke[0].setAttribute('style', 'grid-template-columns: 1fr;')
        secondTypePoke[0].style.display = 'none';
        secondType.setAttribute('style', 'display: none')
    }

    let color;
    let text;

    for(let i = 0; i < 2; i++){

    switch(data.types[i].type.name) {
        case "normal":
            color = 'rgb(164, 172, 175)';
            text = "Normal";
            break;
        case "fighting":
            color = 'rgb(213, 103, 35)';
            text = "Lucha";
            break;
        case "flying":
            color = 'rgb(61, 199, 239)';
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
            type.innerHTML = text;
        }

        if(data.types.length == 2){
            secondTypePoke[0].style.backgroundColor = color;
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
                        display: false,
                    },
                    grid: {
                        color: 'rgba(122, 198, 12, .4)'
                    },
                    pointLabels: {
                        color: 'rgb(0, 0, 0)'
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

let pokeRandom = async () => {
    let randomNumber = Math.floor((Math.random() * (898 - 1 + 1)) + 1);

    poke(randomNumber);
}

pokeRandom();