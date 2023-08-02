require('dotenv').config();
const cors = require('cors');
const express = require('express');

const todoRoutes = require('./src/routes/todos.routes');
const adminRoutes = require('./src/routes/admin.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PORT } = process.env;
const corsOptions = {
  credentials: true,
  origin: 'https://bgtodotest.netlify.app',
};

app.use(cors(corsOptions));

app.use('/admin', adminRoutes);
app.use('/todo', todoRoutes);

app.listen(PORT, (err) => {
  if (err) return console.log('Server failed to launch.', err.message);
  console.error(`🤖 Server up at http://localhost:${PORT}`);
});
