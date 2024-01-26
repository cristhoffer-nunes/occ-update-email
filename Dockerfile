# Use a imagem do Node.js como base
FROM node:18.18.2

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do npm
RUN yarn install

# Copie o código fonte da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta 4000 do contêiner
EXPOSE ${PORT}

# Defina a variável de ambiente para configurar a porta do serviço NestJS
ENV PORT=${PORT}
ENV OCC_URL = ${OCC_URL}
ENV OCC_APPKEY = {OCC_APPKEY}

# Comando para iniciar o servidor
CMD ["yarn", "start:prod"]
