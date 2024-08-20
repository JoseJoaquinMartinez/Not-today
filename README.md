
# Not-today

Bienvenido al repositorio "Not-today". Este README proporciona instrucciones para inicializar y ejecutar el proyecto, incluyendo el frontend, Docker y las migraciones de Prisma.

## Configuración inicial

1. Clona el repositorio:
```
git clone https://github.com/JoseJoaquinMartinez/Not-today.git
```

2. Navega al directorio del proyecto:
```
cd Not-today
```

3. Instala las dependencias:
```
npm install
````

4. Configura las variables de entorno:
- Copia el archivo `.env.template` a `.env`
- Rellena las variables en el archivo `.env`:
  ```
  BACKEND_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
  POSTGRES_USER=
  POSTGRES_PASSWORD=
  ```

## Ejecución del proyecto

### Frontend

Para iniciar el frontend en modo de desarrollo, ejecuta:

```
npm run dev
```

### Docker Compose

Para levantar la base de datos PostgreSQL con Docker Compose, ejecuta:

```
docker-compose up -d
````

El archivo `docker-compose.yml` está configurado de la siguiente manera:

```yaml
version: "3.9"
services:
  myDB:
    image: postgres
    container_name: not-today-db
    restart: always
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=not-today-db
    volumes:
      - ./postgres:/var/lib/postgresql/data
````

Para detener y eliminar los contenedores:

```
docker-compose down
```

## Prisma y migraciones de base de datos

Instalación del Prisma CLI en dependencias de desarrollo

```
npx prisma init --datasource-provider PostgreSQL
```

Para ejecutar las migraciones de Prisma, usa los siguientes comandos:

1. Generar una nueva migración:

   ```
   npx prisma migrate dev --name nombre_de_la_migracion
   ```

2. Aplicar las migraciones en producción:

   ```
   npx prisma migrate deploy
   ```

3. Ver el estado de las migraciones:
   ```
   npx prisma migrate status
   ```

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Vite para el frontend.
- `npm run build`: Compila TypeScript y construye la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para verificar el código.
- `npm run preview`: Inicia el servidor de vista previa de Vite.

## Contribuir

Si deseas contribuir al proyecto, por favor:

1. Crea un fork del repositorio.
2. Crea una nueva rama para tu función: `git checkout -b feature/AmazingFeature`
3. Haz commit de tus cambios: `git commit -m 'Add some AmazingFeature'`
4. Empuja la rama: `git push origin feature/AmazingFeature`
5. Abre un Pull Request.

## Problemas y sugerencias

Si encuentras algún problema o tienes sugerencias para mejorar el proyecto, por favor abre un issue en el repositorio de GitHub.

---

¡Gracias por contribuir a Not-today!




