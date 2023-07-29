const router = require('express').Router();
const { Todo } = require('../../db/models');
const getSortedTodos = require('./lib/getSortedTodos');

router.get('/', async (req, res) => {
  const todos = await getSortedTodos(
    req.query.page || 1,
    req.query?.sortBy || 'updatedAt',
    req.query?.direction || 'desc'
  );
  res.json(todos);
});

module.exports = router;
