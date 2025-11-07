import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { PaymentProvider } from './contexts/PaymentContext.jsx';

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    // 1️⃣ Bọc AuthProvider ở ngoài cùng để quản lý xác thực toàn cục
    <AuthProvider>
      {/* 2️⃣ Bọc PaymentProvider bên trong để chia sẻ dữ liệu thanh toán */}
      <PaymentProvider>
        <div className="App">
          {/* 3️⃣ Quản lý tất cả routes trong App */}
          <AppRoutes />
        </div>
      </PaymentProvider>
    </AuthProvider>
  );
}

export default App;
