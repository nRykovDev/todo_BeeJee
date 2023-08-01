const router = require('express').Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!(username === 'admin' && password === '123')) {
    return res.json({ authorized: false });
  }
  req.session.user = { authorized: true };
  return res.json(req.session.user);
});

router.get('/logout', (req, res) => {
  req.session.destroy((e) => {
    if (e) {
      console.log(e);
      return;
    }
    res.clearCookie('UserAuth');
    res.sendStatus(200);
  });
});

router.get('/check', (req, res) => {
  if (!req.session?.user) return res.json({ authorized: false });
  res.json({ authorized: true });
});

module.exports = router;
