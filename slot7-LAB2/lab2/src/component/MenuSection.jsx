// MenuSection.jsx
import React from 'react';
import PizzaCard from './PizzaCard'; // Giả sử PizzaCard đã được import

// Dữ liệu mẫu với các URL ảnh khác nhau cho mỗi loại Pizza
const pizzaData = [
  { 
    name: "Margherita Pizza", 
    price: "40.00", 
    oldPrice: "74.00", 
    tag: "NEW", 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/1200px-Supreme_pizza.jpg' 
  },
  { 
    name: "Mushroom Pizza", 
    price: "25.00", 
    oldPrice: null, 
    tag: null, 
    imageUrl: 'https://file.hstatic.net/200000700229/article/lam-pizza-ga-pho-mai-bang-noi-chien-khong-dau_2fd987541e3e4ea7b16e94bdd1a73764.jpg' 
  },
  { 
    name: "Hawaiian Pizza", 
    price: "30.00", 
    oldPrice: null, 
    tag: "NEW", 
    imageUrl: 'https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg' 
  },
  { 
    name: "Pesto Pizza", 
    price: "50.00", 
    oldPrice: "90.00", 
    tag: "NEW", 
    imageUrl: 'https://product.hstatic.net/1000389344/product/tuna__6_d31dc917e03f4e1fbdde4f236b224188_master.png' 
  },
];

const MenuSection = () => {
  return (
    <section className="menu-section py-5 bg-dark">
      <div className="container">
        <h2 className="text-light text-start mb-4">Our Menu</h2>
        <div className="row">
          {pizzaData.map((pizza, index) => (
            <PizzaCard 
              key={index}
              name={pizza.name}
              price={pizza.price}
              oldPrice={pizza.oldPrice}
              tag={pizza.tag}
              // ⭐️ Cập nhật: Truyền giá trị pizza.imageUrl tương ứng ⭐️
              imageUrl={pizza.imageUrl} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;