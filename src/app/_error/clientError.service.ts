import {ClientError, ClientErrorDb} from './clientErrorDb';
import {Injectable} from '@angular/core';
// https://github.com/ralscha/blog/blob/master/ngerrorhandler/client/src/app/clientError.service.ts
@Injectable({
  providedIn: 'root'
})
export class ClientErrorService {

  private db: ClientErrorDb;

  constructor() {
    this.db = new ClientErrorDb();
  }

  async store(body: string): Promise<void> {
    await this.db.errors.add({error: body});
  }

  async delete(ids: number[]): Promise<void> {
    await this.db.errors.bulkDelete(ids);
  }

  async getAll(): Promise<ClientError[]> {
    return await this.db.errors.toArray();
  }
}
