# Use Node.js Alpine image for building the application
FROM --platform=linux/amd64 public.ecr.aws/docker/library/node:22.16.0-alpine3.21 AS build

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Use Nginx Alpine image for serving the application
FROM --platform=linux/amd64 public.ecr.aws/nginx/nginx:stable-alpine

# Copy built application from build stage to nginx html directory
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Copy nginx configuration template
COPY ./default.conf.template /etc/nginx/templates/default.conf.template

# Expose port 80 for HTTP traffic
EXPOSE 80