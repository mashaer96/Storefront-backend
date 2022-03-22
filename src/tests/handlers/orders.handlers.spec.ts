import supertest from "supertest";
import app from "../../server";

/* Define variables*/
const req = supertest(app)
let token: string

describe('Orders Endpoints', () => {

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


    it('showActive handler should reponse correctly', async (): Promise<void> => {
        const response = await req
                            .get('/orders/:user_id')
                            .set('Content-Type', 'application/json')
                            .send({
                                user_id: "1"
                            })
                            .set('Authorization','Bearer '+ token)
                            .expect(200)  
    })

})