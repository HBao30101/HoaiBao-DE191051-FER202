import React, { useState } from 'react';
import { Table, Card, Alert, Spinner, Button, Modal, Form } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../services/api';

const PaymentTable = () => {
    const { filteredPayments, loading, error, deletePayment, addPayment, updatePayment } = usePayment();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({});
    const [adding, setAdding] = useState(false);
    const [newPayment, setNewPayment] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: ''
    });

    // Tổng số tiền
    const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

    // Xử lý edit row
    const handleEditClick = (payment) => {
        setEditingId(payment.id);
        setEditingData({ ...payment });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingData({});
    };

    const handleSaveEdit = async (payment) => {
        const { semester, courseName, amount, date } = editingData;
        if (!semester || !courseName || !amount || !date) {
            alert('All fields are required');
            return;
        }
        const result = await updatePayment(payment.id, {
            semester,
            courseName,
            amount: Number(amount),
            date
        });
        if (result.success) {
            handleCancelEdit();
        } else {
            alert(result.error);
        }
    };

    // Xử lý add row
    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewPayment((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPayment = async () => {
        const { semester, courseName, amount, date } = newPayment;
        if (!semester || !courseName || !amount || !date) {
            alert('All fields are required');
            return;
        }
        const result = await addPayment({
            semester,
            courseName,
            amount: Number(amount),
            date
        });
        if (result.success) {
            setAdding(false);
            setNewPayment({ semester: '', courseName: '', amount: '', date: '' });
        } else {
            alert(result.error);
        }
    };

    // Xử lý delete
    const handleDeleteClick = (payment) => {
        setPaymentToDelete(payment);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (paymentToDelete) {
            setDeleting(true);
            const result = await deletePayment(paymentToDelete.id);
            setDeleting(false);
            if (result.success) {
                setShowDeleteModal(false);
                setPaymentToDelete(null);
            } else {
                alert('Error deleting payment: ' + result.error);
            }
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPaymentToDelete(null);
    };

    if (loading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Payment List</Card.Header>
                <Card.Body className="text-center">
                    <Spinner animation="border" role="status" />
                    <p className="mt-2">Loading payments...</p>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Payment List</Card.Header>
                <Card.Body>
                    <Alert variant="danger">Error loading payments: {error}</Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                    <span>Payment List ({filteredPayments.length} payments)</span>
                    <Button variant="success" onClick={() => setAdding(true)}>
                        Add New Payment
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive className="payment-table">
                        <thead className="table-header">
                            <tr>
                                <th className="text-center">#</th>
                                <th>Semester</th>
                                <th>Course Name</th>
                                <th>Amount</th>
                                <th className="text-center">Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adding && (
                                <tr className="table-success">
                                    <td className="text-center text-muted">#</td>
                                    <td>
                                        <Form.Control
                                            name="semester"
                                            value={newPayment.semester}
                                            onChange={handleAddChange}
                                            placeholder="Semester"
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            name="courseName"
                                            value={newPayment.courseName}
                                            onChange={handleAddChange}
                                            placeholder="Course Name"
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={newPayment.amount}
                                            onChange={handleAddChange}
                                            placeholder="Amount"
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={newPayment.date}
                                            onChange={handleAddChange}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <Button size="sm" onClick={handleAddPayment}>
                                            Add
                                        </Button>{' '}
                                        <Button size="sm" variant="secondary" onClick={() => setAdding(false)}>
                                            Cancel
                                        </Button>
                                    </td>
                                </tr>
                            )}
                            {filteredPayments.map((payment, index) => {
                                const isEditing = editingId === payment.id;
                                return (
                                    <tr key={payment.id}>
                                        <td className="text-center text-muted">{index + 1}</td>
                                        <td>
                                            {isEditing ? (
                                                <Form.Control
                                                    name="semester"
                                                    value={editingData.semester}
                                                    onChange={handleEditChange}
                                                />
                                            ) : (
                                                payment.semester
                                            )}
                                        </td>
                                        <td>
                                            {isEditing ? (
                                                <Form.Control
                                                    name="courseName"
                                                    value={editingData.courseName}
                                                    onChange={handleEditChange}
                                                />
                                            ) : (
                                                payment.courseName
                                            )}
                                        </td>
                                        <td>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="number"
                                                    name="amount"
                                                    value={editingData.amount}
                                                    onChange={handleEditChange}
                                                />
                                            ) : (
                                                formatCurrency(payment.amount)
                                            )}
                                        </td>
                                        <td>
                                            {isEditing ? (
                                                <Form.Control
                                                    type="date"
                                                    name="date"
                                                    value={editingData.date}
                                                    onChange={handleEditChange}
                                                />
                                            ) : (
                                                formatDate(payment.date)
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {isEditing ? (
                                                <>
                                                    <Button size="sm" onClick={() => handleSaveEdit(payment)}>
                                                        Save
                                                    </Button>{' '}
                                                    <Button size="sm" variant="secondary" onClick={handleCancelEdit}>
                                                        Cancel
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-warning"
                                                        onClick={() => handleEditClick(payment)}
                                                    >
                                                        Edit
                                                    </Button>{' '}
                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={() => handleDeleteClick(payment)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>

                    {/* Total Amount */}
                    <div className="d-flex justify-content-end mt-3">
                        <Card className="border-primary" style={{ width: '300px' }}>
                            <Card.Body>
                                <h5 className="text-primary mb-0">
                                    Total Amount: {formatCurrency(totalAmount)}
                                </h5>
                            </Card.Body>
                        </Card>
                    </div>
                </Card.Body>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the payment for "{paymentToDelete?.courseName}" in{' '}
                    {paymentToDelete?.semester}?
                    <br />
                    <strong>
                        Amount: {paymentToDelete && formatCurrency(paymentToDelete.amount)}
                    </strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
                        {deleting ? (
                            <>
                                <Spinner size="sm" animation="border" className="me-2" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PaymentTable;
