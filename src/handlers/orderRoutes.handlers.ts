import express, { Request, Response } from 'express'
import { Order, OrderRepository } from '../models/order.model'
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'

dotenv.config()
const repo = new OrderRepository()

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
    //call create from order model
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        }
        const newOrder = await repo.create(order)
        res.json(newOrder)
        
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

//express handler function for showActive
const showActive = async (req: Request, res: Response) => {
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

    //call showActive from order model
    const order = await repo.showActive(req.body.user_id)
    res.json(order)
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
const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, create)
    app.get('/orders/:user_id', verifyAuthToken, showActive)
}

export default orderRoutes