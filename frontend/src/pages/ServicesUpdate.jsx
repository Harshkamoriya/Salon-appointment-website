import React, { useState } from "react";
import styled from "styled-components";
import ServiceMenu from "../components/ServiceMenu";
import { useGlobalContext } from "../Context";
import { Button } from "../styles/button";
import axios from "axios";

function ServicesUpdate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false); // Track if modal is for adding a service
  const [selectedService, setSelectedService] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const { services, dispatch } = useGlobalContext();
  console.log(dispatch);

  const handleModal = (service = null, addMode = false) => {
    setSelectedService(
      service || { name: "", description: "", price: "", imageUrl: "" }
    );
    setIsAddMode(addMode);
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const API = isAddMode
      ? "https://salonease-oy0f.onrender.com/services"
      : `https://salonease-oy0f.onrender.com/services/${selectedService._id}`;
    const method = isAddMode ? "post" : "put";

    try {
      const response = await axios[method](API, selectedService);
      if (response.status === 200 || response.status === 201) {
        alert(`Service ${isAddMode ? "added" : "updated"} successfully!`);
        setIsOpen(false);

        // Fetch updated services list
        const updatedServices = await axios.get(
          "https://salonease-oy0f.onrender.com/services"
        );
        dispatch({ type: "GET_SERVICES", payload: updatedServices.data });
      }
    } catch (error) {
      console.error(
        `Error ${isAddMode ? "adding" : "updating"} service`,
        error.message
      );
      alert(`Service not ${isAddMode ? "added" : "updated"}. Please try again.`);
    }
  };

  const handleDelete = async (id) => {
    console.log("id passed ", id);
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        console.log("i the try")
        const response = await axios.delete(`https://salonease-oy0f.onrender.com/services/${id}`);
        if (response.status === 200) {
          console.log("service deleted")
          alert("Service deleted successfully!");

          // Fetch updated services list
          const updatedServices = await axios.get(
            "https://salonease-oy0f.onrender.com/services"
          );
          dispatch({ type: "GET_SERVICES", payload: updatedServices.data });
        }
      } catch (error) {
        console.error("Error deleting service", error.message);
        alert("Service not deleted. Please try again.");
      }
    }
  };

  return (
    <Wrapper>
      <div className="main">
        <div className="left">
          <ServiceMenu />
        </div>
        <div className="right container grid grid-three-column">
          {/* Button for adding a new service */}
          <Button className="add-btn" onClick={() => handleModal({}, true)}>
            Add New Service
          </Button>
          {services.map((curElem) => {
            const { _id,id, name, description, price, imageUrl } = curElem;
            return (
              <div className="card" key={_id}>
                <figure>
                  <img src={imageUrl} alt={name} />
                </figure>
                <div className="card-data">
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <p>{price}</p>
                  <Button
                    className="btn"
                    onClick={() => handleModal(curElem, false)}
                  >
                    Update
                  </Button>
                  <Button
                    className="btn delete-btn"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isAddMode ? "Add New Service" : "Update Service"}</h2>
            <label>
              <p>Service Name</p>
              <input
                type="text"
                name="name"
                value={selectedService?.name || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p>Price</p>
              <input
                type="text"
                name="price"
                value={selectedService?.price || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p>Image URL</p>
              <input
                type="text"
                name="imageUrl"
                value={selectedService?.imageUrl || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p>Description</p>
              <textarea
                name="description"
                value={selectedService?.description || ""}
                onChange={handleInputChange}
              />
            </label>
            <div className="btn_box">
              <Button onClick={handleSubmit}>
                {isAddMode ? "Add Service" : "Update Service"}
              </Button>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  /* Your existing styles */
  width: 100%;


  .main {
  display: flex;
  padding: 20px;
  width: 100%;
  max-height: min-content;

  /* .left {
    background: linear-gradient(135deg, #ff7eb3, #ff758c);
    color: white;
    padding: 20px;
    padding-bottom: 40px;
    border-radius: 10px;
    width: 25%;
    margin-right: 20px;
  } */
  .right {
    max-width: 100%;
    max-height: 750px;
    overflow: auto;
    padding: 20px;
    border-radius: 10px;
    flex-grow: 1;
    scrollbar-width: none;
  }
}

.btn_box {
  display: flex;
  gap: 1rem;
}

.add-btn {
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #cb9c11, #fc25a2);
  color: white;
  border-radius: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  Button {
    background: linear-gradient(135deg, #cb9c11, #fc25a2);
    color: white;
    width: 50%;
    border-radius: 10px;
  }
  p {
    color: black;
  }
  input {
    width: 100%;
    margin-top: 1.5rem;
    border-radius: 10px;
  }
  textarea {
    width: 100%;
    scrollbar-width: none;
    border-radius: 10px;
    margin-top: 1.5rem;
  }
}



.card {
  border: 0.1rem solid rgb(170 170 170 / 40%);
  max-width: 100%;
}
.card-data {
  padding: 0 2rem;
}

h3 {
  margin: 2rem 0;
  font-weight: 300;
  font-size: 2.4rem;
}
.btn {
  margin: 2rem auto;
  background-color: rgb(0 0 0 / 0%);
  border: 0.1rem solid rgb(98 84 243);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(98 84 243);
  font-size: 1.4rem;

  &:hover {
    background-color: rgb(98 84 243);
    color: #fff;
  }
}
figure {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s linear;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.2s linear;
    cursor: pointer;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover img {
    transform: scale(1.2);
  }
  img {
    max-width: 90%;
    margin-top: 1.5rem;
    height: 20rem;
    transition: all 0.2s linear;
  }
}

@media (max-width: 740px)
     {
       
        .main{
       display: flex;
       flex-direction: column;
        }
        
    
  }


`;

export default ServicesUpdate;
