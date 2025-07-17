Додаток для фільмів
React-додаток для керування фільмами .
Швидкий старт
Запустіть додаток однією командою:
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 -e API_KEY=your-api-key your_super_account/movies

Конфігурація
Додаток використовує змінні середовища для конфігурації:

API_URL - URL API бекенду (за замовчуванням: http://localhost:8000/api/v1)
API_KEY - Ключ автентифікації API (за замовчуванням: your-default-api-key)

Побудова Docker-образу
Локальна побудова:
docker build -t your_super_account/movies .

Відправлення на DockerHub:
docker push your_super_account/movies

Запуск із різними URL API
Локальна розробка:
docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 -e API_KEY=dev-key your_super_account/movies

Віддалений сервер:
docker run --name movies -p 3000:3000 -e API_URL=http://192.168.1.44:8000/api/v1 -e API_KEY=prod-key your_super_account/movies

Продакшен:
docker run --name movies -p 3000:3000 -e API_URL=https://api.example.com/v1 -e API_KEY=prod-api-key your_super_account/movies

Розробка
Передумови:

Node.js 18+
npm

Локальна розробка:
npm install
npm run dev

Побудова для продакшену:
npm run build

Використання конфігурації середовища у вашому додатку
Додайте це до вашого index.html:

<script src="/env.js"></script>

Потім використовуйте у вашому JavaScript:
const apiUrl = window.ENV?.API_URL || "http://localhost:8000/api/v1";
const apiKey = window.ENV?.API_KEY || "your-default-api-key";

Команди Docker
Зупинка контейнера:
docker stop movies

Видалення контейнера:
docker rm movies

Перегляд логів:
docker logs movies

Запуск у фоновому режимі:
docker run -d --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 -e API_KEY=your-api-key your_super_account/movies
