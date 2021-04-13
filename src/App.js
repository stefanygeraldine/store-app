import React from 'react'
import Form from "./form/Form";
import Background from './assets/fondo.jpg'

function App() {
  return (
    <div style={{
      backgroundImage: `url(${Background})`,
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right bottom',
      backgroundColor: '#e0d28b',
    }}>
      <Form/>
    </div>
  );
}

export default App;
