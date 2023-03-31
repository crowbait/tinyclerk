import Dexie, { Table } from 'dexie';
import { ITransaction } from 'renderer/data.ts/transactions';

// declaring db
class DexieDB extends Dexie {
  public transactions!: Table<ITransaction>

  public constructor() {
    super("DexieDB");
    this.version(1).stores({      // defines indexes, not possible values
      transactions: "++id,account,date,targetAccount,&[account+value+date+targetAccount+purpose]"    // id primary index (autoincrement), others non-unique
    });                                                                                              // compunt index must be unique - preventing duplicates
  }
}

const dexieDB = new DexieDB();
export default dexieDB;
