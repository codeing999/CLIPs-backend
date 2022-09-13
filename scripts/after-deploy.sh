#!/bin/bash
REPOSITORY=/home/ubuntu/clips-backend

cd $REPOSITORY

sudo npm install

sudo npm start
#sudo pm2 restart ./src/app.js