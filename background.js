async function closeTabsTo(currentTab, directionLeft = false) {
    let tabs = await browser.tabs.query({ currentWindow: true });
    if (!directionLeft) tabs = tabs.reverse()
    let number = 0;
    for (const tab of tabs) {
        if (tab.id === currentTab.id) break;
        browser.tabs.remove(tab.id);
        number += 1;
    }
    browser.notifications.create({
        "type": "basic",
        "title": browser.i18n.getMessage("extensionName"),
        "message": browser.i18n.getMessage("closedNumberNotification", number)
    });
}
browser.browserAction.onClicked.addListener((activeTab) => {
    closeTabsTo(activeTab, false);
});
browser.contextMenus.create({
  id: "closeTabsToLeft",
  title: browser.i18n.getMessage("closeTabsToLeft"),
  contexts: ["browser_action"],
  onclick: async () => {
      const [activeTab] = await browser.tabs.query({ currentWindow: true, active: true });
      closeTabsTo(activeTab, true);
  }
});
