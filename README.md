# supportopia-backend

## Installation Guidelines

### Prerequisites
- Node.js and npm
  - Ensure Node.js are installed. You can download them from [https://nodejs.org](https://nodejs.org)


### Download or clone this repository
- Open a terminal and write following command to clone this repository
  
  ```
  git clone git@github.com:kavania2002/supportopia-backend.git
  ```

### Install Dependencies
- Navigate to the project directory
  ```
  cd supportopia-backend
  ```
- Run the following command to install the dependencies
  ```
  npm install
  ```

### Set the Environment Variables
- Add ```.env``` file and set following values
  ```
  DBUSER=
  DBPASS=
  MY_APP_AWS_ACCESS_KEY_ID=
  MY_APP_AWS_SECRET_ACCESS_KEY=
  JWT_SECRET=
  ```

### Start the server
- Run following command to start the server
  ```
  node index.js
  ```
- Check if the server is up and running by opening the link in browser
  ```
  http://localhost:8000/ping
  ```

  You should see **Hello World!** in the output

### API Documentation
- You could see more APIs [here](https://documenter.getpostman.com/view/31254647/2s9Ykhi4rb).
