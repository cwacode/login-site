import express from 'express';
import client from '../database.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const projectId = req.query.projectId;
    try {
        const query = projectId
            ? 'SELECT * FROM events WHERE projects_id = $1'
            : 'SELECT * FROM events';
        const values = projectId ? [projectId] : [];
        const { rows } = await client.query(query, values);
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { title, description, projects_id } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO events (title, description, projects_id) VALUES ($1, $2, $3) RETURNING *',
            [title, description, projects_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, projects_id } = req.body;
    try {
        const result = await client.query(
            'UPDATE events SET title = $1, description = $2, projects_id = $3 WHERE id = $4 RETURNING *',
            [title, description, projects_id, id]
        );
        if (result.rows.length) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query(
            'DELETE FROM events WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length) {
            res.json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
