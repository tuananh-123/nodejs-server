const items = require('../models/itemModel');
const { body, validationResult } = require('express-validator');

const getItems = (req, res) => {
	return res.status(200).json({ items });
};

const getById = (req, res) => {
	const id = parseInt(req.params.id);
	const item = items.find(x => x.id === id);
	
	if (!item) return res.status(404).json({ error: "Item not found!" });
	
	return res.status(200).json({ item });
};

const insertItem = [ 
	
	body('name').isString(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ error: error.array() });
		const newItem = req.body;
		items.push(newItem);
		
		return res.status(200).json({ newItem });
	}
];
const updateItem = [
	
	body('name').isString(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ error: error.array() });
		const id = parseInt(req.params.id);
		const updateItem = req.body;
		const index = items.findIndex(x => x.id === id);
		if (index === -1) return res.status(404).json("Item not found!");
		
		items[index] = { ...items[index], ...updateItem};
		return res.status(200).json( items[index] );
	}
];

const deleteItem = (req, res) => {
	const id = parseInt(req.params.id);
	const index = items.findIndex(x => x.id === id);
	
	if (index === -1) return res.status(404).json({ error: "Item not found" });
	
	items.splice(index, 1);
	return res.status(200).json({ items });
};

module.exports = { getItems, getById, insertItem, updateItem, deleteItem };