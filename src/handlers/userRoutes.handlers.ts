import express, { Request, Response } from 'express'
import { User, UserRepository } from './../models/user.model';
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'

dotenv.config()
const repo = new UserRepository()

//express handler function for index
const index = async (req: Request, res: Response) => {
    //check authentication token
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(' ')[1]
        jwt.verify(token, (process.env.JWT_SECRET as Secret))
    } catch (error) {
        res.status(401)
        res.json(`Access denied, invalid token ${error}`)
        return
    }

    //call index from user model 
    const users = await repo.index()
    res.json(users)
}

//express handler function for show
const show = async (req: Request, res: Response) => {
    //check authentication token
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(' ')[1]
        jwt.verify(token, (process.env.JWT_SECRET as Secret))
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    //call show from user model 
    const user = await repo.show(req.body.id)
    res.json(user)
}

//express handler function for create
const create = async (req: Request, res: Response) => {
    //check authentication token
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(' ')[1]
        jwt.verify(token, (process.env.JWT_SECRET as Secret))
    } catch (error) {
        res.status(401)
        res.json(`Access denied, invalid token ${error}`)
        return
    }

    //call create from user model
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }
        const newUser = await repo.create(user)
        res.json(newUser)
        
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

//express handler function for Authenticate/Sign in
const auth = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }
        const newUser = await repo.auth(user.first_name, user.last_name, (user.password as string))
        var token = jwt.sign({user: newUser}, (process.env.JWT_SECRET as Secret))
        res.json(token)
        
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

//express middleware for verify authenticate
const verifyAuthToken = async (req: Request, res: Response, next: express.NextFunction) => {
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, (process.env.JWT_SECRET as Secret))
        next()
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

//call express methods that match to routs and call the RESTful route handles to create responses
const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', verifyAuthToken, create)
    app.post('/users/authenticate', auth)
}

export default userRoutes