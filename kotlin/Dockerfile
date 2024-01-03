FROM maven:3-eclipse-temurin-21-alpine
ARG user=docker
ARG home=/home/$user
ARG port=8080

ENV MAVEN_CONFIG=/tmp/maven/.m2
ENV DB_URL=jdbc:postgresql://localhost:5432/postgres
ENV DB_USER=root

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home $home \
    $user

WORKDIR $home
COPY . .
RUN mvn package -DskipTests

USER $user
EXPOSE $port
CMD ["java", "-jar", "target/todo-app.jar"]
