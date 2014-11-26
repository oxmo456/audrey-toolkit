(function () {

    var ON = true;
    var OFF = false;
    var tabsState = {};

    function resetTab(tabId) {
        delete tabsState[tabId];
    }

    chrome.tabs.onUpdated.addListener(resetTab);

    chrome.tabs.onRemoved.addListener(resetTab);

    chrome.browserAction.onClicked.addListener(function (tab) {
        var tabId = tab.id;

        if (typeof tabsState[tabId] === 'undefined') {
            chrome.tabs.executeScript({
                file: 'main.js'
            });
            chrome.tabs.executeScript({
                code: 'main.showOverlays()'
            });
            tabsState[tabId] = ON;
        } else if (tabsState[tabId] === ON) {
            chrome.tabs.executeScript({
                code: 'main.hideOverlays()'
            });
            tabsState[tabId] = OFF;
        } else {
            chrome.tabs.executeScript({
                code: 'main.showOverlays()'
            });
            tabsState[tabId] = ON;
        }

    });

})();





