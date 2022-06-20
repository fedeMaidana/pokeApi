const URL_POKE = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

let pokeChart;    

let poke = async (id) => {

    let response = await fetch(URL_POKE(id));
    let data = await response.json();

    let h1 = document.querySelector('h1');
    let img = document.getElementById('img-poke');

    let arrowL = document.getElementById('arrow-left');
    let arrowR = document.getElementById('arrow-right');

    h1.innerHTML = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} N.°${data.id.toString().padStart(3, 0)}`;

    img.src = data.sprites.other["official-artwork"].front_default;
    img.alt = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;

    arrowL.onclick = () => arrowLeft(data.id);
    arrowR.onclick = () => arrowRight(data.id);

    pokeGraph(data.id);
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