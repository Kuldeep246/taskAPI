import Task from '../model/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = new Task({
      title,
      description,
      dueDate,
      status,
      assignedUserId: req.user.userId
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedUserId: req.user.userId
    }).populate('assignedUserId');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const query = { assignedUserId: req.user.userId };
    if (req.query.status) query.status = req.query.status;

    const tasks = await Task.find(query).populate('assignedUserId');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedUserId: req.user.userId
      },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      assignedUserId: req.user.userId
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
