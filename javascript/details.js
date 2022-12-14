let randomN = pokeRandom();
//let randomN = 60;

let hiddenArrow = (id) => {
    if(window.outerWidth > 425){
        if(id > 1 && id < 905){
            mainContainer.style.gridTemplateColumns = '1fr 3fr 4fr 1fr';
            arrowLeft.style.display = 'grid';
        }else if(id == 1){
            mainContainer.style.gridTemplateColumns = '4fr 4fr 1fr';
            arrowLeft.style.display = 'none';
        }

        if(id < 905 && id > 1){
            mainContainer.style.gridTemplateColumns = '1fr 3fr 4fr 1fr';
            arrowRight.style.display = 'grid';
        }else if(id == 905){
            mainContainer.style.gridTemplateColumns = '1fr 3fr 4fr';
            arrowRight.style.display = 'none';
        }
    }
}

function pokeRandom (){
    try{
        return Math.floor((Math.random() * (905 - 1 + 1)) + 1);
    }catch(error){
        console.log(error);
    }
}