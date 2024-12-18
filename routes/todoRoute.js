const express = require('express');
const mongoose = require('mongoose'); // For ObjectId validation
const Todo = require('../models/todoModel'); // Todo model import

const todoRoute = express.Router();

// POST Route
todoRoute.post('/todo', (req, res) => {
    const body = req.body;

    try {
        if (!body.text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const newTodo = new Todo({ text: body.text });
        newTodo.save().then((result) => {
            res.status(201).json({
                isSuccessfully: true,
                data: result,
                message: 'Successfully added',
            });
        }).catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server error', error });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// PUT Route
todoRoute.put('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id, 
            { text: body.text }, 
            { new: true } // Return updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            isSuccessfully: true,
            message: 'Successfully updated',
            data: updatedTodo,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete API
todoRoute.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Todo ID' });
    }

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({
            isSuccessfully: true,
            message: 'Successfully deleted',
            data: deletedTodo,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = todoRoute;
