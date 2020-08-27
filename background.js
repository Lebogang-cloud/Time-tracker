const tabTimeObjectKey = "tabTimesObject";
const lastActiveTabKey = "lastActiveTab";

chrome.runtime.onInstalled.addEventListener(function(){
    chrome.storage.sync.set({color: '#3aa757'}, function(){
        console.log('This color is green');
    });
    chrome.declaractiveContent.onPageChanged.removeRules(undefined, function(){
        chrome.declaractiveContent.onPageChanged.addRules([{
            condition: [new chrome.declaractiveContent.PageStateMatcher({
                pageUrl: {},
            })],
            action: [new chrome.declaractiveContent.showPageAction()]
        }]);
    });
});

chrome.windows.onFocusChanged.addListener(function(windowId){
    if(windowId == chrome.windows.WINDOW_ID_NONE){
        // reset the date and store the difference
        processTabChange(false);
    } else{
        processTabChange(true);
    }
});

function processTabChange(isWindowActive){
    //chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs){
        chrome.tabs.query({'active': true}, function(){
            console.log("isWindowActive:" + isWindowActive);
            console.log(tabs)

            if(tabs.lenght > 0 && tabs[0] != null){
                let currentTab = tab[0]
                let url = currentTab.url
                let title = currentTab.title;
                let hostName = url;
                
                try{
                    let urlObject = new URL(url);
                    hostName = urlObject.hostname;
                } catch(e){
                    console.log(`could not construct url from ${currentTab.url}, error ${e}`)
                }
            }
        })
}