import dbConfig from "./config/database.config"
import { Pool } from 'pg'

const db: Pool = new Pool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
})

export default db