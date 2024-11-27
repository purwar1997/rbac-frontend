import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Protected from './components/Protected';

import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

const UserListPage = lazy(() => import('./pages/UserListPage'));
const AddUserPage = lazy(() => import('./pages/AddUserPage'));
const EditUserPage = lazy(() => import('./pages/EditUserPage'));
const RoleListPage = lazy(() => import('./pages/RoleListPage'));
const AddRolePage = lazy(() => import('./pages/AddRolePage'));
const EditRolePage = lazy(() => import('./pages/EditRolePage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/logout' element={<LogoutPage />} />

      <Route path='/' element={<AppLayout />} errorElement={<ErrorPage />}>
        <Route
          index
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <UserListPage />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='users/add'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <AddUserPage />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='users/:id/edit'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <EditUserPage />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='roles'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <RoleListPage />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='roles/add'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <AddRolePage />
              </Suspense>
            </Protected>
          }
        />

        <Route
          path='roles/:id/edit'
          element={
            <Protected>
              <Suspense fallback={<LoadingSpinner />}>
                <EditRolePage />
              </Suspense>
            </Protected>
          }
        />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
