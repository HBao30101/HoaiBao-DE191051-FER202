import React, { useReducer } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

function LightSwitch() {
    // Initial state
    const initialState = {
        isLightOn: false
    };

    // Reducer function
    const lightReducer = (state, action) => {
        switch (action.type) {
            case 'TOGGLE_LIGHT':
                return {
                    ...state,
                    isLightOn: !state.isLightOn
                };
            case 'TURN_ON':
                return {
                    ...state,
                    isLightOn: true
                };
            case 'TURN_OFF':
                return {
                    ...state,
                    isLightOn: false
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(lightReducer, initialState);
    const { isLightOn } = state;

    // Hàm để chuyển đổi trạng thái đèn
    const toggleLight = () => dispatch({ type: 'TOGGLE_LIGHT' });
    
    // Các hàm bổ sung
    const turnOnLight = () => dispatch({ type: 'TURN_ON' });
    const turnOffLight = () => dispatch({ type: 'TURN_OFF' });

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>
                    <h2 className="text-center">Công Tắc Đèn</h2>
                </Card.Header>
                <Card.Body className="text-center">
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        Đèn hiện đang: {isLightOn ? 'Bật' : 'Tắt'}  
                    </p>
                    
                    <Button
                        onClick={toggleLight}   
                        variant={isLightOn ? 'danger' : 'success'}
                        size="lg"
                        className="mb-2"
                    >
                        {isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}  
                    </Button>
                    
                    {/* Các nút bổ sung */}
                    <div>
                        <Button
                            onClick={turnOnLight}
                            variant="primary"
                            className="me-2"
                        >
                            Bật Đèn
                        </Button>
                        <Button
                            onClick={turnOffLight}
                            variant="secondary"
                        >
                            Tắt Đèn
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LightSwitch;