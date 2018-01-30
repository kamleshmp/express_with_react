import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';


const PageIndex = ({
  pages,
}) => (
  <div className="container">
     <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Page Title</th>
              <th>Page Link Text</th>
              <th>Page Slug</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           {pages}
          </tbody>
        </table>
  </div>
);

PageIndex.propTypes = {
  pages: PropTypes.array.isRequired
};

export default PageIndex;