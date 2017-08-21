browser.browserAction.onClicked.addListener(async (activeTab) => {
    const tabs = await browser.tabs.query({ currentWindow: true });
    for (const tab of tabs.reverse()) {
        if (tab.id === activeTab.id) break;
        browser.tabs.remove(tab.id);
    }
});
