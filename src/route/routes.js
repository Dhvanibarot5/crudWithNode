const express = require("express");
const router = express.Router();

const budgetModel = require("../model/budget.model");
const expenseModel = require("../model/expense.model");

router.get("/demo", (req, res) => {
  res.send("Welcome to the Budget Tracker API");
});

app.get("/", async (req, res) => {
  try {
    const bdData = await budgetModel.findOne();
    const expenses = await expenseModel.find();

    const totalBudget =  bdData?.amount || 0;
    const totalExpenses = expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;
    const budgetLeft = totalBudget - totalExpenses;

    res.render("MainBudget", {
      totalBudget,
      totalExpenses,
      budgetLeft,
      expenses,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.post("/addBudget", async (req, res) => {
//   const existing = await Budget.findOne();
//   const amount = parseFloat(req.body.budget);

//   if (existing) {
//     existing.amount = amount;
//     await existing.save();
//   } else {
//     await Budget.create({ amount });
//   }
//   res.redirect("/");
// });

// app.post("/addexp", async (req, res) => {
//   const { title, amount } = req.body;
//   await Expense.create({ title, amount: parseFloat(amount) });
//   res.redirect("/");
// });

// app.post("/reset", async (req, res) => {
//   await Budget.deleteMany();
//   await Expense.deleteMany();
//   res.redirect("/");
// });

// app.post("/deleteexp/:id", async (req, res) => {
//   await Expense.findByIdAndDelete(req.params.id);
//   res.redirect("/");
// });

module.exports = router;
