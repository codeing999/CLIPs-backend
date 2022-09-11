#!/bin/bash
REPOSITORY=/home/ubuntu/clips-backend/src

cd $REPOSITORY

sudo npm ci

sudo ls -al

sudo pm2 start app.js