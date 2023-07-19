# Usa una imagen base de Node.js para construir el contenedor
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app
ENV NODE_ENV production

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package.json .

# Instala las dependencias del proyecto
RUN npm i

# Copia los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto 3000 (o el puerto que uses en tu proyecto)
EXPOSE 3000

# Define el comando para iniciar la aplicación en el contenedor
CMD ["npm", "run", "start"]