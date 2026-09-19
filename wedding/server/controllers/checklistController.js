const Checklist = require('../models/Checklist');
const { getDbStatus } = require('../config/db');

const fallbackChecklist = [
  { _id: 'chk_1', task: 'Meet with both family priests / celebrants to align ritual timings', timeline: '6 Months Before', category: 'Ceremony Protocol', ceremonyTag: 'Both Rites', assignedTo: 'Couple & Elders', completed: true },
  { _id: 'chk_2', task: 'Finalize bilingual dual-script letterpress invitation wording', timeline: '4 Months Before', category: 'Stationery', ceremonyTag: 'Shared', assignedTo: 'Couple', completed: true },
  { _id: 'chk_3', task: 'Curate regional folk musicians (Nadaswaram & Punjabi Dhol)', timeline: '3 Months Before', category: 'Entertainment', ceremonyTag: 'Cultural Performers', assignedTo: 'Planner', completed: false },
  { _id: 'chk_4', task: 'Schedule dual-cultural food tasting & signature botanical spice cocktail trials', timeline: '2 Months Before', category: 'Gastronomy', ceremonyTag: 'Culinary Team', assignedTo: 'Couple', completed: false }
];

exports.getChecklist = async (req, res, next) => {
  try {
    const { completed, category } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const filter = {};
      if (completed !== undefined) filter.completed = completed === 'true';
      if (category) filter.category = category;
      const tasks = await Checklist.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, count: tasks.length, data: tasks });
    }

    let result = fallbackChecklist;
    if (completed !== undefined) result = result.filter(t => t.completed === (completed === 'true'));
    if (category) result = result.filter(t => t.category === category);
    res.json({ success: true, count: result.length, data: result, source: 'memory-fallback' });
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { task, timeline, category, ceremonyTag, assignedTo, completed, dueDate, notes } = req.body;
    if (!task) {
      return res.status(400).json({ success: false, error: 'Task title is required' });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const item = await Checklist.create({
        task: task.trim(),
        timeline: timeline || 'Upcoming',
        category: category || 'General',
        ceremonyTag: ceremonyTag || 'Shared',
        assignedTo: assignedTo || 'Couple',
        completed: Boolean(completed),
        dueDate: dueDate || null,
        notes: notes || '',
      });
      return res.status(201).json({ success: true, data: item });
    }

    const newTask = {
      _id: 'chk_' + Date.now(),
      task: task.trim(),
      timeline: timeline || 'Upcoming',
      category: category || 'General',
      ceremonyTag: ceremonyTag || 'Shared',
      assignedTo: assignedTo || 'Couple',
      completed: Boolean(completed),
      dueDate: dueDate || null,
      notes: notes || '',
    };
    fallbackChecklist.push(newTask);
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const task = await Checklist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
      return res.json({ success: true, data: task });
    }

    const idx = fallbackChecklist.findIndex(t => t._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Task not found' });
    fallbackChecklist[idx] = { ...fallbackChecklist[idx], ...req.body };
    res.json({ success: true, data: fallbackChecklist[idx] });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const task = await Checklist.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
      return res.json({ success: true, message: 'Task deleted' });
    }

    const idx = fallbackChecklist.findIndex(t => t._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Task not found' });
    fallbackChecklist.splice(idx, 1);
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
