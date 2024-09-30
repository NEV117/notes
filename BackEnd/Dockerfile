# Usa la imagen base de Maven para compilar la aplicación
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copia los archivos del proyecto
COPY pom.xml .
COPY src ./src

# Compila la aplicación
RUN mvn clean package -DskipTests

# Usa una imagen más ligera para la ejecución
FROM eclipse-temurin:17
WORKDIR /app

# Copia el JAR desde la imagen de compilación
COPY --from=build /app/target/*.jar spring-boot-nev-ensolvers-challenge.jar

# Expone el puerto de la aplicación
EXPOSE 8080

# Ejecuta la aplicación
ENTRYPOINT ["java", "-jar", "spring-boot-nev-ensolvers-challenge.jar"]
