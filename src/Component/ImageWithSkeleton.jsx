import React, { useState } from 'react';

const ImageWithSkeleton = ({ src, alt, className = '', style = {} }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-wrapper ${className}`} style={{ position: 'relative', ...style }}>
      <div className={`image-skeleton ${loaded ? 'fade-out' : ''}`} />
      <img
        src={src}
        alt={alt}
        className={`real-image ${loaded ? 'loaded' : ''}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
