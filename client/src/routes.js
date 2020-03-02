import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleConstructPage from './pages/ArticleConstructPage';
import ArticlePage from './pages/ArticlePage';
import authStore from './stores/authStore';
import ArticleEditPage from './pages/ArticleEditPage';
import ArticleBlockEdit from './pages/ArticleBlockEdit';
import TestConstructorPage from './pages/TestConstructorPage';
import TestPage from './pages/TestPage';
import ProfilePage from './pages/ProfilePage';

export const useRoutes = () => {
   const { isAuth, isAdmin } = authStore;
   if (isAuth) {
      if (isAdmin) {
         return (
            <Switch>
               <Route path='/profile/:login' exact>
                  <ProfilePage />
               </Route>
               <Route path='/articles/:linkId/test' exact>
                  <TestPage />
               </Route>
               <Route path='/articles/:linkId/add_test' exact>
                  <TestConstructorPage />
               </Route>
               <Route path='/articles/:linkId/add_article' exact>
                  <ArticleConstructPage />
               </Route>
               <Route path='/articles/:linkId/:id/edit' exact>
                  <ArticleEditPage />
               </Route>
               <Route path='/articles/:linkId/edit_block'>
                  <ArticleBlockEdit />
               </Route>
               <Route path='/articles/:linkId/:id' exact>
                  <ArticlePage />
               </Route>
               <Route path='/articles/:linkId' exact>
                  <ArticlesPage />
               </Route>
               <Route path='/articles' exact>
                  <ArticlesPage />
               </Route>
               <Redirect to='/articles' />
            </Switch>
         );
      }
      return (
         <Switch>
            <Route path='/profile/:login' exact>
               <ProfilePage />
            </Route>
            <Route path='/articles/:linkId/test' exact>
               <TestPage />
            </Route>
            <Route path='/articles/:linkId/:id'>
               <ArticlePage />
            </Route>
            <Route path='/articles/:linkId'>
               <ArticlesPage />
            </Route>
            <Route path='/articles' exact>
               <ArticlesPage />
            </Route>
            <Redirect to='/articles' />
         </Switch>
      );
   }

   return (
      <Switch>
         <Route path='/auth/login' exact>
            <AuthPage />
         </Route>
         <Route path='/auth/register' exact>
            <RegisterPage />
         </Route>
         <Redirect to='/auth/login' />
      </Switch>
   );
};
