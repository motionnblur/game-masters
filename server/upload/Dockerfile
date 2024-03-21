FROM eclipse-temurin:17-jdk-alpine

WORKDIR /App

COPY .mvn .mvn
COPY mvnw pom.xml ./

RUN apk update && apt upgrade
RUN apk add --no-cache ffmpeg

RUN ./mvnw dependency:go-offline

COPY src src

CMD ["./mvnw", "spring-boot:run"]
