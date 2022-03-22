import supertest from "supertest";
import app from "../../server";

/* Define variables*/
const req = supertest(app)
let token: string

describe('Products Endpoints', () => {

    beforeAll(async() => {
        const result = await req
        .post('/users/authenticate')
        .set('Content-Type', 'application/json')
        .send({
            first_name: "Mashaer",
            last_name: "Mostafa",
            password: "123ggh"
        })
        token = result.body
    })


    it('create handler should reponse correctly', async (): Promise<void> => {
        const response = await req
                            .post('/products')
                            .set('Content-Type', 'application/json')
                            .send({
                                name: "Adidas Sneakers",
                                price: "430.00"
                            })
                            .set('Authorization','Bearer '+ token)
                            .expect(200)  
    })

    it('index handler should reponse correctly', async (): Promise<void> => {
        const response = await req
                            .get('/products')
                            .set('Content-Type', 'application/json')
                            .expect(200)  
    })

    it('show handler should reponse correctly', async (): Promise<void> => {
        const response = await req
                            .get('/products/:id')
                            .set('Content-Type', 'application/json')
                            .send({
                                id: "1"
                            })
                            .expect(200)  
    })
})