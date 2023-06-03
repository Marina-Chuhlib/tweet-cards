import { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from 'shared/Loader/Loader';

import Layout from 'modules/Layout/Layout';
const HomePage = lazy(() => import('./pages/HomePage'));
const TweetsPage = lazy(() => import('./pages/TweetsPage'));

export const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/tweets" element={<TweetsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
