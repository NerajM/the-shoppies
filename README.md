# The Shoppies

This project was made as part of the [Shopify Fall 2021 Front End Developer internship Challenge](https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit?usp=sharing)

## Table of Contents

1. [Introduction](#Introduction)
2. [Technologies](#Technologies)
3. [Setup](#Setup)
4. [Design Decisions](#Design_Decisions)
5. [Testing](#Testing)
6. [Authors](#Authors)


## Introduction

This website functions to search for movies based on title by typing into the text field and hitting the `Enter` key. The matching movies are retrieved by using the `OMDB API`, and the top 10 results are displayed. The view contains a poster of each movie (if available), a link to the movie's IMDB page, and a button allowing users to nominate the movie for a Shoppie Award. The user can nominate up to 5 movies, and the nominations can be viewed by hitting the `View Nominations` button. The nominations can also be removed from users nominations by clicking the `Delete` button (trash bin icon) next to the corresponding nomination.

## Technologies
This project was created with:
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)
* [OMDB API](https://www.omdbapi.com/)

## Setup
To Run the project, you must:
* Install `Node.js` version >=10.18
* Clone the github repo: https://github.com/NerajM/the-shoppies.git
* Enter the repo using `cd PATH/the-shoppies`
* Install node modules using `npm install`
* Start the app using `npm start`
* Navigate to `http://localhost:PORT` on your browser

## Design Decisions:
This project was made with the technical requirements as stated in the [Shopify Fall 2021 Front End Developer Challenge](https://docs.google.com/document/d/1SdR9rQpocsH5rPTOcxr9noqHRld5NJlylKO9Hf94U8U/edit?usp=sharing). `Material-UI` was chosen due to simplicity of styling and thorough documentation. The colour scheme is based on the Shopify website to best represent Shopify. The movie posters gathered through the `OMDB API` allowed me to display an image for any movie that has one, leading me to implement the display in a grid rather than a list. The drawer was placed on the right to adhere to popular design standards and maintain solid flow with the viewing button being placed on the right. The banner was chosen to remain white with black text to make sure it stands out to the user. The drawer has a sliding animation when opening/closing, and the banner fades in/out when opening/closing. The remainder of the screen is darkened upon the display of both the banner and the drawer to emphasize them.

## Testing
I came up with these test cases prior to development, and proceeded to test them throughout:
* Searching an empty string :heavy_check_mark:
* Searching a movie with no results :heavy_check_mark:
* Searching a title (ex. Frog :frog:) with duplicate results (helped me catch a :bug:!) :heavy_check_mark:
* Searching for a movie with a result having a long title :heavy_check_mark:
* Removing nominations :heavy_check_mark:
* Adding nominations :heavy_check_mark: 
* Disabling the button for a movie when it was nominated :heavy_check_mark:
* Disabling all nomination buttons when 5 nominations were reached :heavy_check_mark:
* Ensuring no more than 5 nominations could be added :heavy_check_mark:
* Ensuring nomination button stays disabled after multiple searches :heavy_check_mark:
* Resizing screen :heavy_check_mark:
* Opening drawer :heavy_check_mark:
* Closing drawer with button :heavy_check_mark:
* Closing drawer by clicking outside the drawer :heavy_check_mark:
* Displaying a movie with a long title in the drawer :heavy_check_mark:
* Removing a movie from the drawer and ensuring its nomination button is re-enabled :heavy_check_mark:
* Display banner when 5 nominations are reached :heavy_check_mark:
* Banner displays again if a nomination is removed then added to reach 5 again :heavy_check_mark:
* Close banner when close button is clicked :heavy_check_mark:
* Close banner and open drawer when view nominations is clicked from the banner :heavy_check_mark:
* Close banner when clicking outside of the banner :heavy_check_mark:
* Banner doesn't reopen once banner is closed and drawer is closed, and ensuring buttons stay disabled :heavy_check_mark:
* Testing IMDB link for multiple movies :heavy_check_mark:
* Having a fallback if poster is not available :heavy_check_mark:

## Authors

[Neraj Manamperi](https://github.com/NerajM) (2021) 
