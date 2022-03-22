import express, { Request, Response } from 'express'
import { Product, ProductRepository } from '../models/product.model'
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'

dotenv.config()
const repo = new ProductRepository()

//express handler function for index
const index = async (_req: Request, res: Response) => {
    try {
        const products = await repo.index()
        res.json(products)
        
    } catch (error) {
        res.status(400)
        res.json(error)
    }
    
}

//express handler function for show
const show = async (req: Request, res: Response) => {
    try {
        const product = await repo.show(req.body.id)
        res.json(product)

    } catch (error) {
        res.status(400)
        res.json(error)
    }
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

    //call create from product model
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await repo.create(product)
        res.json(newProduct)
        
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
const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
}

export default productRoutes