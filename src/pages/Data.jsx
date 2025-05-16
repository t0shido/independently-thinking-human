import React from 'react';
import './Data.css';

const Data = () => {
  return (
    <div className="data-page">
      <div className="data-content">
        <div className="overview-grid">
          <div className="featured-section">
            <div className="data-card large">
              <div className="data-visual"></div>
              <div className="card-content">
                <h2>Featured Analysis</h2>
                <h3>Global Economic Trends</h3>
                <p className="description">
                  An in-depth analysis of global economic patterns, examining key indicators 
                  and their implications for future market developments.
                </p>
                <p className="category">Economics</p>
              </div>
            </div>
          </div>
          <div className="secondary-section">
            <div className="data-card horizontal">
              <div className="data-visual"></div>
              <div className="card-content">
                <h3>Technology Adoption Rates</h3>
                <p className="description">Tracking the speed and patterns of technology adoption across different demographics and regions.</p>
                <p className="category">Technology</p>
              </div>
            </div>
            <div className="data-card horizontal">
              <div className="data-visual"></div>
              <div className="card-content">
                <h3>Health Metrics Analysis</h3>
                <p className="description">Comprehensive analysis of global health trends and their correlation with lifestyle factors.</p>
                <p className="category">Health</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
