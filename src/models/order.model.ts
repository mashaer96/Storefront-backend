import DB from '../database'

export interface Order {
    id?: Number
    user_id: Number
    status: string
}

export class OrderRepository {

    /**
     * create new order
     * @param {Order} order
     * @returns {Promise<Order>}
     */
     async create(order: Order): Promise<Order> {
        try {
            const { user_id, status } = order
            const connect = await DB.connect()
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'
            const result = await connect.query(sql,[user_id, status])
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot add product. Error: ${error}`)
        }
    }

    /**
     * view current order by user
     * @param {Number} user_id
     * @returns {Promise<Order>}
     */
    async showActive(user_id: Number): Promise<Order[]> {
        try {
            const connect = await DB.connect()
            const sql = 
            `SELECT * FROM orders WHERE user_id = $1 AND status = 'Active'`
            const result = await connect.query(sql,[user_id])
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot find active orders for user ${user_id}. Error: ${error}`)
        }
    }
}