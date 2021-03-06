import { Languages } from 'services/LanguagesService';

export interface StringEntries {
  add: string;
  fields: {
    amount: string;
    transactionType: string;
    account: string;
    date: string;
    category: string;
    note: string;
    place: string;
  };
  error: string;
}

export const stringEntries: Languages<StringEntries> = {
  en: {
    add: 'Add',
    fields: {
      amount: 'Amount',
      transactionType: 'Transaction type',
      account: 'Account',
      date: 'Date',
      category: 'Category',
      note: 'Note',
      place: 'Place',
    },
    error: 'Something went wrong',
  },
  ru: {
    add: 'Добавить',
    fields: {
      amount: 'Количество',
      transactionType: 'Тип транзакции',
      account: 'Аккаунт',
      date: 'Дата',
      category: 'Категория',
      note: 'Заметка',
      place: 'Место',
    },
    error: 'Произошла ошибка',
  },
};
