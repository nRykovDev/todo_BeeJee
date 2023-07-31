const router = require('express').Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (username === 'admin' && password === '123')
    return res.json({ authorized: true });
  res.json({ authorized: false });
});

module.exports = router;
