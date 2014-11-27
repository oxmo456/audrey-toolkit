(function (window) {

    function Main() {

        var overlayElements = [];

        function createOverlayElement(top, left, width, height, borderWidth) {
            borderWidth = (typeof borderWidth === 'undefined') ? 4 : borderWidth;
            var element = document.createElement('div');
            var style = element.style;
            top -= borderWidth;
            left -= borderWidth;
            style.position = 'absolute';
            style.top = top + 'px';
            style.left = left + 'px';
            style.width = width + 'px';
            style.height = height + 'px';
            style.borderRadius = '4px';
            style.backgroundColor = 'rgba(255,0,0,0.5)';
            style.backgroundSize = '3px 3px';
            style.border = borderWidth + 'px dashed yellow';
            style.zIndex = 1000;
            style.opacity = 0.8;
            style.cursor = 'pointer';
            style.mix
            return element;
        }

        function overlayElementClick(e) {
            window.open(e.target.title, '_blank');
        }

        function anchorElementWrapAnImageElement(anchorElement) {
            var result = false;
            for (var i = 0, count = anchorElement.childNodes.length; i < count; i++) {
                var child = anchorElement.childNodes[i];
                if (child.nodeName !== '#text' && child.nodeName === 'IMG') {
                    result = true;
                    break;
                }
            }
            return result;
        }

        this.showOverlays = function () {
            this.hideOverlays();

            var anchorElements = document.getElementsByTagName('a');

            for (var i = 0, count = anchorElements.length; i < count; i++) {
                var anchorElement = anchorElements[i];
                if (anchorElementWrapAnImageElement(anchorElement)) {
                    anchorElement.style.display = 'block';
                }
                var boundingRect = anchorElement.getBoundingClientRect();
                var overlayElement = createOverlayElement(boundingRect.top + window.scrollY,
                    boundingRect.left + window.scrollX,
                    boundingRect.width,
                    boundingRect.height);
                overlayElement.title = anchorElement.href;
                overlayElement.addEventListener('click', overlayElementClick);
                document.body.appendChild(overlayElement);
                overlayElements.push(overlayElement);
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

                    overlayElement.title = areaElement.href;
                    overlayElement.addEventListener('click', overlayElementClick);
                    document.body.appendChild(overlayElement);
                    overlayElements.push(overlayElement);

                }
            }

        };

        this.hideOverlays = function () {
            for (var i = 0, count = overlayElements.length; i < count; i++) {
                var overlayElement = overlayElements[i];
                overlayElement.removeEventListener('click', overlayElementClick);
                document.body.removeChild(overlayElement);
            }
            overlayElements.length = 0;
        };


    }


    window.main = new Main();

})(window);





