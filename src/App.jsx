import { Routes, Route } from 'react-router-dom';

import Layout from 'components/modules/Layout/Layout';
import Tweets from 'components/modules/Tweets/Tweets';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="tweets" element={<Tweets />}></Route>
        </Route>
      </Routes>
    </>
  );
};
