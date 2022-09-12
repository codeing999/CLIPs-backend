#!/bin/bash
REPOSITORY=/home/ubuntu/clips-backend

cd $REPOSITORY

echo npmci

sudo npm ci

echo npmstart

sudo npm start
#sudo pm2 restart ./src/app.js