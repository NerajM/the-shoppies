import React, { useState } from "react";
import axios from "axios";
import {
  makeStyles,
  TextField,
  Button,
  GridList,
  GridListTileBar,
  GridListTile,
  Drawer,
} from "@material-ui/core";

export const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchResults = async (e) => {
    if (e.keyCode === 13) {
      const result = await axios.get(
        `http://www.omdbapi.com/?apikey=b6c68bdb&s=${e.target.value}&type=movie`
      );
      setSearchResults(result.data.Search);
      console.log("search", searchResults);
    }
  };

  const nominationList = nominations.map((nomination) => nomination.id);

  const createRowData = (id, title, year, poster) => {
    return { id, title, year, poster };
  };

  const rowData = [];
  searchResults?.forEach((searchResult) => {
    rowData.push(
      createRowData(
        searchResult.imdbID,
        searchResult.Title,
        searchResult.Year,
        searchResult.Poster
      )
    );
  });

  const addNomination = (id, title, year, poster) => {
    setNominations([...nominations, createRowData(id, title, year, poster)]);
    console.log("nominations", nominations);
  };

  const removeNomination = (id) => {
    const updatedNominationList = nominations.filter(
      (nomination) => nomination.id !== id
    );
    setNominations(updatedNominationList);
  };

  console.log("rowData", rowData);

  return (
    <div>
      <h1>The Shoppies!</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowDrawer(true)}
      >
        View Nominations
      </Button>
      <Drawer variant="persistent" anchor="right" open={showDrawer}>
        <p>Nominations</p>
        {nominations.map((nomination) => (
          <div>
            <p>
              {nomination.title} {nomination.year}
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => removeNomination(nomination.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Drawer>
      <h2>Movie awards for entrepreneurs</h2>
      <div style={{ paddingBottom: 20 }}>
        <TextField
          label="Enter a movie title"
          variant="outlined"
          onKeyDown={fetchResults}
        ></TextField>
      </div>

      <GridList cellHeight={300} cols={5} spacing={10}>
        {rowData.map((nomination) => (
          <GridListTile key={nomination.id}>
            <img src={nomination.poster}></img>
            <GridListTileBar
              title={nomination.title}
              subtitle={nomination.year}
              actionIcon={
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    target="_blank"
                    href={`https://www.imdb.com/title/${nomination.id}/`}
                  >
                    IMDB
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      addNomination(
                        nomination.id,
                        nomination.title,
                        nomination.year,
                        nomination.poster
                      )
                    }
                    disabled={nominationList.includes(nomination.id)}
                  >
                    Nominate
                  </Button>
                </div>
              }
            ></GridListTileBar>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
