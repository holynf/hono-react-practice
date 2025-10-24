import { Hono } from "hono"
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive(),
})

type Expense = z.infer<typeof expenseSchema>
const createPostSchema = expenseSchema.omit({ id: true })

const fakeExpenses: Expense[] = [
    { id: 1, amount: 56, title: "abc1" },
    { id: 2, amount: 50, title: "abc2" },
    { id: 3, amount: 82, title: "abc3" },
]

export const expensesRoute = new Hono()
    .get("/", async (c) => {
        return c.json({ expenses: fakeExpenses })
    })
    .post("/", zValidator("json", createPostSchema), async (c) => {
        const expense = await c.req.valid("json")
        fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 })
        c.status(201)
        return c.json(expense)
    })
    .get("/total-spent", async (c) => {
        await new Promise((resolve) => setTimeout(resolve, 2000)) // simulate delay
        const totalSpent = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0)
        return c.json({ totalSpent })
    })
    .get("/:id{[0-9]+}", async (c) => {
        const id = Number.parseInt(c.req.param("id"))
        const expense = fakeExpenses.find((e) => e.id === id)
        if (!expense) {
            return c.json({ message: "Expense not found" }, 404)
        }
        return c.json({ expense })
    })
    .delete("/:id{[0-9]+}", async (c) => {
        const id = Number.parseInt(c.req.param("id"))
        const index = fakeExpenses.findIndex((e) => e.id === id)
        if (index === -1) {
            return c.json({ message: "Expense not found" }, 404)
        }
        const deletedExpense = fakeExpenses.splice(index, 1)
        return c.json({ message: "Expense deleted", deletedExpense: deletedExpense })
    })
    .put("/:id{[0-9]+}", zValidator("json", createPostSchema), async (c) => {
        const id = Number.parseInt(c.req.param("id"))
        const expenseIndex = fakeExpenses.findIndex((e) => e.id === id)
        if (expenseIndex === -1) {
            return c.json({ message: "Expense not found" }, 404)
        }
        const updatedExpense = await c.req.valid("json")
        fakeExpenses[expenseIndex] = { id, ...updatedExpense }
        return c.json(fakeExpenses[expenseIndex])
    })
