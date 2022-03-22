import DB from '../database'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

export interface User {
    id?: Number
    first_name: string
    last_name: string
    password?: string
}

export class UserRepository {

    /**
     * view all users
     * @returns {Promise<User[]>}
     */    
    async index(): Promise<User[]> {
        try {
            const connect = await DB.connect()
            const sql = 'SELECT * FROM users'
            const result = await connect.query(sql)
            connect.release()
            return result.rows
        } catch (error) {
            throw new Error(`Cannot get users. Error: ${error}`)
        }
    }

    /**
     * view single user
     * @param {Number} user_id
     * @returns {Promise<User>}
     */
    async show(user_id: Number): Promise<User> {
        try {
            const connect = await DB.connect()
            const sql = 'SELECT * FROM users WHERE id = ($1)'
            const result = await connect.query(sql,[user_id])
            connect.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot find user ${user_id}. Error: ${error}`)
        }
    }

    /**
     * create new user
     * @param {User} user
     * @returns {Promise<User>}
     */
    async create(user: User): Promise<User> {
        try {
            const pepper = process.env.BCRYPT_PASSWORD_PAPER as string
            const saltRounds = process.env.BCRYPT_SALT_ROUNDS as string
            const { first_name, last_name, password } = user
            const connect = await DB.connect()
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            
            //hasing password
            const hash = bcrypt.hashSync(
                user.password + pepper,
                parseInt(saltRounds)
            )

            const result = await connect.query(sql,[first_name, last_name, hash])
            return result.rows[0]
        } catch (error) {
            throw new Error(`Cannot add user. Error: ${error}`)
        }
    }

    /**
     * authenticate user
     * @param {string} first_name
     * @param {string} last_name
     * @param {string} password
     * @returns {Promise<User | null>}
     */
    async auth(first_name: string, last_name: string, password: string): Promise<User | null> {
        try {
            const pepper = process.env.BCRYPT_PASSWORD_PAPER as string
            const connect = await DB.connect()
            const sql = 'SELECT password FROM users WHERE first_name = $1 AND last_name = $2'
            const result = await connect.query(sql,[first_name, last_name])
            connect.release()
            if(result.rows.length) {
                const user = result.rows[0]
                if(bcrypt.compareSync(password+pepper, user.password)){
                    return user
                }
            }
            return null
            
        } catch (error) {
            throw new Error(`Cannot authenticate user. Error: ${error}`)
        }
    }

}