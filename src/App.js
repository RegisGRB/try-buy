import './styles/index.scss';
import React from 'react';


import { useHistory } from 'react-router';

function App() {
let history = useHistory();
  
  React.useEffect(()=>{
    // new Main(history)
  },[])
  
  return (
    <>
   {/* <Loader></Loader>
   <Overlay></Overlay> */}
   </>
  );
}

export default App;
