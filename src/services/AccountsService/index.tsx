import { Http, Response } from 'http/types';
import { CrudService } from '../CrudService';
import { CreateAccountRequest, AccountsResponse } from './types';

export class AccountsService extends CrudService {
  constructor(http: Http) {
    super('accounts', http);
  }

  create(data: CreateAccountRequest): Promise<Response<any>> {
    return this.http.post(this.path, data);
  }

  /**
   * Returns current user accounts
   */
  async getAll(): Promise<Response<AccountsResponse>> {
    return this.http.get(`/${this.path}`);
  }

  // async getById(id: number): Promise<Response<AccountTypeResponse>> {
  //   return this.http.get(`/${this.path}/${id}`);
  // }
}

export * from './types';
