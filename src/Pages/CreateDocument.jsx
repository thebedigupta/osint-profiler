import { useState } from "react";
import { Client, Databases, ID } from "appwrite";
import { project_id, database_id, collection_id } from "../lib/appwrite";

const CreateDocument = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    country: "",
    religion: ""
  });
  const [error, setError] = useState("");

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
    .setProject(project_id); // Your Appwrite project ID

  const databases = new Databases(client);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const words = value.trim().split(/\s+/); // Split on spaces or multiple spaces
    if (words.length > 1) {
      console.log("Latest word:", words[words.length - 2]); // Log the previous word
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 4) {
      setError("Name must have more than 4 letters");
      console.error("Validation Error:", "Name must have more than 4 letters");
      return; // Stop submission if validation fails
    } else {
      setError(""); // Clear error if validation passes
    }

    try {
      console.log("Submitting form data:", formData); // Log before sending the request

      const response = await databases.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        {
          Name: formData.name,
          Gender: formData.gender,
          Age: formData.age,
          Country: formData.country,
          Religion: formData.religion
        }
      );

      console.log("Document created successfully:", response);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <h2>Create a Document</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Religion:</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Document</button>
      </form>
    </div>
  );
};

export default CreateDocument;
