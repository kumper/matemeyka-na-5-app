import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./containers/welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: 'question',
    loadComponent: () =>
      import('./containers/question-page/question-page.component').then(
        (m) => m.QuestionPageComponent
      ),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./containers/result-page/result-page.component').then(
        (m) => m.ResultPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
