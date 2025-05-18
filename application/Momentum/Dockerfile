FROM --platform=linux/amd64 public.ecr.aws/docker/library/eclipse-temurin:24-jdk-alpine AS build

WORKDIR /app

COPY . .

RUN ./mvnw package -DskipTests

FROM --platform=linux/amd64 public.ecr.aws/docker/library/eclipse-temurin:24-jre-alpine

WORKDIR /app

COPY --from=build /app/target/momentum-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD [ "java", "-jar", "app.jar" ]