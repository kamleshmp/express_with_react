import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';


const PageIndex = ({
  page,
}) => (
  <div className="container">
     <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Page Title</th>
              <th>Page Link Text</th>
              <th>Page Slug</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
           <tr>
            <td>{page.title}</td>
            <td>{page.linkText}</td>
            <td>{page.slug}</td>
            <td><Link to="">Edit</Link></td>
            <td><Link to="">Delete</Link></td>
           </tr>
          </tbody>
        </table>
  </div>
);

PageIndex.propTypes = {
  page: PropTypes.object.isRequired
};

export default PageIndex;