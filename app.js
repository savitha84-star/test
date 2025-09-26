document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");

  generateBtn.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const [width, height] = document.getElementById("dimensions").value.split("x");

    window.Canva.DesignButton.initialize({
      apiKey: "YOUR_CANVA_CLIENT_ID", // 👈 from your Canva developer dashboard
      onDesignOpen: (design) => {
        console.log("✅ Design opened in Canva:", design);
      },
      design: {
        type: "poster",
        dimensions: { width: parseInt(width), height: parseInt(height) },
        elements: [
          {
            type: "text",
            text: title,
            position: { x: 100, y: 100 },
            fontSize: 48
          }
        ]
      }
    });

    window.Canva.DesignButton.open();
  });
});
