"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Added Todo,", todo: newTodo, todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'Updated Todo', todos: todos });
    }
    res.status(402).json({ message: "COuld ot find todo for this id." });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({ message: "Delted todo", todos: todos });
});
exports.default = router;
