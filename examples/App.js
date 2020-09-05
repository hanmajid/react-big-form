import React from 'react';
import BasicExample from './BasicExample';
import CustomComponentExample from './CustomComponentExample';
import CustomValidationExample from './CustomValidationExample';
import AdvancedExample from './AdvancedExample';

const App = () => (
  <>
    <h1>A. Basic example</h1>
    <BasicExample />
    <h1>B. Custom component example</h1>
    <CustomComponentExample />
    <h1>C. Custom validation example</h1>
    <CustomValidationExample />
    <h1>D. Advanced example</h1>
    <AdvancedExample />
  </>
);

export default App;
