# A Cab Scheduler App

# Demo
https://www.youtube.com/watch?v=dWYOSnQyaAg

## Run MongodB service
1. Open terminal and type `mongod`. Ensure that the service is installed.
2. You can see the database graphically using Robo3T. Please go to https://robomongo.org/download

## Instruction for running app on localhost

1. Open another terminal and clone the app using command `git clone https://github.com/muhammed-salman/cab-scheduler.git`
2. Type `cd cab-scheduler/server` to get inside the directory.
3. Now type `npm install`
4. After the installation of required node_modules type `npm run dev`
5. Open another terminal and navigate to server directory as per step 2 above.Populate the database with data. Run following command `node controllers/populate.js`
6. Press `ctrl+c` to terminate the script.
7. Now the server is running on `localhost:3090`
8. Open another terminal and navigate to `client` directory of `cab-scheduler`
9. Now type `npm install`
10. After the installation of required node_modules type `npm run start`
11. Now the application can be accessed on `localhost:3050`

## Following scripts are available in the client project

### usage: `npm run <script_name>`

1. `start`: To run project on localhost:3050
2. `clean`: To remove the production build code
3. `build`: To create a production build for deployment

## Following scripts are available in the server project

### usage: `npm run <script_name>`

1. `dev`: To run server on localhost:3090
2. `test`: To test server (Currently no test cases)

## What can be done with more time
- App can be made responsive
- Detailed test cases can be written for each component
- UX can be improved
- Lot of code refactoring can be done (destructuring, reducing number of variables etc)
- Network request can be minimized  
- Unnecessary state stored in certain components can be removed or reduce
- Automatic running of `populate.js` script can be done on a specified date/day of week and time ex: `Every Thursday 10:55am` (This task is in progress)
- Current week dates can be shown till a specifed day & time of week ex `Show next week date from Thursday 10:55am`  (This task is in progress)

** I'will update if I get more ideas **
