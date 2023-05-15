import React, { useState, useEffect } from "react";
import Input from "../Input/Input";
import FormButton from "../FormButton/FormButton";

const Form = () => {
  const new_date = (n = 0) => {
    const date = new Date();
    return new Date(date.setMonth(date.getMonth() + n))
      .toISOString()
      .split("T")[0];
  };

  const [submittedData, setSubmittedData] = useState([]);
  const [visibleBtn, setVisibleBtn] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    membershipstarts: new_date(),
    membershipends: new_date(1),
  });
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [bgForm, setBgForm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // LOGIC FOR FETCHING

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/clients`)
      .then((response) => response.json())
      .then((data) => {
        setSubmittedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //   LOGIC FOR EDIT

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      email: item.email || "",
      membershipstarts: formatDateString(item.membershipstarts),
      membershipends: formatDateString(item.membershipends),
    });
    setBgForm("bg-light");
    setIdToUpdate(item._id);
    setVisibleBtn(false);
  };

  //LOGIC FOR DELETEING

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this client?"
    );
    if (confirmDelete) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/clients/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setSubmittedData((prevData) =>
              prevData.filter((client) => client._id !== id)
            );
          } else {
            throw new Error("Failed to delete client");
          }
        })
        .catch((error) => {
          console.error("Error deleting client:", error);
        });
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted!", data);

        // Reset the form
        setSubmittedData((prevData) => [...prevData, data]);
        setFormData({
          name: "",
          email: "",
          membershipstarts: new_date(),
          membershipends: new_date(1),
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleUpdate = (e) => {
    setVisibleBtn(true);
    setBgForm("");
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/clients/${idToUpdate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmittedData((prevData) => {
          // Find the index of the element with the matching ID
          const index = prevData.findIndex((item) => item._id === data._id);
          console.log(index);
          if (index !== -1) {
            // Create a new array by mapping over the previous data
            // If the current item's ID matches the target ID, replace it with the new data
            return prevData.map((item, idx) => (idx === index ? data : item));
          }
        });

        // Reset the form

        setFormData({
          name: "",
          email: "",
          membershipstarts: new_date(),
          membershipends: new_date(1),
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <>
      <form className={`mb-5 p-5 rounded border ${bgForm}`}>
        <Input
          text="Name and Surname"
          name="name"
          type="text"
          placeholder="Enter name and surname"
          onChange={handleChange}
          value={formData.name}
        />
        <Input
          text="Email"
          name="email"
          type="email"
          placeholder="Email@email.com"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          text="Membership Starts"
          name="membershipstarts"
          type="date"
          placeholder="2023-03-23"
          onChange={handleChange}
          value={formData.membershipstarts}
        />
        <Input
          text="Membership Ends"
          name="membershipends"
          type="date"
          placeholder="2023-03-23"
          onChange={handleChange}
          value={formData.membershipends}
        />
        {visibleBtn && (
          <FormButton name="ADD" action={handleSubmit} klass={"tex"} />
        )}
        {!visibleBtn && <FormButton name="UPDATE" action={handleUpdate} />}
      </form>
      <div className="">
        <table className=" table">
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
                <td className="text-end">
                  <span className="btn-group">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Del
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Form;
