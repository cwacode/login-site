import express from 'express';
import client from '../database.js'

const router = express.Router();

router.get('/api/projects', async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM projects');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.post('/api/projects', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO projects (title, description, status) VALUES ($1, $2, $3) RETURNING *',
            [title, description, status]
        );
        res.status(201).json(result.rows[0]);
        console.log(result.rows[0])
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const result = await client.query(
            'UPDATE projects SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
            [title, description, status, id]
        );
        if (result.rows.length) {
            res.json(result.rows[0]);
            console.log(result.rows[0])
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query(
            'DELETE FROM projects WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length) {
            res.json({ message: 'Project deleted successfully' });
            console.log({ message: 'Project deleted successfully' })
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
  });
  

  export default router;