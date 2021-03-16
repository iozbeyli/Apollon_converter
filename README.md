# Apollon Standalone

Converter server for the [Apollon Editor](https://github.com/ls1intum/Apollon)

## Build the application

#### Hosting

The application can be hosted by any http server which can serve static files, e.g. nginx or aws s3.
Simply point your URL to the index.html of the web application (build/webapp/index.html) and the single
page application will be loaded.

### Application server

There are two variants to set this up:
1. Manual on a linux vm
2. In a docker container

#### Manual setup (Installation of application server on linux machine)
```
# clone the repository
git clone https://github.com/ls1intum/Apollon_converter

# install the dependencies
yarn install

# set environment variable
export DEPLOYMENT_URL=https://apollon_converter.ase.in.tum.de/

# build the application server
yarn build

# the output can be found in build directory of the project root
```

Add a user for the application:

```
sudo useradd -r -s /bin/false apollon_converter

# give ownage of files to application user
chown -R apollon_converter path/to/application
```

#### Install as a service

Configure the apollon_converter.service file so that the paths 
match the paths to your installation folder

```
# After adjusting the service file, copy the service file apollon_converter.service 
# into the /etc/systemd/system directory service apollon_converter start
cp apollon_converter.service /etc/systemd/system/

# make sure the server.js file is executable by application user
cd path/to/application/build
chmod +x bundle.js

# Start the service 
sudo service apollon_converter start

# Status of the service
service apollon_converter status
```

Error codes on server start:
- (code=exited, status=217/USER) -> apollon_converter user does not exist
- (code=exited, status=203/USER) -> script not executable

### Docker Container

```
# clone the repository
git clone https://github.com/ls1intum/Apollon_converter

# build docker container
docker build -t apollon_converter .

run docker container 
docker run -d --name apollon_converter -p 8080:8080 apollon_converter

# build the application server
yarn build

# the output can be found in build directory of the project root
```

useful command to debug:

```
# start bash in running docker container to look at internal files
docker run -it --entrypoint /bin/bash apollon_converter
```

## Developer Setup

```
# installs dependencies
yarn install

# build application
yarn build

# start webpack dev server
yarn start

# accesible via localhost:8080 (application server)
```
