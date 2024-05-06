

import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './utils/appStore';
import { Suspense } from 'react';

function App() {
  return (
    <Provider store={appStore}>
      <Suspense fallback={<div>Loading....</div>}>
          <Body />
      </Suspense>
      
    </Provider>
  );
}

export default App;
