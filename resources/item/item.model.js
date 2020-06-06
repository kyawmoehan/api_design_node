const mongoose = require('mongoose');
const { List } = require('../list/list.model');

const itemSchema = new mongoose.Schema({
    name: { maxlength: 50, required: true, trim: true, type: String },
    status: {
        type: String,
        required: true,
        default: 'active', 
        enum: ['active', 'complete', 'pastdue'] },
    notes: String,
    due: Date,
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true },
    list: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'List' }
}, 
{ timestamps: true }
);

itemSchema.index({ list: 1, name: 1 }, { unique: true });

module.exports = {
    Item: mongoose.model('Item', itemSchema)
}
