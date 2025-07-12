# Usar imagen oficial de OpenJDK 17 (o la versión que uses)
FROM openjdk:17-jdk-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar todos los archivos de la app al contenedor
COPY . .

# Dar permisos ejecutables a mvnw (por si hace falta)
RUN chmod +x mvnw

# Construir la app con Maven Wrapper (sin tests para acelerar)
RUN ./mvnw clean package -DskipTests

# Exponer el puerto que usará Spring Boot (por defecto 8080)
EXPOSE 8080

# Ejecutar la app (ajustá el nombre del JAR si hace falta)
CMD ["java", "-jar", "target/easystore-0.0.1-SNAPSHOT.jar"]
