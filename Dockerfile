# Basisimage
FROM node:16

# Arbeitsverzeichnis im Docker-Container
WORKDIR /usr/src/app

# Kopieren Sie package.json und package-lock.json in das Arbeitsverzeichnis
COPY package*.json ./

# Installieren Sie die npm-Abhängigkeiten, einschließlich devDependencies
RUN npm install

# Kopieren Sie den Rest des Projektverzeichnisses in das Arbeitsverzeichnis im Container
COPY . .

# Exponieren Sie den Port, auf dem Ihre Anwendung läuft (in diesem Fall 3000 für React und 5000 für den Express-Server)
EXPOSE 3000
EXPOSE 5000

# Startbefehl
CMD [ "npm", "start" ]
