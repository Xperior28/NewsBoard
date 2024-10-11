# NewsBoard
## Description

NewsBoard is a personalised News Feed Generator written in Javascript, that understands the interests of the users as they use the web app and tailors the news feed accordingly.
- keyBERT python library's transformer model is used to extract important keywords from the articles visited by the user.
- Redis cache is used as a layer on top of MongoDB to allow quick data exchange.
- JWT tokens help keep track of users and authenticate them.
- NodeJs and ExpressJS is used in the backend to render articles from the NewsAPI, which is then displayed on the frontend powered by ReactJS.

## Features
- Login using username/email
- Read the latest headlines, or your personalised news feed.

## Installation

NewsBoard runs on a ReactJS frontend, NodeJs/ExpressJs backend and a Python Server for using the transformer model. 

Install the dependencies for node_modules, create a virtual environment for the python server and start all the servers.

Run the frontend 
```sh
cd frontend
npm i
npm run dev
```
Run the backend node server 
```sh
cd server
npm i
npm run dev
```
Run the keyBERT python server
```sh
cd keyBERT-server
pip install -r requirements.txt
python script.py
```
## Environment Variables
Set up a .env file with the following fields
```sh
PORT = your-port
MONGO_URI = your-mongo-uri
JWT_SECRET = your-jwt-secret
NEWS_API_KEY = your-newsapi-key
REDIS_KEY = your-redis-key
```


## License
MIT

