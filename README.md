# Chat-App
## Usage
[Chat-App.webm](https://user-images.githubusercontent.com/35199948/191189036-827d18ec-21e1-4b5c-8354-c578b4d6e8d3.webm)

- Live chat application.
React was used to develop the front end of this application, while Node.js was used to create the back end. This project also uses the MongoDB database for its data. To enable real-time, bi-directional communication between web clients and servers Socket.IO event-driven library has been used.

## Start project localy
  - Clone git repository: 
  ```sh
 git clone https://github.com/ValdasT/chat-app.git
  ```
  - Install the dependencies:
```sh
cd chat-app
cd client 
npm install
```
```sh
cd chat-app
cd server 
npm install
```
  - Create a `.env` file to hold environment variables and create values:
  >REACT_APP_AUTH_CONFIG=
  >
  >REACT_APP_BASE_URL=
  >
  >FIREBASE_ACC=
  >
  >MONGO_USER=
  >
  >MONGO_PASSWORD=
  >
  >MONGO_DB=

- To start the development server run:
```sh
npm run dev
```
- Visit `http://localhost:3000` to view your application.
