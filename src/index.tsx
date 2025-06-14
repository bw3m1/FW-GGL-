import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchResults from '../components/widgets/SearchResults';
import '../components/widgets/Widgets.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SearchResults />
  </React.StrictMode>
);
