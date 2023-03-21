"use strict";
import http from 'http';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let lookup = mime.lookup;
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    let path = req.url;
    console.log(__dirname);
    console.log(path);
    if (path === "/" || path === "/home") {
        path = "/index.html";
    }
    let mime_type = lookup(path.substring(1));
    console.log("mime-type: " + mime_type);
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end("Error 404 - File Not Found " + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200);
        res.end(data);
    });
});
server.listen(port, () => {
    console.log(`Server running at ${port}/`);
});
//# sourceMappingURL=server.js.map