const router = require('express').Router();
const getSortedTodos = require('../lib/getSortedTodos');
const { Todo } = require('../../db/models');

router.get('/', async (req, res) => {
  const todos = await getSortedTodos(
    req.query.page || 1,
    req.query?.sortBy || 'updatedAt',
    req.query?.direction || 'desc'
  );
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { username, email, task } = req.body;
  await Todo.create({ email, username, task, status: false });
  res.sendStatus(201);
});

module.exports = router;
