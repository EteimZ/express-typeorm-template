import "reflect-metadata"
import express from "express"
import { Request, Response, Express } from "express"
import { User } from "./entity/User"
import { myDataSource } from "./app-data-source"
import { createValidator } from 'express-joi-validation'
import UserSchema from './schema/UserSchema'

// establish database connection
myDataSource.initialize().then( () => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
})


// create and setup express app
const app = express()
app.use(express.json())

// joi validator
const validator = createValidator()


// routes
app.get("/users", async (req: Request, res: Response) => {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/users/:id", async (req: Request, res: Response) => {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: parseInt(req.params.id)
    })
    if (results){
        res.send(results)
    }else{
        res.send({detail: "User not found."})
    }   
})

app.post("/users", validator.body(UserSchema.postSchema), async (req: Request, res: Response) => {
    const user = myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.put("/users/:id", validator.body(UserSchema.putSchema), async (req: Request, res: Response) => {
    const user = await myDataSource.getRepository(User).findOneBy(
        {
            id: parseInt(req.params.id)
        }
    )
    if ( user ){
        myDataSource.getRepository(User).merge(user, req.body)
        const results = await myDataSource.getRepository(User).save(user)
        return res.send(results)
    }
    else {
        return res.send({"detail": "User not found."})
    }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
    await myDataSource.getRepository(User).delete(parseInt(req.params.id))
    return res.send({"detail": "User sucessfully deleted."})
})

// start express server
app.listen(3000)