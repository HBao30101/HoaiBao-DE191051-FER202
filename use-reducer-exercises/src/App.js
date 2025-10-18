import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent.jsx';
import LoginForm from './components/LoginForm.jsx';
import LightSwitch from './components/LightSwitch.jsx';
import QuestionBank from './components/QuestionBank.jsx';
import SignUpForm from './components/SignUpForm.jsx';
function App() {
  return (
    <div>
     <CounterComponent />
     <LightSwitch />
     <LoginForm/>
     <SignUpForm/>
     <QuestionBank />
    </div>
  );
}

export default App;

