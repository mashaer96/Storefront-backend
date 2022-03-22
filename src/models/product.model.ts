import DB from '../database'

export interface Product {
    id?: Number
    name: string
    price: Number
}

export class ProductRepository {

    /**
     * view all products
     * @returns {Promise<Product[]>}
     */    
    async index(): Promise<Product[]> {
        try {
            const connect = await DB.connect()
            const sql = 'SELECT * FROM products'
            const result = await connect.query(sql)
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot get products. Error: ${error}`)
        }
    }

    /**
     * view single product
     * @param {Number} product_id
     * @returns {Promise<Product>}
     */
    async show(product_id: Number): Promise<Product> {
        try {
            const connect = await DB.connect()
            const sql = 'SELECT * FROM products WHERE id = ($1)'
            const result = await connect.query(sql,[product_id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot find product ${product_id}. Error: ${error}`)
        }
    }

    /**
     * create new product
     * @param {Product} product
     * @returns {Promise<Product>}
     */
    async create(product: Product): Promise<Product> {
        try {
            const { name, price } = product
            const connect = await DB.connect()
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
            const result = await connect.query(sql,[name, price])
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot add product. Error: ${error}`)
        }
    }

}