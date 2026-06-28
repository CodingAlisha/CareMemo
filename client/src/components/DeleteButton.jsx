
// DELETE REUSABLE BUTTON 

const DeleteButton = ({ endpoint, id, onDelete }) => {
  const apiUrl = process.env.VITE_API_URL;

    const handleDelete = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/${endpoint}/${id}`, { method: "DELETE" });

        if (!response.ok) {
          throw new Error(`Failed to delete: ${response.status}`);
        }

        onDelete(id);
      } catch (error) {
        console.error("Error deleting item", error);
      }
    };
  
    return <button onClick={handleDelete}>Delete</button>;
  };
  
  export default DeleteButton;




  // DELETE REUSABLE BUTTON 

// const DeleteButton = ({ endpoint, id, onDelete }) => {

//   const handleDelete = async () => {
//     try {
//       await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
//       onDelete(id);
//     } catch (error) {
//       console.error("Error deleting item", error);
//     }
//   };

//   return <button onClick={handleDelete}>Delete</button>;
// };

// export default DeleteButton;