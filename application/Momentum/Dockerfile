# Use Eclipse Temurin JDK 24 on Alpine Linux for the build stage
FROM --platform=linux/amd64 public.ecr.aws/docker/library/eclipse-temurin:24-jdk-alpine AS build

# Set working directory for the build
WORKDIR /app

# Copy all source code and build files to the container
COPY . .

# Make Maven wrapper executable and build the application (skip tests for faster build)
RUN chmod +x ./mvnw && ./mvnw package -DskipTests

# Use Eclipse Temurin JRE 24 on Alpine Linux for the runtime stage (smaller image)
FROM --platform=linux/amd64 public.ecr.aws/docker/library/eclipse-temurin:24-jre-alpine

# Set working directory for the runtime
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/momentum-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 for the Spring Boot application
EXPOSE 8080

# Run the Spring Boot application
CMD [ "java", "-jar", "app.jar" ]