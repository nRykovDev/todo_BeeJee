require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const todoRoutes = require('./src/routes/todos.routes');
const adminRoutes = require('./src/routes/admin.routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PORT, COOKIE_SECRET } = process.env;
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(
  session({
    name: 'UserAuth',
    store: new FileStore(),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 2,
      httpOnly: true,
    },
  })
);

app.use('/admin', adminRoutes);
app.use('/todo', todoRoutes);

app.listen(PORT, (err) => {
  if (err) return console.log('Server failed to launch.', err.message);
  console.error(`🤖 Server up at http://localhost:${PORT}`);
});
