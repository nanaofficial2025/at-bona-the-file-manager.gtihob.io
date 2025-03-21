// Array to store uploaded files (simulated storage)
let storedFiles = [];

// DOM Elements
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');
const fileList = document.getElementById('fileList');

// Upload File
uploadBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (file) {
    // Simulate file storage
    storedFiles.push(file);
    updateFileList();
    uploadStatus.textContent = `File "${file.name}" uploaded successfully!`;
  } else {
    uploadStatus.textContent = 'Please select a file to upload.';
  }
});

// Display Stored Files
function updateFileList() {
  fileList.innerHTML = ''; // Clear the list
  storedFiles.forEach((file, index) => {
    const listItem = document.createElement('li');

    // File Name
    const fileName = document.createElement('span');
    fileName.textContent = file.name;
    listItem.appendChild(fileName);

    // Download Button
    const downloadLink = document.createElement('a');
    downloadLink.textContent = 'Download';
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = file.name;
    listItem.appendChild(downloadLink);

    // Share Download Link Button
    const shareLinkBtn = document.createElement('button');
    shareLinkBtn.textContent = 'Share Link';
    shareLinkBtn.addEventListener('click', () => {
      const fileURL = URL.createObjectURL(file);
      navigator.clipboard.writeText(fileURL).then(() => {
        alert(`Download link for "${file.name}" copied to clipboard!`);
      });
    });
    listItem.appendChild(shareLinkBtn);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      storedFiles.splice(index, 1); // Remove file from array
      updateFileList(); // Refresh the list
    });
    listItem.appendChild(deleteBtn);

    fileList.appendChild(listItem);
  });
}

// Initialize file list on page load
updateFileList();