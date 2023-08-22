#!/bin/bash

# Obtiene el directorio actual
current_dir=$(pwd)

# Crea la carpeta "secrets" en el mismo nivel que el directorio actual
secrets_dir="$current_dir/secrets"
mkdir -p "$secrets_dir"

# Cambia al directorio de "secrets"
cd "$secrets_dir"

# Genera las claves SECRET_KEY
openssl genpkey -algorithm RSA -out secret.key

# Genera la clave pública SECRET_PUB a partir de SECRET_KEY
openssl rsa -pubout -in secret.key -out secret.pub

# Genera las claves REFRESH_KEY
openssl genpkey -algorithm RSA -out refresh.key

# Genera la clave pública REFRESH_PUB a partir de REFRESH_KEY
openssl rsa -pubout -in refresh.key -out refresh.pub

echo "Initialized: $secrets_dir"