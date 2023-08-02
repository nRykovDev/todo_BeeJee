const router = require('express').Router();

// Здесь была авторизация на сессиях, но её пришлось убрать потому что хостинг с public suffix domain'ом не поддерживает cross-origin куки(
router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!(username === 'admin' && password === '123')) {
    return res.json({ authorized: false });
  }
  req.app.locals.user = { authorized: true };
  return res.json(req.app.locals.user);
});

router.get('/logout', (req, res) => {
  req.app.locals.user = null;
  res.sendStatus(200);
});

router.get('/check', (req, res) => {
  if (!req.app.locals.user) return res.json({ authorized: false });
  res.json({ authorized: true });
});

module.exports = router;
