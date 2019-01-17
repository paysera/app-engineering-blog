# Paysera engineering blog

## Usage

Setting up:
```bash
npm install
cp .env.dist .env
vi .env
```

Running in development using docker:
```bash
npm run develop
```

Building for production:
```bash
npm run build
```

Cross-posting to medium:
```bash
npm run crosspost
```

## Usage with docker

Setting up:
```bash
docker-compose run gatsby npm install
cp .env.dist .env
vi .env
```

Running in development using docker:
```bash
docker-compose run -p 8000:8000 gatsby npm run develop
```

Building for production:
```bash
docker-compose run gatsby npm run build
```

Cross-posting to medium:
```bash
docker-compose run gatsby npm run crosspost
```
