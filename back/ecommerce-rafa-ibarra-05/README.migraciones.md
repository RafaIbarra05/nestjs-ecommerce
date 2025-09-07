# 🧱 Migraciones con TypeORM y NestJS

Este archivo documenta el flujo de trabajo recomendado para gestionar migraciones de base de datos en este proyecto e-commerce con NestJS, PostgreSQL y TypeORM.

---

## ⚙️ Configuración inicial (ya completada)

- TypeORM configurado en `typeorm-cli.config.ts`
- `.env` con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=proyect_m4_test_db
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_SYNC=false
DB_LOGGING=true
```

- Entidades ubicadas en `src/**/entities/*.entity.ts`
- Migraciones generadas en `src/database/migrations/*.ts`

---

## 🛠 ¿Cuándo generar una nueva migración?

Cada vez que se modifica una entidad:

- Se agrega una columna
- Se elimina una propiedad
- Se cambia un tipo de dato
- Se agregan relaciones nuevas (ManyToOne, etc.)

---

## 🚀 Comandos importantes

### 📌 1. Generar una nueva migración

```bash
npm run migration:generate
```

Esto escanea los cambios en las entidades y crea un archivo en `src/database/migrations/`.

---

### 📌 2. Aplicar las migraciones pendientes

```bash
npm run migration:run
```

Aplica todas las migraciones aún no ejecutadas en la base de datos actual.

---

### 📌 3. Verificar migraciones aplicadas

Desde `psql`:

```sql
SELECT * FROM migrations;
```

---

### 📌 4. Revertir la última migración

```bash
npm run migration:revert
```

Esto deshace la migración más reciente (ideal para pruebas locales).

---

### ❗ Importante

- `synchronize` debe estar en `false` en `.env` para que **solo las migraciones controlen la estructura de la base de datos**.
- Evitar mezclar `synchronize: true` con migraciones, ya que puede causar conflictos o resultados inesperados.

---

## ✅ Estado actual (09/07/2025)

- Migraciones aplicadas correctamente:
  - `InitMigration1757017770069`
  - `InitMigration1757267255330`
- Estructura en base de datos **al día** con las entidades del código.

---
