import knex from 'knex';
import knexfile from '../../knexfile';

const connection = knex(knexfile[process.env.NODE_ENV]);

export default connection;
