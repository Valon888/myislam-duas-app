#!/usr/bin/env node

/**
 * Simple HTTP Server for Islamic Duas App
 * Serves static files with correct MIME types
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;
const HOST = 'localhost';

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let filePath = path.join(__dirname, parsedUrl.pathname);

    // Default to index.html for root
    if (filePath === path.join(__dirname, '/')) {
        filePath = path.join(__dirname, 'index.html');
    }

    // Prevent directory traversal attacks
    const realPath = path.resolve(filePath);
    if (!realPath.startsWith(path.resolve(__dirname))) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If file not found, serve 404
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else if (err.code === 'EISDIR') {
                // If it's a directory, try index.html
                const indexPath = path.join(filePath, 'index.html');
                fs.readFile(indexPath, (err2, data2) => {
                    if (err2) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                        res.end('<h1>404 Not Found</h1>', 'utf-8');
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', mimeTypes['.html']);
                        res.end(data2);
                    }
                });
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error', 'utf-8');
            }
        } else {
            // Determine and set content type
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            // Add caching headers
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'max-age=3600');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(data);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     🤲 Islamic Duas App Server                            ║
║                                                            ║
║     ✅ Server running at: http://localhost:${PORT}        ║
║                                                            ║
║     📖 Features:                                          ║
║        • 50+ Authentic Islamic Duas                       ║
║        • 8 Category Systems                               ║
║        • Dark Mode & Favorites                            ║
║        • Full Search & Filtering                          ║
║                                                            ║
║     💻 Open your browser and navigate to:                 ║
║        http://localhost:${PORT}                           ║
║                                                            ║
║     ✨ Press Ctrl+C to stop the server                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.log(`Try a different port: PORT=3000 node server.js`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n📴 Server shutting down...');
    server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
    });
});
