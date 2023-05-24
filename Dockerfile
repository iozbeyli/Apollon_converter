# multistage docker build

# should be a absolute path
ARG build_dir=/build_application

# first stage which builds the application
FROM node:18

ARG build_dir
ENV DEPLOYMENT_URL="http://localhost:8081"

# make build dir
WORKDIR $build_dir

COPY . .
RUN yarn install
RUN yarn build

# second stage which creates the container image to run the application
FROM node:18

EXPOSE 8081

RUN useradd -r -s /bin/false apollon_converter
RUN mkdir /opt/apollon_converter

RUN chown -R apollon_converter /opt/apollon_converter

USER apollon_converter
WORKDIR /opt/apollon_converter

ARG build_dir

# copies build result from first stage
COPY --chown=apollon_converter:apollon_converter --from=0 $build_dir .

WORKDIR /opt/apollon_converter/build

CMD [ "node", "bundle.js" ]
