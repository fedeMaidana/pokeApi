arrowLeft.onclick = () => {poke(randomN -= 1)};
arrowRight.onclick = () =>{poke(randomN += 1)};
mobileArrowLeft.onclick = () => {poke(randomN -= 1)};
mobileArrowRight.onclick = () => {poke(randomN += 1)};

window.onkeyup = (key) => {
    try{
        if(key.keyCode == keys.LEFT){
            poke(randomN -= 1);
        }else if(key.keyCode == keys.RIGHT){
            poke(randomN += 1);
        }
    }catch(error){
        console.log(error)
    }
}