import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './Issue.module.css';
import gitPullRequestIcon from '../../assets/pull_request_icon.png';
import commentIcon from '../../assets/comment.png';

const Issue = ({ isLast, item, setLastElement }) => {
  return (
    <div>
      {isLast ? (
        <div ref={setLastElement} className={styles.Issue}>
          <div className={styles.IssueContainer}>
            {'pull_request' in item ? (
              <img src={gitPullRequestIcon} alt="icon" />
            ) : (
              <div className={styles.OpenBug}></div>
            )}
            <div style={{ width: '100%' }}>
              <div className={styles.IssueMainHeading}>
                <div>
                  <a href={item.html_url}>{item.title}</a>
                  <span>
                    {item.labels.map((label) => (
                      <span
                        data-tip={label.description}
                        key={label.id}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: `#${label.color}`,
                        }}
                        className={styles.Label}
                      >
                        {label.name}
                        <ReactTooltip
                          place="bottom"
                          className={styles.ToolTip}
                          effect="solid"
                        />
                      </span>
                    ))}
                  </span>
                </div>
                <div className={styles.CommentContainer}>
                  <img
                    style={{ marginRight: 0 }}
                    src={commentIcon}
                    alt="icon-comment"
                  />
                  <span>{item.comments}</span>
                </div>
              </div>
              <div className={styles.IssueContent}>
                <span>#{item.number}</span>
                <span>
                  {item.state}
                  {'ed'}
                </span>
                <span>
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                  })}
                </span>
                {'by'}
                <span>{item.user.login}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div key={item.id} className={styles.Issue}>
            <div className={styles.IssueContainer}>
              {'pull_request' in item ? (
                <img src={gitPullRequestIcon} alt="icon" />
              ) : (
                <div className={styles.OpenBug}></div>
              )}
              <div style={{ width: '100%' }}>
                <div className={styles.IssueMainHeading}>
                  <div>
                    <a href={item.html_url}>{item.title}</a>
                    <span>
                      {item.labels.map((label) => (
                        <span
                          data-tip={label.description}
                          key={label.id}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: `#${label.color}`,
                          }}
                          className={styles.Label}
                        >
                          {label.name}
                          <ReactTooltip
                            place="bottom"
                            className={styles.ToolTip}
                            effect="solid"
                          />
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className={styles.CommentContainer}>
                    <img
                      style={{ marginRight: 0 }}
                      src={commentIcon}
                      alt="icon-comment"
                    />
                    <span>{item.comments}</span>
                  </div>
                </div>
                <div className={styles.IssueContent}>
                  <span>#{item.number}</span>
                  <span>
                    {item.state}
                    {'ed'}
                  </span>
                  <span>
                    {formatDistanceToNow(new Date(item.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                  {'by'}
                  <span>{item.user.login}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Issue;
