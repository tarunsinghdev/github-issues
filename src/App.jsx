import React from 'react';

import IssueList from './components/IssueList/IssueList';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.App}>
      <IssueList />
    </div>
  );
};

export default App;
