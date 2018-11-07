import Dexie from 'dexie';
// https://github.com/ralscha/blog/blob/master/ngerrorhandler/client/src/app/clientErrorDb.ts
export class ClientErrorDb extends Dexie {
  errors: Dexie.Table<ClientError, string>;

  constructor() {
    super('ClientErrors');
    this.version(1).stores({
      errors: '++id'
    });
  }
}

export interface ClientError {
  id?: number;
  error: string;
}
