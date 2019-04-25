# min
> Node/Express/MongoDB backend for min, a multi-use web based timer application. 

Min has two modes, multi-timer and pomodoro. In multitimer mode, users can run multiple timers simultaneously (useful while timing multiple items while cooking, for example). In pomodoro mode, users can time periods of focus and rest that will enhance their ability to learn and master skills quickly via the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).

Repo for frontend UI built with React available here: [https://github.com/slowbeam/mins-client](https://github.com/slowbeam/mins-client)

##

![min demo](https://github.com/slowbeam/mins-client/blob/master/public/demo/min_demo_3.gif)

## Installation

OS X & Linux:

```sh
npm install
```

## Usage example

Multi-timer mode allows for many timers running at once:

![min multi-timer demo](https://github.com/slowbeam/mins-client/blob/master/public/demo/min_demo_1.gif)

Pomodoro mode allows users to select a length for period of focus, break and long break and time a period of study/work:

![min pomodoro demo](https://github.com/slowbeam/mins-client/blob/master/public/demo/min_demo_2.gif)


## Development setup

If you would like to run the frontend and backend together in development mode, please follow the following steps:

1. Clone the frontend repo [here](https://github.com/slowbeam/mins-client).
2. Follow the frontend readme's instructions to start up the UI on a local server.
3. Download and install MongoDB Compass [here](https://docs.mongodb.com/compass/master/install/)
4. Run the MongoDB Compass application
5. Start Mongo Daemon:

OS X & Linux:

```sh
mongod
```
6. Create a .env file in your cloned backend repo and point the environment variable min_jwtPrivateKey to a random string of your choice.
7. Start your cloned backend via a local server:

OS X & Linux:

```sh
npm run start-watch
```

## Release History

* 0.1.0
    * First official release
   


## Meta

Sandy Edwards – [https://sandyedwards.io](https://sandyedwards.io) – sedwardscode@gmail.com

[https://github.com/slowbeam](https://github.com/slowbeam)

## Contributing

1. Fork it (<https://github.com/slowbeam/mins-client/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
