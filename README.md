# Expense Tracker

<br>

_An application for searching information on the Star Wars universe built with the React library_

<br>

Try it [here](https://aesthetic-sfogliatella-5a6c09.netlify.app/)

<br>

![Star Wars API Demo](https://github.com/j-otterbox/star-wars-api/blob/main/starwars-api-demo.gif "Star Wars API in use")

## Summary

This is a project I created for SDMM with the React library. It was fun to build out the integration of the [Star Wars API](https://swapi.dev/) with help from the Axios HTTP client to make working with API requests easier. You can search for data from several different categories and the table will update dynamically in response to the chosen category and render results afterwards.

The difficult part of this project was avoiding callback hell because the data received from the API typically has properties that are also URLs nested within. The challenge then was writing the requests in a way that is clear and easy to follow. Thankfully, this can be accomplished with asynchronous JavaScript by using async/await with promises.

In addition, to reduce the amount of API requests made, a "cache" is created when the app is loaded for the first time with the useEffect Hook. This is done with the localStorage property of the Window interface.

Lastly, another concept that I got to experiment with was using portals to produce cleaner JSX and render HTML that is friendlier to screen readers by moving the overlay and loading animation from being nested deeper with the markup to being adjacent with the app root.

## Author

- **Jason Otter** - _Full-Stack Software Developer_ - [Website](https://jason-otter.netlify.app/) | [LinkedIn](https://www.linkedin.com/in/jason-otter/)
