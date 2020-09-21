# Nutrition Tracker

Para começar a desenvolver:

1. Instala o Docker
2. Instala o MongoDB Compass (GUI vai ser util para local)
3. Faz git clone e 'cd' para a pasta
4. Fazes ```docker-compose up mongo``` e a DB vai comecar. Podes te ligar a ela usando o MongoDB Compass. Basta carregares em "Connect" sem qualquer connection URL que ele por default vai encontrar.
5. Fazes ```docker-compose build web && docker-compose up web``` e isso vai ligar o servidor.
6. Podes fazer pedidos para localhost:8080 como é normal...