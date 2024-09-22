FROM node:22

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src ./src
COPY ./.env ./.env
COPY ./public ./public

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm","start"]