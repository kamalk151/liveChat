FROM node:20-alpine
WORKDIR /app
# Copies package.json and package-lock.json from your local project into the container’s /app directory
COPY package.json package-lock.json ./
RUN npm ci
# copies the rest of your application code into the container’s /app directory
COPY . .
# Sets the environment variable NODE_ENV to production
RUN npm run build
EXPOSE 3000
# Starts the application using npm start
# ENV NODE_ENV=production
CMD ["npm", "start"]
