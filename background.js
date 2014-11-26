(function () {

    var PROCESSING = 0;
    var ON = 1;
    var OFF = 2;
    var tabsState = {};

    function resetTab(tabId) {
        console.log('RESET', tabId);
        delete tabsState[tabId];
        console.log(tabsState);


    }

    chrome.tabs.onUpdated.addListener(resetTab);

    chrome.tabs.onRemoved.addListener(resetTab);

    chrome.browserAction.onClicked.addListener(function (tab) {
        var tabId = tab.id;
        if (typeof tabsState[tabId] === 'undefined') {
            tabsState[tabId] = PROCESSING;
            chrome.tabs.executeScript({
                file: 'main.js'
            }, function () {
                chrome.tabs.executeScript({
                    code: 'main.showOverlays()'
                }, function () {
                    tabsState[tabId] = ON;
                });
            });
        } else if (tabsState[tabId] === ON) {
            chrome.tabs.executeScript({
                code: 'main.hideOverlays()'
            }, function () {
                tabsState[tabId] = OFF;
            });
        } else if (tabsState[tabId] === OFF) {
            chrome.tabs.executeScript({
                code: 'main.showOverlays()'
            }, function () {
                tabsState[tabId] = ON;
            });
        }
    });

})();





