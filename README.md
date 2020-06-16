# Project Name
Shmetsy (Reviews Microservice)
> Project description
Shmetsy is designed to a be a clone of the Etsy product page. This repository handles the reviews component for the web page. 
## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

Note that you must have mySQL installed on your machine prior to running the application in this repository. 

1. Start the mySQL server on your computer by typing `sudo service mysql start`. you can confirm whether or not
   the server is running by typing `sudo service mysql status` into your terminal. 

2. After you've installed all the necessary dependencies and the mySQL server is up and running, cd in to the `/server` directory. 

3. Source the `schema.sql` file by typing `mysql -u root -p < schema.sql`. You may run into an authentication error. This guide will help remedy this: https://dev.to/oneearedmusic/access-denied-reset-mysql-root-user-password-2hk4. Once you've fixed this, try to source the `schema.sql` file again using the new password you assigned for the `root` user. 
   
4. Confirm that the datbase `reviewList` has been created by first typing `mysql -u root -p`. Press Enter, and then type the same password from step 3 again. 

5. Now you should be in the mySQL shell. Type `use reviewList`. If you get a `database changed` notice in your shell, you're good to proceed! Exit out of the mySQL shell now by typing `quit`. 

6. Open the `index.js` file within the `/database` folder in your favorite code editor. Lines 8-13 specifiy a database connection. For purposes running this project locally, make sure the "host" paramater is 'localhost'. "user" should be 'root'. "password" should be your mySQL password we've used a few times now. Save the changes. Now open the `seeder.js` file in the `/server` directory and make the same   mySQL connection changes. Save your changes.  Now type `npm run seed` in your terminal to populate the reviewList database with spoof review data for 100 products. If this script is working, you should get a `DB connected` message in your terminal. Wait for completion. 

7. Type `npm run build` to start the Webpack bundling process. 

8. Type `npm start`. 

9. Open your internet browser and navigate to http://localhost:5000/1/ to see reviews for product 1! Replace the 1 in the URL for any number through 100 to get reviews for different products. 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

