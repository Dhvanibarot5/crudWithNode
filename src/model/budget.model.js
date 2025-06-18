const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    }
});

const budgetModel = mongoose.model('Budget', BudgetSchema);


module.exports = budgetModel;