document.addEventListener("DOMContentLoaded", function() {
    function handleFileSelect(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            const fileContent = reader.result;
            document.getElementById('editor').value = fileContent;
            document.getElementById('file-name').value = file.name.replace(/\.[^/.]+$/, ""); // Fill file name input
        };

        reader.readAsText(file);
    }

    document.getElementById('save-btn').addEventListener('click', function() {
        const fileName = document.getElementById('file-name').value.trim();
        const content = document.getElementById('editor').value;
        
        if (!fileName) {
            alert('Please enter a file name.');
            return;
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = fileName + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    const container = document.querySelector('.container');

    container.addEventListener('dragover', function(event) {
        event.preventDefault();
        container.classList.add('drag-over');
    });

    container.addEventListener('dragleave', function(event) {
        event.preventDefault();
        container.classList.remove('drag-over');
    });

    container.addEventListener('drop', function(event) {
        event.preventDefault();
        container.classList.remove('drag-over');

        const file = event.dataTransfer.files[0];
        const fileName = file.name;
        const fileType = file.type;

        if (fileType !== 'text/plain') {
            alert('This is not a TXT file, please try again.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function() {
            const fileContent = reader.result;
            document.getElementById('editor').value = fileContent;
            document.getElementById('file-name').value = fileName.replace(/\.[^/.]+$/, ""); // Fill file name input
        };

        reader.readAsText(file);
    });

    document.getElementById('file-input').addEventListener('change', handleFileSelect);
});
