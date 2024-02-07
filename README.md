# TVMaze Frontend Application Documentation

![TVMaze Frontend Application](https://raw.githubusercontent.com/zerodeleo/tvmaze/main/src/assets/release_01.png)

[Click here](https://bejewelled-smakager-9beffd.netlify.app/) to view the deployed application

## Introduction

The TVMaze Frontend Application retrieves data from the TVMaze API to present lists of TV shows categorized by various genres and ratings. Each reload is randomized while still maintaining user history. Users can also organize their viewing experience using sorting and grouping options. Additionally, the application facilitates searching for specific show titles and accessing detailed information on a separate screen.

## Features

The key features of the project include:

- Data retrieval from the TVMaze API.
- Dynamic data fetching initiated by user interaction (clicking).
- Dynamic data fetching triggered by user actions (scrolling to the end of the list).
- Presentation of trending TV shows based on ratings and genres.
- Sorting TV shows based on various criteria (alphabetical order, ratings, last updated, etc.).
- Grouping TV shows based on different categories (genre, ratings, language, etc.).
- Ability for users to access detailed information about a TV show by clicking on it.
- Integration of a search functionality enabling users to find TV shows by their titles.

## Architecture

### API

The TVmaze API offers a comprehensive set of endpoints for accessing TV show and people information. It provides functionalities for searching shows and people, retrieving detailed information about shows, episodes, and individuals, as well as accessing schedules and updates. The API is RESTful, returns JSON, and adheres to HATEOAS and HAL principles. It offers both public and user-level APIs.

### Async State Management

The TVMaze API currently contains approximately 300 pages of data, each page consisting of about 500 shows, totaling 150,000 items.

Given this large dataset and the extensive sorting and grouping features of the application, it necessitates a robust async state management solution.

For this purpose, I've chosen [TanStack](https://tanstack.com/query/latest) as the async state management technology for the following reasons:

- **Declarative & Automatic**: TanStack Query simplifies data fetching by automating caching, background updates, and stale data handling without the need for manual configuration.
- **Simple & Familiar**: It leverages familiar concepts like promises and async/await, making it easy to use for developers already familiar with these patterns.
- **Extensible**: TanStack Query offers extensive customization options to meet diverse use cases, including dedicated devtools, infinite-loading APIs, and mutation tools.

With these features, TanStack streamlines state management, reduces boilerplate code, and enhances developer productivity, making it an ideal choice for managing asynchronous data in the TVMaze Frontend Application.

### Framework

The TVMaze Frontend Application is developed using Vue.js. While I previously worked extensively with React, this project marks my first foray into Vue.js development. Vue.js was chosen as the framework due to its suitability for applications with clearly defined and structured features right from the outset. Additionally, the application necessitates robust algorithms for sorting and grouping large datasets, making Vue.js an optimal choice.

Vue.js excels in enhancing performance through features such as memoization, notably facilitated by its `computed` property. When you define a computed property, Vue.js caches the result based on its reactive dependencies. This means that the computed property's value is only re-evaluated when one of its dependencies changes. This caching mechanism ensures that unnecessary re-evaluations are avoided, thus improving performance by memoizing the computed property's result. This capability is particularly advantageous for managing the extensive data manipulation requirements of the TVMaze Frontend Application. Furthermore, Vue.js offers simplicity, reactivity, and a comprehensive ecosystem of tools and libraries, streamlining the development process for modern web applications.

### Styling

The decision to use Tailwind CSS was driven by its utility-first approach, providing pre-defined utility classes for rapid development without custom CSS. Its flexibility allows for easy customization, while scalability ensures suitability for projects of any size. The community and extensive ecosystem provide support and resources, and Tailwind's performance optimizations ensure fast-loading applications. Overall, Tailwind CSS offers a comprehensive solution for modern web development needs.

### Dependencies

- **@heroicons/vue**: Offers a collection of icons for use in the UI.
- **@tanstack/vue-query**: Enables data fetching and caching with a powerful query system.
- **axios**: Handles HTTP requests for fetching data from the TVMaze API.
- **vue-router**: Facilitates navigation and routing within the Vue.js application.
- **tailwindcss**: Utility-first CSS framework for rapid UI development.

### Development Dependencies

- **eslint**: Lints JavaScript/TypeScript code to ensure consistency and identify potential errors.
- **prettier**: Formats code according to predefined rules to maintain a consistent code style.
- **vite**: A modern build tool that serves the Vue.js application during development and builds it for production.
- **typescript**: Adds static typing to JavaScript, enhancing code quality and developer productivity.
- **vitest**: Provides testing utilities for writing unit tests in Vue.js applications.

## Implementation

The main components of the application include:

- **ControlsMenu**: Renders controls for filtering and sorting TV shows.
- **SearchBar**: Provides a search input for users to find TV shows by name.
- **ShowListHorizontal**: Displays a horizontal list of TV shows and also triggers refetching when the user has reached the end of scroll.
- **ShowItem**: Renders details of a single TV show.
- **RefreshShowsPrompt**: Prompts the user to refresh the list of TV shows.

## Usage

### Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the development server using `npm run dev`.
4. Access the application at the provided URL.

## Testing

Unit tests are included to ensure the reliability and functionality of critical components. Run `npm run test:unit` to execute the tests.

## Deployment

Continous deployment on Netlify

## Further Implementation

- Add more unit tests
- Refactor to smaller components, layout components and folder structure that fits Vue developer
- Optimize algorithms for better performance
- Trigger fetch when the user interacts with a list that has few items
- Enhance the UI with animations and a cleaner design
- The menu for md:screens and above needs refactoring, for example: a button to show the user that he/she can close the menu
- Implement features like liking and saving shows for later viewing

## Conclusion

In crafting the TVMaze Frontend Application, I aimed to showcase not only my technical skills but also my dedication to delivering a user-centric and high-quality product. By leveraging industry-standard technologies and best practices, I've created a platform that seamlessly integrates with the TVMaze API, offering users a rich and engaging experience.

Throughout the development process, I prioritized clean and reusable code, ensuring that the application is maintainable and scalable. As Vue.js is new to me, I anticipate refining my code once I become more acquainted with the framework and its structural principles.

For any inquiries or feedback, please contact Julia Stjerna at zerodeleo@gmail.com.

🤖 This Documentation was co-written with [my buddy](https://chat.openai.com/)
