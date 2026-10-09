# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copy dependency configuration and source files
COPY pom.xml .
COPY src ./src

# Build production jar skipping tests (tests would require live DB during build)
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Render assigns dynamic port via $PORT env var (defaults to 8080)
EXPOSE 8080

# Run with container-aware JVM settings to prevent memory exhaustion on free tier
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
