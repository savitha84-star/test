// Wait for the entire HTML page to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    let ccEverywhere; // This variable will hold the initialized Adobe SDK object

    // This is an async function because we need to wait for the SDK to initialize
    async function initializeSDK() {
        ccEverywhere = await window.CCEverywhere.initialize(
            // 1. Your project credentials
            {
                clientId: '0ddc19366347489ab01b9b476e76c779',
                appName: 'Project 2',
            },
            // 2. Callbacks: These are functions that run when certain events happen
            {
                callbacks: {
                    onPublish: (publishParams) => {
                        console.log('Project Published!', publishParams);
                        
                        // Find the div where we will show the results
                        const resultContainer = document.getElementById('result-container');
                        
                        // Clear any previous results
                        resultContainer.innerHTML = '<h2>Your Creative is Ready!</h2>';

                        // Create a download link for the new image
                        const downloadLink = document.createElement('a');
                        downloadLink.href = publishParams.asset.data; // The image data from Adobe
                        downloadLink.download = 'my-creative.jpeg';   // The default filename for the download
                        downloadLink.innerText = '➡️ Download Image';
                        resultContainer.appendChild(downloadLink);

                        // Create the permanent "edit" link for the project
                        const editLink = `https://express.adobe.com/project/${publishParams.projectId}/`;
                        const editAnchor = document.createElement('a');
                        editAnchor.href = editLink;
                        editAnchor.target = '_blank'; // This makes the link open in a new tab
                        editAnchor.innerText = '✏️ Edit this project again later';
                        resultContainer.appendChild(editAnchor);
                    },
                },
            }
        );
    }
    
    // Call the function to initialize the SDK as soon as the page loads
    initializeSDK();

    // Find the generate button on the page
    const generateButton = document.getElementById('generateBtn');

    // Add a "click" event listener to the button
    generateButton.addEventListener('click', () => {
        // When the button is clicked, get the current values from the form
        const titleText = document.getElementById('title').value;
        const selectedDims = document.getElementById('dimensions').value.split('x');
        const width = parseInt(selectedDims[0]);
        const height = parseInt(selectedDims[1]);

        // CORRECTED LINE: Launch the Adobe Express editor using ccEverywhere.editor
        ccEverywhere.editor.createDesign({
            input: {
                asset: {
                    width: width,
                    height: height,
                    type: "image"
                },
                elements: [
                    {
                        type: "text",
                        content: titleText,
                        style: {
                            fontSize: 72
                        }
                    }
                ]
            },
            output: {
                projectFormat: "project:id"
            }
        });
    });
});
