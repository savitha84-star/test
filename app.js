document.addEventListener('DOMContentLoaded', () => {
    let ccEverywhere;

    async function initializeSDK() {
        try {
            console.log("Attempting to initialize SDK...");
            ccEverywhere = await window.CCEverywhere.initialize({
                clientId: '0ddc19366347489ab01b9b476e76c779',
                appName: 'Project 2',
            }, {
                callbacks: {
                    onPublish: (publishParams) => {
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
            });
            console.log("SDK Initialized Successfully.");
        } catch (e) {
            console.error("SDK Initialization Failed:", e);
        }
    }

    initializeSDK();

    const generateButton = document.getElementById('generateBtn');

    generateButton.addEventListener('click', () => {
        if (!ccEverywhere) {
            console.error("SDK is not ready yet. Please wait a moment and try again.");
            return;
        }

        try {
            const titleText = document.getElementById('title').value;
            const selectedDims = document.getElementById('dimensions').value.split('x');
            const width = parseInt(selectedDims[0]);
            const height = parseInt(selectedDims[1]);

            ccEverywhere.editor.createDesign({
                input: {
                    asset: {
                        width: width,
                        height: height,
                        type: "image"
                    },
                    elements: [{
                        type: "text",
                        content: titleText,
                        style: { fontSize: 72 }
                    }]
                },
                output: {
                    projectFormat: "project:id"
                }
            });
        } catch (e) {
            console.error("Error creating design:", e);
        }
    });
});
