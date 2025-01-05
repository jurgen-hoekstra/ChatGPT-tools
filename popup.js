document.getElementById("copy").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const turns = document.querySelectorAll('.group.conversation-turn');
        const content = Array.from(turns)
          .map(turn => turn.textContent.trim())
          .join('\n');
        navigator.clipboard.writeText(content)
          .then(() => alert('Copied to clipboard!'))
          .catch(err => alert('Failed to copy: ' + err.message));
      }
    });
  });
  
  document.getElementById("download").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const turns = document.querySelectorAll('.group.conversation-turn');
        const content = Array.from(turns)
          .map(turn => turn.textContent.trim())
          .join('\n');
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chat-log.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  });
  