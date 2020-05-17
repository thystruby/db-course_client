import React, { useContext, useEffect, useState } from 'react';
import { FormikNumberInput } from 'components/FormikNumberInput';
import { FormTemplate } from 'components/templates/FormTemplate';
import { FormikConfig } from 'formik';
import { AppContext } from 'App';
import { useStrings } from 'hooks/useStrings';
import { FormikSelect } from 'components/FormikSelect';
import { clients } from 'services/clients.config';
import { TransactionType } from 'services/TransactionTypesService';
import DatePicker from 'react-datepicker';
import { Category, CategoriesResponse } from 'services/CategoriesService';
import { FormikTextarea } from 'components/FormikTextarea';
import { FormikInput } from 'components/FormikInput';
import { CreateTransactionRequest } from 'services/TransactionsService';
import { StringEntries, stringEntries } from './constants';
import 'react-datepicker/dist/react-datepicker.css';

type FormikValues = CreateTransactionRequest;

const AddTransactionForm: React.FC = () => {
  const { settings, accounts } = useContext(AppContext);

  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      clients.transactionTypes.getAll(),
      clients.categories.getAll(),
    ]).then(([{ data: transactionsData }, { data: categoriesData }]) => {
      setTransactionTypes(transactionsData);
      setCategories(categoriesData as CategoriesResponse);
      setLoading(false);
    });
  }, []);

  const strings = useStrings<StringEntries>(stringEntries);

  if (!accounts) {
    return null;
  }

  if (!accounts.length && !loading) {
    return (
      <div>You don&apos;t have any accounts, please add an account first.</div>
    );
  }

  const formikConfig: FormikConfig<FormikValues> = {
    initialValues: {
      accountId: accounts.length ? accounts[0].id : 0,
      typeId: 1,
      amount: 0,
      date: Date.now(),
    },
    onSubmit: async values => {
      try {
        const { status } = await clients.transactions.create({
          ...values,
          typeId: +values.typeId,
          accountId: +values.accountId,
          categoryId: values.categoryId ? +values.categoryId : undefined,
        });

        if (status === 200) {
          setError(false);
          setDone(true);
        }
      } catch (e) {
        const { status } = e.response;

        setError(true);
      }
    },
    enableReinitialize: true,
  };

  const transactionTypesOptions = transactionTypes.map(t => (
    <option key={t.id} value={t.id}>
      {t.name}
    </option>
  ));

  const accountsOptions = accounts.map(a => (
    <option key={a.id} value={a.id}>
      {a.name}
    </option>
  ));

  const form = (
    <FormTemplate {...formikConfig}>
      {formik => {
        const currentCategories = categories.filter(
          c => c.transactionType.id === +formik.values.typeId
        );

        const categoriesOptions = currentCategories.map(a => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ));

        const showCategories =
          +formik.values.typeId === 1 || +formik.values.typeId === 2;

        let currentCategory;
        if (!showCategories) {
          delete formik.values.categoryId;
        } else if (categories.length) {
          currentCategory =
            currentCategories.find(c => c.id === +formik.values.categoryId) ||
            currentCategories[0];

          formik.values.categoryId = currentCategory.id;
        }

        return (
          <>
            <FormikNumberInput
              formik={formik}
              name="amount"
              label={strings.fields.amount}
              suffix={` ${settings?.mainCurrency.code}`}
            />

            <FormikSelect label={strings.fields.transactionType} name="typeId">
              {transactionTypesOptions}
            </FormikSelect>

            <FormikSelect label={strings.fields.account} name="accountId">
              {accountsOptions}
            </FormikSelect>

            {showCategories && (
              <>
                <FormikSelect
                  label={strings.fields.category}
                  name="categoryId"
                  icon={currentCategory?.icon.name}
                >
                  {categoriesOptions}
                </FormikSelect>
                <FormikInput name="place" label={strings.fields.place} />
              </>
            )}

            <FormikTextarea name="note" label={strings.fields.note} />

            <div className="flex justify-between mb-6">
              <label className="w-full mr-5" htmlFor="date">
                {strings.fields.date}
              </label>
              <DatePicker
                id="date"
                selected={formik.values.date}
                withPortal
                onChange={date => {
                  if (date) {
                    formik.setFieldValue('date', +date);
                  }
                }}
              />
            </div>

            <button className="mb-1 w-auto self-end" type="submit">
              {strings.add}
            </button>

            {error && (
              <div className="m-2 text-center text-red-600">
                {strings.error}
              </div>
            )}
          </>
        );
      }}
    </FormTemplate>
  );

  return done ? <div>{strings.done}</div> : form;
};

export { AddTransactionForm };
