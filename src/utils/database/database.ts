import FileAsync from 'lowdb/adapters/FileAsync';
import lowdb from 'lowdb';
import InternalServerError from '@/exceptions/InternalServerError';

export type Currency = {
  query: { to: string; from: string; amount: number };
  id: string;
  result: number;
};

type Schema = {
  Currency: Currency[];
};

export const createConnection = async () => {
  try {
    let db: lowdb.LowdbAsync<Schema>;
    const adapter = new FileAsync<Schema>('./src/utils/database/db.json');
    // eslint-disable-next-line prefer-const
    db = await lowdb(adapter);
    await db.defaults({ Currency: [] }).write();
    //db.get('Currency').push({ to: 'EUR', from: 'BR', amount: 15 }).write();
    return db;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};
//createConnection();

// export const getConnection = () => {
//   createConnection();
//   return db;
// };
