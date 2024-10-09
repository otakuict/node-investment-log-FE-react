# Use the official Node.js image based on Debian Buster Slim as a base image
FROM node:18-buster-slim

# Set the working directory in the container
WORKDIR  /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
