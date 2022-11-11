FROM node:16-slim
COPY package*.json ./
RUN npm i
COPY config/ config/
COPY models/ models/
COPY routes/ routes/
COPY tests/ tests/
COPY controllers/ controllers/
COPY server.js ./
EXPOSE 8081/tcp
CMD ["npm", "start"]