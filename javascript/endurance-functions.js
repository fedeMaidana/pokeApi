let eGeneralStyles = (display0, display1, display2, display3, display4, display5, display6, display7, display8, display9, display10, display11, gridTemplate) => {
    enduranceTypeNone.style.display = display0;
    type1.style.display = display1;
    type2.style.display = display2;
    type3.style.display = display3;
    type4.style.display = display4;
    type5.style.display = display5;
    type6.style.display = display6;
    type7.style.display = display7;
    type8.style.display = display8;
    type9.style.display = display9;
    type10.style.display = display10;
    type11.style.display = display11;
    typesContainer.style.gridTemplate = gridTemplate;
}

let eType = (data, type, text, area, i, number, element) => {
    type.style.display = 'grid';
    type.style.gridArea = area;

    if(i == number){
        type.style.backgroundColor = pokeTypeColor(element.name);

        position = data.names.findIndex(info => info.language.name === 'es');
        text.innerHTML = data.names[position].name;
    }
}