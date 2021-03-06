import React, { useEffect, useRef, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { GITHUB_ISSUE_URL, TOTAL_PAGE_LIMIT } from '../../utils/constant';
import Issue from '../Issue/Issue';

import styles from './IssueList.module.css';

const IssueList = () => {
  const [page, setPage] = useState(1);
  const { loading, data, error } = useFetch(GITHUB_ISSUE_URL + `&page=${page}`);
  const [issues, setIssues] = useState(data);
  const [openPullRequest, setOpenPullRequest] = useState(null);
  const [closedPullRequestCount, setClosedPullRequestCount] = useState(null);

  const [lastElement, setLastElement] = useState(null);

  useEffect(() => {
    setIssues((issues) => [...issues, ...data]);
  }, [data]);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    if (page >= TOTAL_PAGE_LIMIT) return;

    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastElement]);

  useEffect(() => {
    const calculateOpenClosePullRequest = () => {
      let open = 0,
        close = 0;
      issues.forEach((item) => {
        if (item.state === 'open') open++;
        else if (item.state === 'close') close++;
      });
      setOpenPullRequest(open);
      setClosedPullRequestCount(close);
    };
    calculateOpenClosePullRequest();
  }, [issues]);

  return (
    <>
      {error && <strong>{error}</strong>}
      <div className={styles.IssueList}>
        <div className={styles.IssueHeader}>
          <span>{openPullRequest ?? 0} Open</span>
          <span> {closedPullRequestCount ?? 0} Closed</span>
        </div>
        {issues.map((item, index) => (
          <Issue
            key={item.id}
            isLast={issues.length === index + 1}
            setLastElement={setLastElement}
            item={item}
          />
        ))}
        {loading && <strong>Loading...</strong>}
      </div>
    </>
  );
};

export default IssueList;
/* (
        <Issue
          closedPullRequestCount={closedPullRequestCount}
          openPullRequestCount={openPullRequest}
          issues={data}
        />
      )} */
