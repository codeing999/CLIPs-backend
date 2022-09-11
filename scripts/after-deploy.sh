#!/bin/bash
REPOSITORY=/home/ubuntu/clips-backend

cd $REPOSITORY

sudo npm clips

sudo pm2 restart ./src/app.js