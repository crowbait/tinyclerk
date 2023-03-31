import React from 'react';
import { Button, Checkbox, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ContainerHeader from 'renderer/components/ContainerHeader';
import { readStore, writeStore } from 'renderer/hooks/datastores';
import moment from 'moment';
import { ITransaction } from 'renderer/data.ts/transactions';
import dexieDB from 'renderer/hooks/database';
import ImportExportHelp from '../helpfiles/ImportExportHelp';

const ImportExportComponent = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const [CSVPath, setCSVPath] = React.useState("");
  const [delimiter, setDelimiter] = React.useState(",");
  const [accountEnabled, setAccountEnabled] = React.useState(false);
  const [accountHeader, setAccountHeader] = React.useState("");
  const [dateHeader, setDateHeader] = React.useState("");
  const [dateFormat, setDateFormat] = React.useState("yyyy/mm/dd");
  const [valueDateEnabled, setValueDateEnabled] = React.useState(false);
  const [valueDateHeader, setValueDateHeader] = React.useState("");
  const [valueHeader, setValueHeader] = React.useState("");
  const [currencyHeader, setCurrencyHeader] = React.useState("");   // column header of currency or constant value: if no column found, use entered value as currency
  const [typeEnabled, setTypeEnabled] = React.useState(false);
  const [typeHeader, setTypeHeader] = React.useState("");
  const [purposeHeader, setPurposeHeader] = React.useState("");
  const [targetAccountEnabled, setTargetAccountEnabled] = React.useState(false);
  const [targetAccountHeader, setTargetAccountHeader] = React.useState("");

  const trimFields = () => {
    setDelimiter(delimiter.trim());
    setAccountHeader(accountHeader.trim());
    setDateHeader(dateHeader.trim());
    setDateFormat(dateFormat.trim().toUpperCase());
    setValueDateHeader(valueDateHeader.trim());
    setValueHeader(valueHeader.trim());
    setCurrencyHeader(currencyHeader.trim());
    setTypeHeader(typeHeader.trim());
    setPurposeHeader(purposeHeader.trim());
    setTargetAccountHeader(targetAccountHeader.trim());
  }

  const processCSV = async (path: string) => {
    console.log(path);

    // write settings to store to read next time page is opened
    writeStore({store: "settings", variable: "CSVOptions", value: JSON.stringify({
      delimiter: delimiter,
      accountEnabled: accountEnabled,
      accountHeader: accountHeader,
      dateHeader: dateHeader,
      dateFormat: dateFormat,
      valueDateEnabled: valueDateEnabled,
      valueDateHeader: valueDateHeader,
      valueHeader: valueHeader,
      currencyHeader: currencyHeader,
      typeEnabled: typeEnabled,
      typeHeader: typeHeader,
      purposeHeader: purposeHeader,
      targetAccountEnabled: targetAccountEnabled,
      targetAccountHeader: targetAccountHeader,
    })});

    window.electron.ipcRenderer.once('read-csv', (args) => {
      if(Array.isArray(args)) { // check if args is array. Basically just needed for typescript, as args is always array.
        try {
          const processedData: ITransaction[] = [];
          args.forEach((element, index) => {
            const entry: ITransaction = {
              date: moment(element[dateHeader], dateFormat).toDate(),
              valueDate: valueDateEnabled ? element[valueDateHeader] : null,
              value: parseFloat(element[valueHeader].replace(',', '.')),
              currency: element[currencyHeader] ? element[currencyHeader] : currencyHeader,
              purpose: element[purposeHeader],
              account: accountEnabled ? element[accountHeader] ? element[accountHeader] : accountHeader : null,
              type: typeEnabled ? element[typeHeader] : null,
              targetAccount: targetAccountEnabled ? element[targetAccountHeader] : null
            }
            if(entry.date !== undefined && entry.date !== null
            && entry.value !== undefined && entry.value !== null
            && entry.purpose !== undefined && entry.purpose !== null && entry.purpose !== "") { // check whether all necessary values are present and

              entry.valueDate = entry.valueDate === undefined ? null : entry.valueDate;         // replace undefineds with nulls
              entry.type = entry.type === undefined ? null : entry.type;
              entry.targetAccount = entry.targetAccount === undefined ? null : entry.targetAccount;

              processedData.push(entry);
            } else {
              throw new Error(`Undefined Date / Value / Purpose in file on line ${index + 1}`);
            }
          });
          console.log(processedData);
          dexieDB.transactions.bulkAdd(processedData);
        } catch (error) {
          console.error(error)
        }
      }
      setIsProcessing(false);
    });
    window.electron.ipcRenderer.sendMessage('read-csv', [{path: path, delimiter: delimiter}]);
  }

  React.useEffect(() => {
    readStore({store: "settings", variable: "CSVOptions"}).then(readSettingsString => {
      try {
        const readSettings = JSON.parse(readSettingsString);
        console.log(readSettings);
        setDelimiter(readSettings.delimiter ? readSettings.delimiter : ",");
        setAccountEnabled(!!readSettings.accountEnabled);
        setAccountHeader(readSettings.accountHeader ? readSettings.accountHeader : "");
        setDateHeader(readSettings.dateHeader ? readSettings.dateHeader : "");
        setDateFormat(readSettings.dateFormat ? readSettings.dateFormat : "yyyy/mm/dd");
        setValueDateEnabled(!!readSettings.valueDateEnabled);
        setValueDateHeader(readSettings.valueDateHeader ? readSettings.valueDateHeader : "");
        setValueHeader(readSettings.valueHeader ? readSettings.valueHeader : "");
        setCurrencyHeader(readSettings.currencyHeader ? readSettings.currencyHeader : "");
        setTypeEnabled(!!readSettings.typeEnabled);
        setTypeHeader(readSettings.typeHeader ? readSettings.typeHeader : "");
        setPurposeHeader(readSettings.purposeHeader ? readSettings.purposeHeader : "");
        setTargetAccountEnabled(!!readSettings.targetAccountEnabled);
        setTargetAccountHeader(readSettings.targetAccountHeader ? readSettings.targetAccountHeader : "");
      } catch (error) {
        console.log("Couldn't read CSV settings", error);
      }
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} className="container-border">
        <Grid container spacing={2}>
          <ContainerHeader title='Import CSV'><ImportExportHelp /></ContainerHeader>

          <Grid xs={1}><Button variant="contained" component="label" disabled={isProcessing}
            onChange={e => {
              const target = e.target as HTMLInputElement;
              if(target.files && target.files.length > 0) {
                if(target.files[0].path.substring(target.files[0].path.length - 3).toLowerCase() !== "csv") { // check whether file is CSV
                  window.electron.ipcRenderer.sendMessage('error', [`File ${target.files[0].name} is not of type ".csv".`]);
                } else { // File is of type CSV (at least by name)
                  setCSVPath(target.files[0].path);
                }
              }
            }}>
            <SearchIcon />
            <input type="file" hidden name="csv" accept='.csv' />
          </Button></Grid>
          <Grid xs={11}><TextField label="File Path" fullWidth size="small" value={CSVPath} disabled /></Grid>
          <Grid xs={12} />

          <Grid xs={12} container>
            <Grid xs={2.5}><Typography style={{marginTop: 9}}>Date Column:</Typography></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={dateHeader} onChange={e => setDateHeader(e.target.value)} onBlur={() => trimFields()} /></Grid>
            <Grid xs={1} />
            <Grid xs={2.5}><Typography style={{marginTop: 9}}>Date Format:</Typography></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={dateFormat} onChange={e => setDateFormat(e.target.value)} onBlur={() => trimFields()} /></Grid>
          </Grid>

          <Grid xs={12} container>
            <Grid xs={2.5}><Typography style={{marginTop: 9, width: 'calc(100% - 56px)'}}>Value Date Column:</Typography></Grid>
            <Grid style={{marginLeft: -58}}><Checkbox checked={valueDateEnabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValueDateEnabled(e.target.checked)} /></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={valueDateHeader} onChange={e => setValueDateHeader(e.target.value)} disabled={!valueDateEnabled} onBlur={() => trimFields()} /></Grid>
          </Grid>

          <Grid xs={12} container>
            <Grid xs={2.5}><Typography style={{marginTop: 9}}>Value Column:</Typography></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={valueHeader} onChange={e => setValueHeader(e.target.value)} onBlur={() => trimFields()} /></Grid>
            <Grid xs={1} />
            <Grid xs={2.5}><Typography style={{marginTop: 9}}>Currency Column / Unit:</Typography></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={currencyHeader} onChange={e => setCurrencyHeader(e.target.value)} onBlur={() => trimFields()} /></Grid>
          </Grid>

          <Grid xs={12} container>
            <Grid xs={2.5}><Typography style={{marginTop: 9}}>Purpose Column:</Typography></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={purposeHeader} onChange={e => setPurposeHeader(e.target.value)} onBlur={() => trimFields()} /></Grid>
          </Grid>

          <Grid xs={12} container>
            <Grid xs={2.5}><Typography style={{marginTop: 9, width: 'calc(100% - 56px)'}}>Account Column:</Typography></Grid>
            <Grid style={{marginLeft: -58}}><Checkbox checked={accountEnabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountEnabled(e.target.checked)} /></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={accountHeader} onChange={e => setAccountHeader(e.target.value)} disabled={!accountEnabled} onBlur={() => trimFields()} /></Grid>
          </Grid>

          <Grid xs={12} container>
            <Grid xs={4}><Typography style={{marginTop: 9, width: 'calc(100% - 56px)'}}>Transaction Type Column:</Typography></Grid>
            <Grid style={{marginLeft: -58}}><Checkbox checked={typeEnabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTypeEnabled(e.target.checked)} /></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={typeHeader} onChange={e => setTypeHeader(e.target.value)} disabled={!typeEnabled} onBlur={() => trimFields()} /></Grid>
          </Grid>

          <Grid xs={12} container>
            <Grid xs={4}><Typography style={{marginTop: 9, width: 'calc(100% - 56px)'}}>Target Account Column:</Typography></Grid>
            <Grid style={{marginLeft: -58}}><Checkbox checked={targetAccountEnabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetAccountEnabled(e.target.checked)} /></Grid>
            <Grid xs={3}><TextField fullWidth size="small" value={targetAccountHeader} onChange={e => setTargetAccountHeader(e.target.value)} disabled={!targetAccountEnabled} onBlur={() => trimFields()} /></Grid>

            <Grid xs={1} />
            <Grid xs={1.25}><Typography style={{marginTop: 9}}>Delimiter:</Typography></Grid>
            <Grid xs={0.75}><TextField fullWidth size="small" value={delimiter} onChange={e => setDelimiter(e.target.value)} onBlur={() => trimFields()} /></Grid>
            <Grid xs={2}>
              <Button variant="contained" component="label" onClick={() => {setIsProcessing(true); processCSV(CSVPath)}} disabled={
                !(!isProcessing && CSVPath && delimiter && dateHeader && dateFormat && ((valueDateEnabled && valueDateHeader) || !valueDateEnabled) && valueHeader
                && currencyHeader && purposeHeader && ((accountEnabled && accountHeader) || !accountEnabled)
                && ((typeEnabled && typeHeader) || !typeEnabled) && ((targetAccountEnabled && targetAccountHeader) || !targetAccountEnabled))
              }>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  )
}

export default ImportExportComponent;
