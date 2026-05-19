FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vite ya React standard development port (Vite hai toh 5173, normal CRA hai toh 3000)
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
