# Use an official Node.js runtime as the base image, Apple M1 chip doing its incompatibility magic just adding the platform in your Dockerfile seems to solve the problem
# FROM --platform=linux/amd64 node:19.6.0-alpine
FROM node:19.6.0-alpine
# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 

# Build the React app
EXPOSE 3000

# Run the react app 
CMD ["npm", "start"]

# Run the container using the following command
# docker run \
#     -it \
#     --rm \
#     -p 3001:3000 \
#     neural-city:latest

