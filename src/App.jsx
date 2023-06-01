import { Routes, Route } from 'react-router-dom';

import Layout from 'components/modules/Layout/Layout';
import Tweets from 'components/modules/Tweets/Tweets';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path='/tweets' element={<Tweets/>}></Route>
      </Routes>
    </>
  );
};
