import pg from 'pg';

export const pool = new pg.Pool({
    user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port:Number(process.env.PGPORT)
    
})


