// This is the correct structure
async function initializeSDK() {
    ccEverywhere = await window.CCEverywhere.initialize(
        // First object for credentials
        {
            clientId: '0ddc19366347489ab01b9b476e76c779',
            appName: 'Project 2',
        },
        // Second object for callbacks
        {
            callbacks: {
                onPublish: (publishParams) => {
                    console.log('Project Published!', publishParams);
                    
                    const resultContainer = document.getElementById('result-container');
                    resultContainer.innerHTML = '<h2>Your Creative is Ready!</h2>';

                    const downloadLink = document.createElement('a');
                    downloadLink.href = publishParams.asset.data;
                    downloadLink.download = 'my-creative.jpeg';
                    downloadLink.innerText = '➡️ Download Image';
                    resultContainer.appendChild(downloadLink);

                    const editLink = `https://express.adobe.com/project/${publishParams.projectId}/`;
                    const editAnchor = document.createElement('a');
                    editAnchor.href = editLink;
                    editAnchor.target = '_blank';
                    editAnchor.innerText = '✏️ Edit this project again later';
                    resultContainer.appendChild(editAnchor);
                },
            },
        }
    );
}
