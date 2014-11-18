function createOverlayElement(top, left, width, height, borderWidth) {
    borderWidth = (typeof borderWidth === 'undefined') ? 6 : borderWidth;
    var element = document.createElement('div');
    var style = element.style;
    top -= borderWidth;
    left -= borderWidth;
    style.position = 'absolute';
    style.top = top + 'px';
    style.left = left + 'px';
    style.width = width + 'px';
    style.height = height + 'px';
    style.background = 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,.8) 7%) 0 0,'+
    'linear-gradient(245deg, transparent 50%, rgba(255,255,255,.8) 7%) 0 0,'+
    'linear-gradient(90deg, transparent 50%, rgba(255,255,255,.8) 7%) 7px -15px,'+
    'linear-gradient(245deg, transparent 50%, rgba(255,255,255,.8) 7%) 7px -15px,#36c';
    style.backgroundColor = 'red';
    style.backgroundSize = '3px 3px';
    style.border = borderWidth + 'px solid red';
    style.zIndex = 1000;
    style.opacity = 0.8;
    style.cursor = 'pointer';
    style.mix
    return element;
}

function overlayElementClick(e) {

    window.open(e.target.data, '_blank');

}

var anchorElements = document.getElementsByTagName('a');

for (var i = 0, count = anchorElements.length; i < count; i++) {
    var anchorElement = anchorElements[i];
    var boundingRect = anchorElement.getBoundingClientRect();
    var overlayElement = createOverlayElement(boundingRect.top + window.scrollY,
        boundingRect.left + window.scrollX,
        boundingRect.width,
        boundingRect.height);

    overlayElement.data = anchorElement.href;

    overlayElement.addEventListener('click', overlayElementClick);

    document.body.appendChild(overlayElement);
}

var imageElements = document.querySelectorAll('img[usemap]');

for (var i = 0, count = imageElements.length; i < count; i++) {
    var imageElement = imageElements[i];
    var boundingRect = imageElement.getBoundingClientRect();
    var mapElement = document.getElementsByName(imageElement.useMap.replace('#', ''))[0];
    var areaElements = mapElement.getElementsByTagName('area');

    for (var j = 0, jCount = areaElements.length; j < jCount; j++) {
        var areaElement = areaElements[j];
        var areaCoordinates = areaElement.coords.split(',').map(function (value) {
            return parseInt(value);
        });

        var overlayElement = createOverlayElement(boundingRect.top + window.scrollY + areaCoordinates[1],
            boundingRect.left + window.scrollX + areaCoordinates[0],
            areaCoordinates[2] - areaCoordinates[0],
            areaCoordinates[3] - areaCoordinates[1]
        );

        document.body.appendChild(overlayElement);

    }
}