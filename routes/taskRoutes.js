const express = require('express');
const router = express.Router();
const dbService = require('../services/firebaseService');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const { category, completed } = req.query;
    let tasks = await dbService.getCollection('tasks');

    if (category && category !== 'All') {
      tasks = tasks.filter(t => t.category && t.category.toLowerCase() === category.toLowerCase());
    }
    if (completed !== undefined) {
      const isComp = completed === 'true';
      tasks = tasks.filter(t => Boolean(t.completed) === isComp);
    }

    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new task
router.post('/', async (req, res) => {
  try {
    const { timeline, title, category, priority, assignedTo, completed } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Task title is required' });
    }

    const newTask = await dbService.createDoc('tasks', {
      timeline: timeline || 'Upcoming',
      title,
      category: category || 'General',
      priority: priority || 'Medium',
      assignedTo: assignedTo || 'Unassigned',
      completed: Boolean(completed)
    });

    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update task (e.g. toggle completion status)
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbService.updateDoc('tasks', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await dbService.deleteDoc('tasks', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
