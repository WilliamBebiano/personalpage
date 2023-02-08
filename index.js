const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Hello my Astronaut");
});

app.listen(3000, () => {
  console.log('🚀Serevr listening on port 3000!');
});