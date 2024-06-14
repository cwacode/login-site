import pkg from 'pg';
const { Client } = pkg;

// const dbConfig = {
//     user: 'postgres',
//     password: 'yupter',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// };

const client = new Client({
  connectionString: process.env.PGURI || 'postgres://user:dBQJWjETjqAhDeIDzF78759LQcgW5BOG@dpg-cpm71lqj1k6c73a35080-a.frankfurt-postgres.render.com/database_bpkt',
  ssl: {
    rejectUnauthorized: false // This is insecure for production environments; ideally, provide a CA certificate
  }
});
client.connect()
  .then(() => console.log('Connected successfully to PostgreSQL database'))
  .catch(e => console.error('Failed to connect to PostgreSQL database', e));

export default client;


