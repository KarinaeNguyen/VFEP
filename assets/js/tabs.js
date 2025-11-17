function initTabs() {
  console.log("Initializing tabs...");

  function setupTabGroup(groupName) {
    const tabButtons = document.querySelectorAll(`[data-tab-group="${groupName}"]`);
    const tabContents = document.querySelectorAll(`[data-tab-content="${groupName}"]`);

    if (tabButtons.length === 0 || tabContents.length === 0) {
      console.warn(`No tabs found for group: ${groupName}`);
      return;
    }

    console.log(`Setting up tab group: ${groupName} with ${tabButtons.length} buttons.`);

    function switchTab(targetId) {
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });

      tabButtons.forEach(button => {
        if (button.getAttribute('data-tab-target') === targetId) {
          button.classList.add('bg-gray-700', 'text-white');
          button.classList.remove('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
        } else {
          button.classList.remove('bg-gray-700', 'text-white');
          button.classList.add('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');
        }
      });
    }

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-tab-target');
        switchTab(targetId);
      });
    });

    if (tabButtons.length > 0) {
      const defaultTabId = tabButtons[0].getAttribute('data-tab-target');
      switchTab(defaultTabId);
    }
  }

  setupTabGroup('tech-tabs');
  setupTabGroup('market-tabs');
  setupTabGroup('advantage-tabs');
}
