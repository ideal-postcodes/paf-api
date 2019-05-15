#! /usr/bin/env node

const marked = require("marked");
const { join } = require("path");
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require("fs");

const path = "dist";
const file = "index.html";
const readme = readFileSync("./README.md", { encoding: "utf8" });

const html = `
<html>
  <head>
    <title>UK Clear Addressing API Usage</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css" />
    <style>
      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
      }

      @media (max-width: 767px) {
        .markdown-body {
          padding: 15px;
        }
      }
    </style>
    <meta charset="UTF-8">
  </head>
  <body>
    <article class="markdown-body">
    ${marked(readme)}
    </article>
  </body>
</html>
`;

const outFile = join(__dirname, path, file);

// Create dist dir if it does not exist
existsSync(path) || mkdirSync(path);

// Write landing page to file
writeFileSync(outFile, html, { encoding: "utf8" });
