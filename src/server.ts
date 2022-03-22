import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRoutes from './handlers/userRoutes.handlers'
import productRoutes from './handlers/productRoutes.handlers'
import orderRoutes from './handlers/orderRoutes.handlers'

//Start up an instance of app
const app: express.Application = express()

/* Middleware*/
app.use(
    bodyParser.json(),
    cors(),
    express.json(),
    express.urlencoded({
        extended: true
    })
)

/* Setup Local Server */
// set port variable & start the Express server
const address: string = "0.0.0.0:3000"
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

//Routes
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

//give routes access to the app instance
userRoutes(app)
productRoutes(app)
orderRoutes(app)

export default app;