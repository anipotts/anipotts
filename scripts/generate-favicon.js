const fs = require("fs");
const https = require("https");

// Read the SVG content
const svgContent = fs.readFileSync("./public/favicon.svg", "utf8");

// Encode SVG to base64 for use in HTML
const base64Svg = Buffer.from(svgContent).toString("base64");
const dataUri = `data:image/svg+xml;base64,${base64Svg}`;

console.log("✅ SVG favicon generated");
console.log("📝 To use this favicon, add the following to your layout.tsx:");
console.log(`
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/favicon.svg" />
`);

// Create a simple HTML file to test the favicon
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>Favicon Test</title>
</head>
<body>
  <h1>Check the browser tab for the heart favicon</h1>
</body>
</html>
`;

fs.writeFileSync("./public/favicon-test.html", htmlContent);
console.log("✅ Test file created at /public/favicon-test.html");
