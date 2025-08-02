# liveChat/bff/Dockerfile
FROM node:18-alpine
WORKDIR /app
# Copies package.json and package-lock.json from your local project into the container’s /app directory
COPY package.json package-lock.json ./
# Installs the dependencies defined in package-lock.json
RUN npm ci
# Copies the rest of your application code into the container’s /app directory
COPY . .
#
EXPOSE 3080
# Sets the environment variable NODE_ENV to production
ENV NODE_ENV=production
# Builds the application
CMD ["npm", "start"]
