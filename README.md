# partifys-frontend
Group project COMPSCI 732 Front-end repository

## Members
1. Aditio Agung Nugroho (anug012 / 791804575)
2. Malith Patabandige (mpat901 / 6544754)
3. Senthil Kumaran Santhosh Gopal (sgop587 / 476621066)
4. Wei Lu (wlu702 / 778099429)

## Description
This project was created for completing group project on COMPSCI 732 course, The University of Auckland. The frontend for party spotify aplication was created using React + Redux + Redux-Saga + Styled Components and socket.io!

## Technologies
- [Reactjs](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Styled Components](https://www.styled-components.com/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Socket IO](https://socket.io/)

## How to run
```sh
# Create your environment file
cp .env.sample .env

# Replace the placeholder values with your environment values (see next section)
nano .env.sample

# Install dependencies
npm install

# Run unit tests in watch mode
npm test -- --watch

# Run the server
npm run start
```

## Creating the environment file

**Creating a Spotify application:**

- Create a "website" application on the [Spotify developer console](https://developer.spotify.com/dashboard/applications)
- Copy the client ID in your env file
- Save a `redirect_url` and copy it in your env file