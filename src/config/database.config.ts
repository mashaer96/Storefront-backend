import dotenv from 'dotenv'

dotenv.config()
const ENV = process.env['ENV'] ?? 'dev'

const database = process.env[
    ENV === 'test' ? 'POSTGRES_TEST_DB' : 'POSTGRES_DB'] ?? 'postgres'

const databaseConfig = {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_POST) ?? 5432,
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? '', //password is a sensitive data
    database,
}

export default databaseConfig
