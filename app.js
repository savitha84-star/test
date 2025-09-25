document.addEventListener('DOMContentLoaded', () => {
    let ccEverywhere;

    async function initializeSDK() {
        try {
            ccEverywhere = await window.CCEverywhere.initialize(
                {
                    clientId: '0ddc19366347489ab01b9b476e76c779', // replace with your client ID if needed
                    appName: 'Project 2',
                },
                {
                    callbacks: {
                        onPublish: (publishParams) => {
                            const resultContainer = document.getElementById('result-container');
                            resultContainer.innerHTML = '<h2>Your Creative is Ready!</h2>';

                            // Download link
                            const downloadLink = document.createElement('a');
                            downloadLink.href = publishParams.asset.data;
                            downloadLink.download = 'my-creative.jpeg';
                            downloadLink.innerText = '➡️ Download Image';
                            resultContainer.appendChild(downloadLink);

                            // Edit later link
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
        } catch (e) {
            console.error("SDK Initialization Failed:", e);
        }
    }

    initializeSDK();

    const generateButton = document.getElementById('generateBtn');

    generateButton.addEventListener('click', () => {
        if (!ccEverywhere) {
            alert("SDK is not ready yet. Please wait a moment and try again.");
            return;
        }

        try {
            const titleText = document.getElementById('title').value;
            const selectedDims = document.getElementById('dimensions').value.split('x');
            const width = parseInt(selectedDims[0]);
            const height = parseInt(selectedDims[1]);

            // Correct v4 API: use launch() instead of openEditor()
            ccEverywhere.launch({
                config: {
                    dimensions: { width, height },
                    elements: [
                        {
                            type: "text",
                            text: titleText,
                            style: { fontSize: 72 }
                        }
                    ]
                }
            });
        } catch (e) {
            console.error("Error launching editor:", e);
        }
    });
});
