import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const query = new URLSearchParams(window.location.search);
  const button = useRef();

  useEffect(() => {
    const onLoaded = ({ details }) => { console.log('loaded', details); };
    const onFinished = ({ details }) => { console.log('finished', details); };
    const onExit = ({ details }) => { console.log('exited', details); };

    button.current?.addEventListener('mati:loaded', onLoaded);
    button.current?.addEventListener('mati:userFinishedSdk', onFinished);
    button.current?.addEventListener('mati:exitedSdk', onExit);

    return () => {
      button.current?.removeEventListener('mati:loaded', onLoaded);
      button.current?.removeEventListener('mati:userFinishedSdk', onFinished);
      button.current?.removeEventListener('mati:exitedSdk', onExit);
    };
  }, [button.current]);

  return (
    <div className="container">
      <p>
        Add <b>merchantToken</b> and <b>flowId</b> to url paramters
        <br/>
        Example:
        <br/>
        http://localhost:3000/?merchantToken=1234567&flowId=1234567
      </p>
      <br/>
      <mati-button
        ref={button}
        clientid={query.get('merchantToken')}
        flowId={query.get('flowId')}
      />
    </div>
  );
}

export default App;
