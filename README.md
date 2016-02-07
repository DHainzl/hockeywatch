# Hockeywatch

Follow your favorite Icehockey matches in with the Live Ticker, powered by [Hockeydata.net](http://hockeydata.net).

## Install

This is a project Pbased on Angular 2 (currently beta 2) and Typescript. To start, just use `npm install && npm start`. This starts a small live server for development.

## Configuration

Copy the app/config.sample.js into a file config.js and replace the variables with your configuration values.
If you deploy on Azure (TODO Small tutorial on how to do this), you'll need to set the following environment variables:

* `HOCKEYWATCH_API_KEY`: Your Hockeydata.net API key
* `HOCKEYWATCH_API_REF`: Your Hockeydata.net API Referer

## License

This project is licensed under the MIT [http://dhainzl.mit-license.org](http://dhainzl.mit-license.org/).