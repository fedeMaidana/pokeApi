let iGeneralStyles = (display0, display1, display2, display3, gridTemplate) => {
    immnunityTypeNone.style.display = display0;
    immnunityType1.style.display = display1;
    immnunityType2.style.display = display2;
    immnunityType3.style.display = display3;

    typesContainerImmunity.style.gridTemplate = gridTemplate;
}

let iStylesTypeNone = (borderColor, text, color) => {
    immnunityTypeNone.style.backgroundColor = borderColor;
    immnunityTextNone.innerHTML = text;
    immnunityTextNone.style.color = color;
}

let iType = (data, type, text, i, number, element) => {
    type.style.display = 'grid';

    if(i == number){
        type.style.backgroundColor = pokeTypeColor(element.name);

        position = data.names.findIndex(info => info.language.name === 'es');
        text.innerHTML = data.names[position].name;
    }
}