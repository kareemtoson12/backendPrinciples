const express = require('express');
const app = express();
const PORT = 3000;
// middleware that tells the app to use json
app.use(express.json());

// middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/simple', (req, res) => {
  res.json({ message: 'أهلاً بك! ده رد من Simple GET Request' });
});

app.put('/preflight', (req, res) => {
  res.json({
    message: 'تم استقبال الـ PUT Request بنجاح بعد الـ OPTIONS!',
    receivedData: req.body
  });
});

// ==========================================
app.get('/status/:code', (req, res) => {
  const code = parseInt(req.params.code);
  res.status(code).json({
    statusCode: code,
    message: `السيرفر رد عليك بكود ${code}`
  });
});
let currentData = { name: 'Karim', role: 'Backend Learner' };
let currentETag = '"v1"';
app.get('/cached-data', (req, res) => {
  // لو المتصفح بعت نفس الـ ETag اللي عندنا، نرد بـ 304 من غير ما نبعت الداتا تاني
  if (req.headers['if-none-match'] === currentETag) {
    return res.status(304).end();
  }

  res.setHeader('ETag', currentETag);
  res.setHeader('Cache-Control', 'no-cache'); // بنقول للمتصفح اسأل السيرفر كل مرة بالـ ETag
  res.json(currentData);
});

// Endpoint تغير الداتا والـ ETag
app.post('/update-data', (req, res) => {
  currentData.role = 'Express Developer';
  currentETag = '"v2"';
  res.json({ message: 'تم تحديث الداتا والـ ETag بقى v2' });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});