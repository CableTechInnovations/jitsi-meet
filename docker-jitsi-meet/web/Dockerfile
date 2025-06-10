FROM node:18 as build

# Copia o código customizado do Jitsi
WORKDIR /app
COPY . .

# Instala dependências e compila o front-end
RUN cd react && npm install && npm run build

# Stage final do container
FROM nginx:alpine
COPY --from=build /app/react/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]