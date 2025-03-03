# Hướng dẫn chạy dự án NestJS & Next.js

## 1. Cài đặt môi trường
### Backend (NestJS)
Yêu cầu:
- Node.js >= 16
- NPM 
- MongoDB

### Frontend (Next.js)
Yêu cầu:
- Node.js >= 16
- NPM 

## 2. Cấu trúc thư mục
```
backend/
  ├── src/
  │   ├── auth/
  │   ├── common/
  │   ├── global/
  │   ├── providers/
  │   │   ├── mail/
  │   │   │   ├── mailler.ts
  │   │   ├── storage/
  │   │       ├── firebase/
  │   │           ├── config.ts
  │   │           ├── firebase.service.ts
  │   │           ├── keyfirebase.json
  │   ├── app.module.ts
  ├── .env
  ├── package.json
  ├── tsconfig.json
```

## 3. Cấu hình môi trường
### Bjsonnd (.env)
```env
DB_URL=mongodb+srv://hieu78544:LeMinhHieu@cluster0.dndew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=leminhhieu
JWT_EXPIRES=1h

MAIL_HOST=smtp.gmail.com
MAIL_PORT=25
MAIL_USERNAME=hieu78544@gmail.com
MAIL_PASSWORD=ltwdsbxeveigmtzh

```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_PROTOCOL=http
NEXT_PUBLIC_API_HOST=localhost
NEXT_PUBLIC_API_PORT=9999
NEXT_PUBLIC_API_BASE_PATH=/api
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3
NEXT_PUBLIC_API_RETRY_DELAY=1000
```

## 4. Chạy dự án
### Backend (NestJS)
```sh
cd backend
npm install
npm run start:dev
```

### Frontend (Next.js)
```sh
cd frontend
npm install
npm run dev
```

Sau khi chạy xong:
- Backend chạy tại: `http://localhost:9999`
- Frontend chạy tại: `http://localhost:3000`


## 6. Ghi chú
- Đảm bảo `.env` của backend và `.env.local` của frontend được thiết lập đúng.
- Vì lí do chính sách của github không cho phép push các key firebase lên nên cần tải file đã nén providers và đặt thư mục vào src của backend.
- Tài khoản đăng nhập: Email: hieu@gmail.com, Password: 123456



