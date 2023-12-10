# mtm6302-capstone-Catherocks87
# Catherine Manrique
# 41078882
# pokedex

1. I started creating the files `index.html` and `styles.css` in Visual Studio code inside the `part-3` branch.

2. According to my mock-up, I looked for the best options to create the prototype, so I used Bootstrap to make the layout. I included dropdown menus, responsive grids, and buttons along with CSS styles to make this prototype close to the original mock-up, and to make it responsive for two screen sizes, mobile and desktop.

3. Finally, I checked both codes HTML and CSS with [validator.w3.org](https://validator.w3.org) to detect any mistakes, after validation zero errors were found.

One of the challenges doing this prototype was remembering how to use Bootstrap again; I had to recap my previous assignments made with this framework. Also, it took me some time to set the background images the way I wanted to match with the mock-up. I still have more challenges like which will be the best way to display each Pokémon info by clicking its image, but, hopefully, I expect to make this possible with JavaScript help.

**Resources:**
- Bootstrap
- CSS Reset
- Bulbapedia for Pokémon images and info
- [W3 validator](https://validator.w3.org)
- PokeAPI.co Documentation
- MDN Web Docs

**Final Pokedex report**

The Pokédex web application was developed using a structured approach, which involved planning and setup, fetching and displaying Pokémon data, implementing pagination, detailed Pokémon information and modal display, catching and releasing Pokémon, responsiveness and styling, and the use of resources. 

In the first stage, the project requirements were reviewed, and the HTML, CSS, and JavaScript files were prepared. The PokeAPI documentation was explored to understand the endpoints and data structure. 

The second stage involved the fetching of initial Pokémon data using the Fetch API, which was used to retrieve the data for the initial 20 Pokémon asynchronously. Functions were developed to display the Pokémon cards containing thumbnail images and names based on the fetched data. 

In the third stage, the "Load More" button was implemented to asynchronously fetch and display an additional 20 Pokémon when clicked. Managing offset and limit parameters was crucial to effectively fetch Pokémon in batches. 

The fourth stage involved implementing the modal interface to display larger images and additional details of a Pokémon upon clicking its card image. Utilizing the Fetch API, specific Pokémon details were fetched asynchronously triggered by the card image click event. 

The fifth stage involved the utilization of localStorage to maintain a list of caught Pokémon, allowing for persistent storage. Functionality was implemented to mark a Pokémon as caught and update the caught list in localStorage. Users were enabled to release or remove Pokémon from the caught list, offering flexibility in managing the list. 

In the sixth stage, Bootstrap was integrated for responsive design elements and enhanced styling. Custom CSS was applied to create a visually appealing interface while preserving responsiveness. The web application was ensured to maintain responsiveness across diverse devices and screen sizes. 

Throughout the development process, the PokeAPI.co documentation was referenced extensively for understanding endpoints and data structure. MDN Web Docs were consulted for JavaScript and Fetch API documentation, and Bootstrap Documentation was utilized for CSS framework implementation and responsive design guidance. 

The development process posed some challenges, including ensuring accurate handling of pagination parameters for fetching Pokémon data in batches, managing asynchronous requests for detailed Pokémon information and displaying it within the modal interface, and effectively handling the caught Pokémon list in localStorage while ensuring data accuracy. 
