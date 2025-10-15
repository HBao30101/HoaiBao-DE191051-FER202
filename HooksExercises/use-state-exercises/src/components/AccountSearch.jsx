import React, { useState, useMemo } from 'react';

// Dữ liệu mẫu (Account Object Array)
const initialAccounts = [
  { id: 1, username: 'alice_123', password: 'pwd1', avatar: 'https://i.pinimg.com/736x/f4/5d/ac/f45dacc92f274a28a92546ef945e61a9.jpg' },
  { id: 2, username: 'bob_dev', password: 'pwd2', avatar: 'https://i.pinimg.com/1200x/4f/fe/ba/4ffeba637d8ad33306eadfbc9e276663.jpg' },
  { id: 3, username: 'charlie_pro', password: 'pwd3', avatar: 'https://i.pinimg.com/1200x/3b/31/73/3b317353597a7f385af403a3bb56f2ec.jpg' },
  { id: 4, username: 'diana_code', password: 'pwd4', avatar: 'https://i.pinimg.com/736x/d9/d3/cd/d9d3cd41355b1dde1e17870647481ab4.jpg' },
  { id: 5, username: 'eva_design', password: 'pwd5', avatar: 'https://i.pinimg.com/1200x/d7/f0/aa/d7f0aaba91b97b78ce07cbe460f5df8f.jpg' },
];

// Component con để hiển thị thông tin Account dưới dạng List Item/Card
const AccountListItem = ({ account }) => (
  <li
    style={{
      display: 'flex',
      alignItems: 'center',
      background: '#e3f2fd', // Light Blue background
      marginBottom: 10,
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: 16,
      color: '#333',
      boxShadow: '0 1px 4px rgba(33,150,243,0.1)',
    }}
  >
    {/* Avatar Hình Tròn */}
    <img
      src={account.avatar}
      alt={`${account.username}'s Avatar`}
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%', // Làm cho ảnh thành hình tròn
        objectFit: 'cover',
        marginRight: '15px',
        border: '2px solid #1976d2', // Border màu xanh dương
      }}
    />
    
    {/* Thông tin Account */}
    <div>
      <div style={{ fontWeight: 600, fontSize: 18, color: '#1976d2' }}>
        {account.username}
      </div>
      <div style={{ color: '#666', fontSize: 14 }}>
        ID: {account.id}
      </div>
    </div>
    
    <span style={{ marginLeft: 'auto', color: '#999', fontSize: 12 }}>
      (Mật khẩu ẩn)
    </span>
  </li>
);

// Component chính sử dụng Hooks và Inline Style
const AccountSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Hook useMemo: Tính toán danh sách đã lọc (logic giữ nguyên)
  const filteredAccounts = useMemo(() => {
    if (searchTerm.trim() === '') {
      return initialAccounts;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return initialAccounts.filter(account =>
      account.username.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm]);

  return (
    <div
      style={{
        maxWidth: 600, // Thay đổi max-width để hiển thị list item tốt hơn
        margin: '40px auto',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        background: '#ffffff', // Nền trắng
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#0d47a1', marginBottom: 24, borderBottom: '2px solid #e0e0e0', paddingBottom: '15px' }}>
        🔎 Tìm kiếm Account theo Username
      </h3>
      
      {/* Thanh tìm kiếm */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm username (ví dụ: 'alice', 'dev')..."
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '2px solid #bbdefb', // Border màu xanh nhạt
          marginBottom: 20,
          fontSize: 16,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.3s',
        }}
      />

      {/* Hiển thị kết quả dưới dạng danh sách (List) */}
      <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map(account => (
            <AccountListItem key={account.id} account={account} />
          ))
        ) : (
          // Hiển thị thông báo "Không tìm thấy kết quả"
          <li style={{ color: '#d32f2f', textAlign: 'center', padding: '15px 0', background: '#ffebee', borderRadius: '8px' }}>
            ⚠️ Không tìm thấy kết quả cho username "{searchTerm}".
          </li>
        )}
      </ul>
    </div>
  );
};

export default AccountSearch;