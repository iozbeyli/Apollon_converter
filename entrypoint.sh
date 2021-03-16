#!/bin/bash

echo "Docker container has been started"

cd /var/apollon_converter/build
node bundle.js
