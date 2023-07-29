const { Todo } = require('../../../db/models'); // Import the Sequelize model for Todo Tasks

const getSortedTodos = async (
  page,
  sortBy = 'updatedAt',
  direction = 'desc'
) => {
  const limit = 3;

  const offset = (page - 1) * limit;

  const order = direction === 'asc' ? 'ASC' : 'DESC';

  try {
    const entries = await Todo.findAll({
      order: [[sortBy, order]],
      limit: limit,
      offset: offset,
      raw: true,
    });
    const entriesCount = await Todo.count();

    return { entries, entriesCount };
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
};

module.exports = getSortedTodos;
