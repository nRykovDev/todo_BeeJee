const cors = require('cors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PORT, COOKIE_SECRET } = process.env;
const corsOptions = {
  credentials: true,
  origin: '*',
};

app.use(
  session({
    name: 'UserAuth',
    store: new FileStore(),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 2,
      httpOnly: true,
    },
  })
);
app.use(cors(corsOptions));

app.listen(PORT, (err) => {
  if (err) return console.log('Server failed to launch.', err.message);
  console.log(`🤖 Server up at http://localhost:${PORT}`);
});
