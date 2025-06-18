const express = require("express");
const router = express.Router();

const budgetModel = require("../model/budget.model");
const expenseModel = require("../model/expense.model");

router.get("/demo", (req, res) => {
  res.send("Welcome to the Budget Tracker API");
});

router.get("/", async (req, res) => {
  try {
    const bdData = await budgetModel.findOne();
    const expenses = await expenseModel.find();

    const totalBudget = bdData?.amount || 0;
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

router.post("/addBudget", async (req, res) => {
  try {
    const existing = await budgetModel.findOne();
    const amount = parseFloat(req.body.budget);

    if (existing) {
      existing.amount += amount;
      await existing.save();
    } else {
      await budgetModel.create({ amount });
    }
    res.redirect("/");
  } catch (error) {
    console.error("Error adding budget:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addExpense", async (req, res) => {
  try {
    const { title, amount } = req.body;
    await expenseModel.create({ title, amount: parseFloat(amount) });
    res.redirect("/");
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/reset", async (req, res) => {
  try {
    await budgetModel.deleteMany({});
    await expenseModel.deleteMany({});
    res.redirect("/");
  } catch (error) {
    console.error("Error resetting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/deleteExpense/:id", async (req, res) => {
  try {
    const { id } = req.params;
 
    await expenseModel.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
