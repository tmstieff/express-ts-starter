import * as pg from 'pg';
import * as config from 'config';

const pool = new pg.Pool(config.get('pg'));
export const pgpool = {
  pool: pool
};

