# Node image used for build-stage
FROM node:lts-slim as Development

# Create folder structure in container
RUN mkdir -p /home/app
# Setup working dir in container
WORKDIR /home/app

# Copy Dependecies needed
COPY ./package*.json .
# Download dependencies (development)
RUN npm install 
RUN npm install -g typescript
RUN npm install -g nodemon

# Copy app source code
COPY ./src ./src
COPY ./uploads ./uploads
COPY ./.sequelizerc ./.sequelizerc
COPY ./tsconfig.json ./tsconfig.json
# Build dist js files
RUN tsc --build



# Node image used in app production-stage
FROM node:lts-slim as Production

# Create folder structure in container
RUN mkdir -p /home/app
# Setup working dir in container
WORKDIR /home/app

# Copy Dependecies needed
COPY ./package*.json .
# Download dependencies (production)
RUN npm i --only=production
COPY --from=Development /home/app/dist ./dist

# Commands to run
CMD [ "node", "dist/src/bin/www.js" ]

