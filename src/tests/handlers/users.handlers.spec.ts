import supertest from "supertest";
import app from "../../server";

/* Define variables*/
const req = supertest(app)
let token: string

describe('User Endpoints', () => {

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
                            .post('/users')
                            .set('Content-Type', 'application/json')
                            .send({
                                first_name: "Mashaer",
                                last_name: "Mostafa",
                                password: "123ggh"
                            })
                            .set('Authorization','Bearer '+ token)
                            .expect(200)  
    })

    it('index handler should reponse correctly', async (): Promise<void> => {
        const response = await req
                            .get('/users')
                            .set('Content-Type', 'application/json')
                            .set('Authorization','Bearer '+ token)
                            .expect(200)  
    })

    it('show handler should reponse correctly', async (): Promise<void> => {
        const response = await req
                            .get('/users/:id')
                            .set('Content-Type', 'application/json')
                            .send({
                                id: "1"
                            })
                            .set('Authorization','Bearer '+ token)
                            .expect(200)  
    })
})