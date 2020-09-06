import BasicExample from './BasicExample';
import CustomComponentExample from './CustomComponentExample';
import CustomValidationExample from './CustomValidationExample';
import AdvancedExample from './AdvancedExample';

const routes = [
  {
    id: 'basic-example',
    path: '/',
    title: 'Basic Example',
    Component: BasicExample,
  },
  {
    id: 'custom-component',
    path: '/custom-component',
    title: 'Custom Component Example',
    Component: CustomComponentExample,
  },
  {
    id: 'custom-validation',
    path: '/custom-validation',
    title: 'Custom Validation Example',
    Component: CustomValidationExample,
  },
  {
    id: 'advanced',
    path: '/advanced',
    title: 'Advanced Example',
    Component: AdvancedExample,
  },
];

export default routes;
