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
  await Todo.create({ email, username, task, status: false, edited: false });
  res.sendStatus(201);
});

router.patch('/edited', async (req, res) => {
  if (!req.app.locals.user) return res.sendStatus(403);
  const { id, newText } = req.body;
  const todo = await Todo.findOne({ where: { id } });
  if (todo.task === newText) return res.sendStatus(304);
  todo.edited = true;
  todo.task = newText;
  todo.save();
  res.sendStatus(204);
});

router.patch('/:id', async (req, res) => {
  if (!req.app.locals.user) return res.sendStatus(403);
  const { id } = req.params;
  const todo = await Todo.findOne({ where: { id } });
  todo.status = !todo.status;
  todo.save();
  res.sendStatus(204);
});

module.exports = router;
