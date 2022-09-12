#!/bin/bash
REPOSITORY=/home/ubuntu/clips-backend

cd $REPOSITORY

sudo npm ci

sudo npm start
#sudo pm2 restart ./src/app.js