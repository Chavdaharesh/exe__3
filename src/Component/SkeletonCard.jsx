import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="col-md-4">
      <div className="card h-100 skeleton-card">
        <div className="skeleton-img" />
        <div className="card-body">
          <div className="skeleton-line skeleton-short" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
