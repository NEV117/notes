#!/bin/bash

# Definir rutas
BACKEND_DIR="./BackEnd"
FRONTEND_DIR="./FrontEnd/ensolvers-challenge"

free_ports() {
  echo "Freeing up ports 8080 and 3000..."
  
  if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    fuser -k 8080/tcp
    echo "Port 8080 released."
  else
    echo "Port 8080 is not in use."
  fi

  if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    fuser -k 3000/tcp
    echo "Port 3000 released."
  else
    echo "Port 3000 is not in use."
  fi
}

start_backend() {
  echo "Starting the backend application..."
  cd $BACKEND_DIR

  if ! command -v mvn &> /dev/null; then
    echo "Maven is not installed. Installing Maven..."
    sudo apt-get update
    sudo apt-get install maven -y
  fi

  mvn clean package -DskipTests

  # Ejecutar el JAR generado
  JAR_FILE=$(ls target/*.jar | head -n 1)
  if [ -f "$JAR_FILE" ]; then
    echo "Ejecutando $JAR_FILE"
    java -jar $JAR_FILE &
  else
    echo "JAR file not found in target folder"
    exit 1
  fi

  cd - > /dev/null
}

start_frontend() {
  echo "Starting the frontend application..."
  cd $FRONTEND_DIR

  if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js..."
    sudo apt-get update
    sudo apt-get install -y nodejs
  fi

  # Verificar si npm está instalado y en el PATH
  if ! command -v npm &> /dev/null; then
    echo "npm no está instalado. Instalando npm..."
    brew install npm
  fi

  if ! command -v yarn &> /dev/null; then
    echo "Yarn is not installed. Installing Yarn..."
    npm install --global yarn
  fi

  yarn install
  yarn run dev &

  cd - > /dev/null
}

free_ports

start_backend
start_frontend

echo "The backend (localhost:8080) APP have been STARTED."
echo "The frontend (localhost:3000) APP have been STARTED."
