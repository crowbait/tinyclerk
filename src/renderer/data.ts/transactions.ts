export interface ITransaction {
  id?: number                    // auto-increment id
  account?: string | null,       // IBAN?
  date: Date,                    // Date of entry
  valueDate?: Date | null,       // Date of actual transaction
  value: number,
  currency: string,              // currency, either name, abbreviation or symbol
  type?: string | null,          // Transaction-type, eg. card payment, follow-up charge ...
  purpose: string,
  targetAccount?: string | null, // IBAN of other transaction party
}
