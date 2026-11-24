const express = require('express');
const app = express();
const PORT = 3000;

app.set('etag', false); // مهم: عشان Express ميبعتش ETag تلقائي يبوظ التجربة
app.use(express.json());

let resource = {
  title: 'HTTP Caching Guide',
  version: 1,
  updatedAt: new Date().toUTCString()
};
let resourceETag = '"v1-hash"';

app.get('/cached-data', (req, res) => {
  const clientETag = req.headers['if-none-match'];
  const clientModifiedSince = req.headers['if-modified-since'];

  if (clientETag === resourceETag || clientModifiedSince === resource.updatedAt) {
    console.log('-> Client has latest version. Sending 304 Not Modified.');
    res.setHeader('Cache-Control', 'public, max-age=10');
    res.setHeader('ETag', resourceETag);
    res.setHeader('Last-Modified', resource.updatedAt);
    return res.status(304).end();
  }

  console.log('-> Sending fresh 200 OK response.');
  res.setHeader('Cache-Control', 'public, max-age=10');
  res.setHeader('ETag', resourceETag);
  res.setHeader('Last-Modified', resource.updatedAt);
  res.json(resource);
});

app.post('/update-data', (req, res) => {
  resource.version += 1;
  resource.updatedAt = new Date().toUTCString();
  resourceETag = `"v${resource.version}-hash"`;

  console.log(`-> Resource updated to version ${resource.version}`);
  res.json({ message: 'Resource updated!', resource, newETag: resourceETag });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});