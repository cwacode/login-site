import express from 'express';
import client from '../database.js';

const router = express.Router();

router.get('/events', async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM events');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/events', async (req, res) => {
    const { title, description, project_id } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO events (title, description, project_id) VALUES ($1, $2, $3) RETURNING *',
            [title, description, project_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, project_id } = req.body;
    try {
        const result = await client.query(
            'UPDATE events SET title = $1, description = $2, project_id = $3 WHERE id = $4 RETURNING *',
            [title, description, project_id, id]
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

router.delete('/events/:id', async (req, res) => {
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
