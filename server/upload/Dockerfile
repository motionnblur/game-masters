FROM eclipse-temurin:17-jdk-alpine

WORKDIR /App

COPY .mvn .mvn
COPY mvnw pom.xml ./
COPY src src

RUN apk update
RUN apk upgrade
RUN apk add --no-cache ffmpeg

RUN ./mvnw dependency:go-offline

CMD ["./mvnw", "spring-boot:run"]
