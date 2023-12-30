FROM maven:3-eclipse-temurin-21-alpine
ARG user=docker
ARG home=/home/$user
ARG port=8080

ENV MAVEN_CONFIG=/tmp/maven/.m2

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home $home \
    $user

WORKDIR $home
COPY . .
RUN mvn package

USER $user
EXPOSE $port
CMD ["java", "-jar", "target/demo-0.0.1.jar"]