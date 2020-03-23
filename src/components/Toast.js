import React from 'react';

import { useToastContext, REMOVE } from '../contexts/ToastContext';

export default function Toast({ toast }) {
  const { toastDispatch } = useToastContext();
  function renderItem(content) {
    if (typeof content === 'function') {
      return content();
    } else {
      return <pre>{JSON.stringify(content, null, 2)}</pre>;
    }
  }
  return (
    <div className="toast">
      <div className="toast-container">
        {toast.map(t => {
          return (
            <div
              className={`toast-container-item ${t.type ? t.type : ''}`}
              key={t.id}
            >
              <span
                role="img"
                aria-label="close toast"
                className="toast-close"
                onClick={() =>
                  toastDispatch({ type: REMOVE, payload: { id: t.id } })
                }
              >
                &times;
              </span>
              {renderItem(t.content)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
