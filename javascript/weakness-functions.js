let wGeneralStyle = (display1, display2, display3, display4, display5, display6, display7, gridTemplate) => {
    weaknessType1.style.display = display1;
    weaknessType2.style.display = display2;
    weaknessType3.style.display = display3;
    weaknessType4.style.display = display4;
    weaknessType5.style.display = display5;
    weaknessType6.style.display = display6;
    weaknessType7.style.display = display7;
    typesContainerWeakness.style.gridTemplate = gridTemplate;
}

let wType = (data, type, text, area, i, number, element) => {;
    type.style.display = 'grid';
    type.style.gridArea = area;

    if(i == number){
        type.style.backgroundColor = pokeTypeColor(element.name);

        pos = data.names.findIndex(info => info.language.name === 'es');
        text.innerHTML = data.names[pos].name;
    }
}