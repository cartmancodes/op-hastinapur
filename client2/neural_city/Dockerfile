# Use an official Node.js runtime as the base image, Apple M1 chip doing its incompatibility magic just adding the platform in your Dockerfile seems to solve the problem
# FROM --platform=linux/amd64 node:19.6.0-alpine as build
FROM node:19.6.0-alpine as build
# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Run the react app 
RUN npm run build

# stage 2 - build the final image and copy the react build files
# FROM --platform=linux/amd64 nginx
FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 

COPY --from=build /app/build /usr/share/nginx/html 
# Expose port 3000 or by default port 80 to the outside world
EXPOSE 3000

EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]
