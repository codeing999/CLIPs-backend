#!/bin/bash
REPOSITORY=/home/ubuntu/clips-backend

cd $REPOSITORY

sudo npm ci

sudo ls -al

sudo pm2 start ./src/app.js