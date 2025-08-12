# Vacation Destination Planner

Welcome to the Vacation Destination Planner, a responsive React application designed to help users visually plan their trips. This application allows users to select locations on an interactive map, add destination details and manage a persistent list of their dream vacations.

This project was built to demonstrate a strong command of modern React principles, state management and third-party API integration in a polished, user-centric package.

**[View the Live Demo at vacation-map.netlify.app](https://vacation-map.netlify.app)**

---

## Features

- **Interactive Map**: Utilizes Mapbox GL JS to provide a smooth, interactive map experience.
- **Dynamic Destination Management**: Click anywhere on the map to add a new destination. Saved destinations are plotted with a distinct marker.
- **Responsive Sidebar**: A fully responsive, collapsible sidebar provides a seamless experience on both desktop and mobile devices.
- **Data Persistence**: All destinations are saved to the browser's `localStorage`, ensuring your data is waiting for you when you return.
- **Advanced Sorting**: Easily sort your destinations by name or date in either ascending or descending order.
- **Polished UX**: The application includes thoughtful user experience enhancements, such as:
  - A loading indicator while the map initializes.
  - Auto-focus on the first form field for quick data entry.
  - Temporary map markers to indicate a pending destination.
  - Confirmation "snackbars" for adding and deleting destinations.

---

## Tech Stack & Architecture

This project was built with a focus on creating a maintainable, scalable and performant application.

- **Framework**: **React** with **Create React App** (TypeScript template).
- **Styling**: **Material-UI (MUI)** was chosen for its robust set of pre-built components and theming capabilities, allowing for a polished and consistent design. A custom light theme was implemented to create a clean, professional aesthetic.
- **Mapping**: **Mapbox GL JS** for its high-performance, customizable maps.
- **State Management**:
  - React Hooks (`useState`, `useEffect`, `useRef`) are used for all component-level state.
  - A **custom hook (`useDestinations`)** was created to encapsulate all logic related to managing the destinations list (including `localStorage` synchronization and sorting). This follows the principle of **Separation of Concerns**, keeping the main `App` component clean and focused on layout and orchestration.
- **Performance**:
  - **Memoization** is used via `React.memo` on the `DestinationCard` component and `useCallback` for handler functions to prevent unnecessary re-renders, ensuring the UI remains snappy even with a long list of destinations.
- **TypeScript**: The entire application is written in TypeScript to leverage static typing for improved code quality, readability and error prevention.

---

## How to Run the Project

To run this project locally, please follow these steps:

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/Jaron-S/vacation-planner
    cd vacation-planner
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**

    - You will need a free access token from [Mapbox](https://www.mapbox.com/).
    - In the root of the project, create a new file named `.env`.
    - Add your Mapbox token to this file. **Note**: Create React App requires environment variables to be prefixed with `REACT_APP_`.
      ```
      REACT_APP_MAPBOX_ACCESS_TOKEN="YOUR_MAPBOX_ACCESS_TOKEN_HERE"
      ```

4.  **Run the Application**

    ```bash
    npm start
    ```

    The application will now be running on `http://localhost:3000`.

---

## My Approach

My process was guided by a commitment to building a clean, scalable and maintainable application from the outset. I followed a methodical, component-driven development strategy.

1.  **Tackling the Core Integration First**: I began by establishing the most critical piece of functionality: the integration with the **Mapbox GL JS API**. By encapsulating this logic within a dedicated `MapComponent` early on, I ensured the most complex part of the application was working and created a stable foundation to build upon.

2.  **Component-Driven Architecture**: The UI was designed as a system of isolated, reusable components (`DestinationCard`, `DestinationForm`, etc.). This component-driven approach ensures that each piece of the UI is self-contained, predictable and easy to test or modify in the future.

3.  **Separation of Concerns with Custom Hooks**: A core architectural decision was to separate state management logic from the UI. All logic for creating, deleting, sorting and persisting destinations was encapsulated within a custom `useDestinations` hook. This keeps the main `App` component clean and focused on its primary role: orchestrating the layout and data flow between components.

4.  **Iterative Polish & Feature Implementation**: With a robust architecture in place, I iteratively layered on the stretch goals and UX enhancements. This included implementing performance optimizations with `React.memo` and `useCallback`, making the application fully responsive and adding polished feedback mechanisms like the loading indicator and confirmation snackbars. This iterative process ensured that each new feature was built on a stable and well-structured foundation.

---

## Challenges & Solutions

Building a polished application always involves solving interesting technical challenges. Here are a couple that were addressed during development:

1.  **Challenge**: Integrating a third-party, imperative library like Mapbox GL JS into React's declarative ecosystem. It's crucial to manage the map instance's lifecycle correctly to prevent memory leaks and unnecessary re-renders.

    **Solution**: The map instance is managed within a `useRef` to ensure it persists across renders without triggering state changes. The map is initialized only once inside a `useEffect` with a stable dependency array. To prevent the `MapComponent` from re-rendering every time a handler function was passed down, the `onMapClick` callback was also stored in a `useRef`, ensuring a stable reference while keeping the function's logic up-to-date.

2.  **Challenge**: Handling overlapping DOM events between the Mapbox canvas and the custom HTML markers. A click on a saved destination marker was propagating down to the map, incorrectly triggering the "add new destination" flow.

    **Solution**: The map's main `click` handler was updated to intelligently inspect the event target. By checking if the click originated from an element with the `.mapboxgl-marker` class, the handler can correctly distinguish between a click on the map canvas and a click on a pre-existing marker, ensuring each action has its intended and exclusive effect.

---

## Limitations & Future Improvements

Given more time, I would consider the following enhancements:

- **Fly-to Animation**: When a user clicks on a destination card in the list, animate the map to "fly to" that destination's coordinates for a more dynamic experience.
- **Backend Integration**: Replace `localStorage` with a proper backend service and database (e.g., Node.js with PostgreSQL or a BaaS like Firebase) to allow users to access their destinations from any device.
- **Enhanced Form Validation**: Implement more robust form validation using a library like `Formik` or `React Hook Form` to provide real-time feedback to the user.
- **Testing**: While the component structure is designed to be testable, I would add a suite of unit and integration tests using Jest and React Testing Library to ensure long-term stability.
