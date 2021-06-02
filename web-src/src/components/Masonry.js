/**
 * 3rd party lib example
 * */

import React from 'react';
import CSSMasonry from 'react-masonry-css';
import './Masonry.css';

export const Masonry = ({ breakpointCols, children, ...props }) => (
  <CSSMasonry {...props} breakpointCols={breakpointCols} className="masonry" columnClassName="masonry-column">
    {children.map((child, index) => (
      <div key={index} className="masonry-item">
        {child}
      </div>
    ))}
  </CSSMasonry>
);
