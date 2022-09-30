# Node image used for build-stage
FROM node:lts-slim as Development

# Create folder structure in container
RUN mkdir -p /home/app
# Setup working dir in container
WORKDIR /home/app

# Copy Dependecies needed
COPY ./package.json .
COPY ./package-lock.json .
# Download dependencies 
RUN npm install 
RUN npm install -g typescript
# Copy app files in container folders
COPY . .
# Build dist js files
RUN npm run build


# Node image used in app production-stage
FROM node:lts-slim as Production

ENV DB_NAME=ong
ENV DB_USER=root
ENV DB_PASSWORD=
ENV DB_PORT=3306
ENV JWT_SECRET=mysecretekeymysecretekey

# Setup working dir in container
WORKDIR /home/app
# Copy Dependecies needed
COPY ./package*.json .
# Download dependencies (production)
RUN npm ci --only=production
COPY --from=Development /home/app/dist ./dist

# Define container port listening 
EXPOSE 3000

# Commands to run
CMD [ "node", "dist/src/bin/www.js" ]

