

import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './utils/appStore';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={appStore}>
      <Suspense fallback={<div>Loading....</div>}>
          <Body />
          <ToastContainer position='top-right' theme='dark'/>
      </Suspense>
      
    </Provider>
  );
}

export default App;
