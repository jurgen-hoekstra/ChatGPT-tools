// Fetch and display files from the imports folder
async function loadFiles() {
  const fileListDiv = document.getElementById("file-list");

  // Simulating file fetching (replace with actual API or logic if using Node.js)
  const files = await fetch('imports.json').then(res => res.json()); // Simulated list

  files.forEach(file => {
    const fileDiv = document.createElement("div");
    fileDiv.innerHTML = `
      <p>${file}</p>
      <button onclick="transformFile('${file}')">Transform</button>
    `;
    fileListDiv.appendChild(fileDiv);
  });
}

// Transform a selected file
async function transformFile(fileName) {
  const response = await fetch(`./imports/${fileName}`);
  const htmlContent = await response.text();

  // Extract content (e.g., `.group.conversation-turn`) and generate new HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const turns = doc.querySelectorAll('.group.conversation-turn');
  const content = Array.from(turns).map(turn => `<p>${turn.textContent.trim()}</p>`).join("\n");

  // Save transformed content as a new HTML file
  const newHtmlContent = `
    <!DOCTYPE html>
    <html>
    <head><title>Transformed Chat</title></head>
    <body>${content}</body>
    </html>
  `;
  const blob = new Blob([newHtmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `transformed-${fileName}`;
  link.click();
}

loadFiles();
