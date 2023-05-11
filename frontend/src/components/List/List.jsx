import React from "react";

const List = ({
  submittedData,
  formatDateString,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div>
      <h2>Clients List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Membership Starts</th>
            <th>Membership Ends</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{formatDateString(item.membershipstarts)}</td>
              <td>{formatDateString(item.membershipends)}</td>
              <td>
                <div className="btn-group">
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Del
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
