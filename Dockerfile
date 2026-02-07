# Étape de build
FROM node:22-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (build déterministe)
RUN npm ci

# Copier le code source
COPY . .

# Builder l'application
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/build/client /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]