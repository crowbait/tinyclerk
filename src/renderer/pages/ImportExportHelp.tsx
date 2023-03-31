import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const ImportExportHelp = () => (
<div>
  <Typography variant='body2'>This menu allows import of CSV (Comma-separated values) files. Most banking apps as well as most table programs such as
    Excel allow exporting this format.<br />This program expects a list of transactions.</Typography>
    <br />
    <Typography variant='body2'>Since table headings will vary wildly between programs and apps, you need to specify the names of the columns that are present
    in your CSV file so that tinyClerk can understand the data.
    <br />You can toggle processing of non-mandatory columns on and off using the checkboxes.</Typography>
    <br />
    <Typography variant='body2'>
      Columns you can specify:
      <TableContainer className="compact-table"><Table>
        <TableHead><TableRow><TableCell width={125} style={{border: 0}} /><TableCell style={{border: 0}} /></TableRow></TableHead><TableBody>
        <TableRow>
          <TableCell>Date <span style={{color: "#ff8888"}}>*</span></TableCell>
          <TableCell> The date when the transaction was marked. You'll need to specify the format of the date
            in your file, for example "mm/dd/yyyy" for the American format (04/06/2020) or "dd.mm.yyyy" for German formats (06.04.2020) and so on.
            <br />Please make sure to use the correct seperation mark (. or - or / and so on)!</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Value Date</TableCell>
          <TableCell>The date on which the transaction was actually carried out. Please see above.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Value <span style={{color: "#ff8888"}}>*</span></TableCell>
          <TableCell>The value of the transaction. <strong>Warning</strong>: if the content of the "value"-column is in the format of "€12.40" or something similar,
            the conversion WILL fail. In that case, you'll need to edit your CSV file with a program like Excel. Values like "12.40€" are fine.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Currency <span style={{color: "#ff8888"}}>*</span></TableCell>
          <TableCell>you can either enter the name of the column listing the currency or enter a value for the program to use for all the data in the file.
            <br />Valid entries are the name of the currency (eg. Euro), an abbreviation (eg. EUR) or just the symbol (eg. €).</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Purpose <span style={{color: "#ff8888"}}>*</span></TableCell>
          <TableCell>Notes of the transaction, most commonly identification of the transaction partner or use of the transaction.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Account</TableCell>
          <TableCell>Indentifier of the account on which the transaction was carried out (eg. your account number, IBAN).
            <br />Similarly to Currency, you can also enter a constant value to use for all data in the file.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Type of the transaction, eg. card payment, follow-up charge, etc.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Target Account</TableCell>
          <TableCell>Account indetifier of the other transaction party, for example account number (eg. IBAN).</TableCell>
        </TableRow>

        <TableRow style={{background: '#090909'}}><TableCell /><TableCell /></TableRow>
        <TableRow>
          <TableCell><i>Delimiter</i></TableCell>
          <TableCell>Not all programs export CSV with the proper delimiter (,) to separate values. Should you get error messages, please open your CSV file with
            any text editor. You will easily see which character is used to separate the values and columns in your file. Enter this character to override the standard
            behaviour.</TableCell>
        </TableRow>
      </TableBody></Table></TableContainer>
      <br />
      <span style={{color: "#ff8888"}}>*</span> Point is mandatory and must be present in the CSV file
    </Typography>
  </div>
);

export default ImportExportHelp;
