
export function changeUMLColours(rectColour, textColour){
    // Loop through rects in svg String
    var rectList = Object.values(document.querySelectorAll('rect'));
    var textList = Object.values(document.querySelectorAll('text'));
    rectList.forEach(rect => {
        rect.attributes.fill.nodeValue = rectColour;
    });

    textList.forEach(text => {
        text.attributes.fill.nodeValue = textColour;
    });
}