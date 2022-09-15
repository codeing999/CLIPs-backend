#!/bin/bash
REPOSITORY=/home/ubuntu/clips-backend

cd $REPOSITORY

sudo npm install    #sudo npm ci

sudo pm2 kill
sudo npm start
