import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";
import { useState } from "react";
import { EXCHANGE_RATE_API_URL } from "../consts/url";

export default function CurrencyInfo() {
  const [data, setData] = useState([]);

  const retrieveExchangeRate = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`${EXCHANGE_RATE_API_URL}`, requestOptions)
        .then(response => {
          if (!response.ok) {
            return response.text().then(message => {
              throw new Error(message)
            });
          }
          return response.json();
        })
        .then(retrievedData => {
          console.log(retrievedData);
          setData(retrievedData);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Rate against USD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((key, i) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{key}</TableCell>
                <TableCell>{data[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" sx={{ marginTop: '20px' }} onClick={retrieveExchangeRate}>
        Retrieve latest exchange rate
      </Button>
    </Box>
  );
}