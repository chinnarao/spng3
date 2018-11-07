import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ads } from './ads.data';
import { articles } from './articles.data';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { ads, articles};
  }
}

