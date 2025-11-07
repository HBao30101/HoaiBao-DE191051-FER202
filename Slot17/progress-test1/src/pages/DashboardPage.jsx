import React from 'react';
import { Container, Card, Button, Navbar, Nav, Row, Col } from 'react-bootstrap'; 
import NavigationHeader from '../components/NavigationHeader';
import FilterBar from '../components/FilterBar';
import PaymentTable from '../components/PaymentTable';
const DashboardPage = () => {
      
    return (
       <>
            {/* 1. Header (Navigation Bar) */}
            <NavigationHeader />
            {/* 2. Main Dashboard Content (Grid và Card) */}
            <Container>
                <FilterBar />
                <Card className="mb-4 shadow-sm">
                    <Card.Header as="h5">Dashboard Overview</Card.Header>
                    <Card.Body>
                        {/* Nội dung chính của Dashboard sẽ được hiển thị ở đây */}
                        <PaymentTable />
                    </Card.Body>
                </Card>
            </Container>    
        </>
    );
};

export default DashboardPage;
