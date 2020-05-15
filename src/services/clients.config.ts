import { http } from 'http/http.config';
import { TransactionTypesService } from './TransactionTypesService/index';
import { AccountsService } from './AccountsService/index';
import { UsersService } from './UsersService';
import { LanguagesService } from './LanguagesService';
import { CurrenciesService } from './CurrenciesService';
import { BanksService } from './BanksService';
import { CountriesService } from './CountriesService';
import { AccountTypesService } from './AccountTypesService';

export const clients = {
  banks: new BanksService(http),
  countries: new CountriesService(http),
  languages: new LanguagesService(http),
  currencies: new CurrenciesService(http),
  users: new UsersService(http),
  accountTypes: new AccountTypesService(http),
  accounts: new AccountsService(http),
  transactionTypes: new TransactionTypesService(http),
};
