# Gunakan image Node.js sebagai base
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Salin seluruh file proyek ke dalam container
COPY . .

# Build aplikasi jika diperlukan
RUN npm run build

# Ekspos port aplikasi (ganti dengan port aplikasi Anda)
EXPOSE 1935
EXPOSE 8000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]