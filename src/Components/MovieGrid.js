import React from "react";
import {
  makeStyles,
  Button,
  GridList,
  GridListTileBar,
  GridListTile,
} from "@material-ui/core";

const movieGridStyles = makeStyles({
  gridListTileBar: {
    background: "rgba(0, 0, 0, 0.7)",
  },
  button: {
    padding: "6px",
    backgroundColor: "#008060",
    color: "white",
    margin: "0px 4px 4px 0px",
    "&:hover": {
      backgroundColor: "#004c3f",
    },
    "&:disabled": {
      backgroundColor: "#004c3f",
    },
  },
});

export const MovieGrid = ({
  searchResults,
  handleNominations,
  nominations,
  nominationIdList,
}) => {
  const classes = movieGridStyles({});

  const addNomination = (id, title, year, poster) => {
    handleNominations([...nominations, { id, title, year, poster }]);
  };

  const uniqueSearchResults = [
    ...new Map(searchResults?.map((movie) => [movie.imdbID, movie])).values(),
  ];

  const moviesData = [];

  uniqueSearchResults?.forEach((searchResult) => {
    const { imdbID, Title, Year, Poster } = searchResult;
    moviesData.push({ id: imdbID, title: Title, year: Year, poster: Poster });
  });

  return (
    <GridList cellHeight={300} cols={5} spacing={10}>
      {moviesData.map((movie) => (
        <GridListTile key={movie.id}>
          <img
            src={
              movie.poster !== "N/A"
                ? movie.poster
                : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }
            alt={movie.title}
          />
          <GridListTileBar
            className={classes.gridListTileBar}
            title={movie.title}
            subtitle={movie.year}
            actionIcon={
              <div>
                <Button
                  className={classes.button}
                  target="_blank"
                  href={`https://www.imdb.com/title/${movie.id}/`}
                >
                  IMDB
                </Button>
                <Button
                  className={classes.button}
                  onClick={() =>
                    addNomination(
                      movie.id,
                      movie.title,
                      movie.year,
                      movie.poster
                    )
                  }
                  disabled={
                    nominationIdList.includes(movie.id) |
                    (nominationIdList.length === 5)
                  }
                >
                  Nominate
                </Button>
              </div>
            }
          ></GridListTileBar>
        </GridListTile>
      ))}
    </GridList>
  );
};
