# -------- build stage --------
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# кэшируем ~/.m2, чтобы быстрее собирать на Render
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests package

# -------- run stage --------
FROM eclipse-temurin:21-jre
# бережные флаги для маленьких инстансов
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+UseSerialGC -XX:+ExitOnOutOfMemoryError"
WORKDIR /app
COPY --from=build /app/target/*-SNAPSHOT.jar app.jar

# Render пробрасывает порт через $PORT — Spring его подхватит из application-prod.yml
EXPOSE 8080
CMD ["java","-jar","/app/app.jar"]
