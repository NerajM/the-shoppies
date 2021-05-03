import React, { useState } from "react";
import axios from "axios";
import {
  makeStyles,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

export const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [showNominations, setShowNominations] = useState(false);

  const fetchResults = async (e) => {
    if (e.keyCode === 13) {
      const result = await axios.get(
        `http://www.omdbapi.com/?apikey=b6c68bdb&s=${e.target.value}&type=movie`
      );
      setSearchResults(result.data.Search);
    }
  };

  const columns = [
    { field: "Title", headerName: "Movie Title", flex: 1 },
    {
      field: "Year",
      headerName: "Year Released",
      flex: 0.5,
    },
    {
      field: "Nominated",
      sortable: false,
      flex: 0.5,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const addNomination = () => {
          const { id, Title, Year } = params.row;
          setNominations([...nominations, createRowData(id, Title, Year)]);
        };
        return (
          <Button color="primary" variant="contained" onClick={addNomination}>
            No
          </Button>
        );
      },
    },
  ];

  console.log("nominations", nominations);
  const createRowData = (id, title, year) => {
    return { id: id, Title: title, Year: year };
  };

  const rowData = [];
  searchResults?.forEach((searchResult) => {
    rowData.push(
      createRowData(searchResult.imdbID, searchResult.Title, searchResult.Year)
    );
  });

  return (
    <div>
      <TextField
        label="Enter a movie title"
        variant="outlined"
        onKeyDown={fetchResults}
      ></TextField>
      <div style={{ height: 375, width: "100%" }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSize={5}
          disableColumnSelector
          disableSelectionOnClick
        ></DataGrid>
      </div>
      <Button onClick={() => setShowNominations(true)}>View Nominations</Button>
      <Dialog open={showNominations} onClose={() => setShowNominations(false)}>
        <DialogTitle>
          <p>Test</p>
        </DialogTitle>
        <DialogContent>
          <div style={{ height: 375, width: "100%" }}>
            <DataGrid
              rows={nominations}
              columns={columns}
              pageSize={5}
              disableColumnSelector
              disableSelectionOnClick
            ></DataGrid>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
