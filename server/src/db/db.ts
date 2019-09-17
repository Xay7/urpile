import { Pool, QueryResult } from "pg";

const pool = new Pool();

interface Query {
  query: {
    (
      text: string,
      values?: any[],
      callback?: (err: Error, result: QueryResult) => void
    ): any;
  };
}

const db: Query = {
  query: (text, values, callback) => {
    return pool.query(text, values!, callback!);
  }
};

export default db;
