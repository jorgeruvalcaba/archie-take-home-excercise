# Archie's Take Home Exercise

SpaceX Missions list app where you can see and search for any of the past missions of this innovative companies.

## Features

- NextJS project
- Use TypeScript
- Use SpaceX's GraphQL API
- Use Chakra UI
- Mission search
- The app is responsive

## Feedback

This project doesn't make use of NextJS server side functions given that state variables from the client-side can't be accessed from `getServerSideProps` as it runs on the server. It would require to pass the data through query params to make it available server-side, which is not the best approach in terms of scalability and maintenance.

## Installation

You can install this project with npm

```bash
  npm install
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/jorgeruvalcaba/archie-take-home-excercise
```

Go to the project directory

```bash
  cd archie-take-home-excercise
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Demo

You can see the project alive [here](archie-take-home-excercise.vercel.app/).

## Authors

- [@jorgeruvalcaba](https://www.github.com/jorgeruvalcaba)
