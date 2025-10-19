import {Hono} from "hono"
import {z} from "zod";
import {zValidator} from "@hono/zod-validator";

const expenseSchema = z.object({
    id:z.number().int().positive().min(1),
    title:z.string().min(3).max(100),
    amount:z.number().int().positive(),
})

type Expense = z.infer<typeof expenseSchema>
const createPostSchema = expenseSchema.omit({id: true})

const fakeExpenses: Expense[] = [
    {id: 1,amount: 50,title: "abc1"},
    {id: 2,amount: 40,title: "abc2"},
    {id: 3,amount: 82,title: "abc3"},
]

export const expensesRoute = new Hono()
    .get("/",async (c)=>{
        return c.json({expenses: fakeExpenses})
    })
    .post("/",zValidator("json",createPostSchema),async (c)=>{
        const expense = await c.req.valid("json")
        fakeExpenses.push({...expense,id:fakeExpenses.length+1})
        return c.json(expense)
    })
