

const DeleteButton = ({ endpoint, id, onDelete }) => {

    const handleDelete = async () => {
      try {
        await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
        onDelete(id);
      } catch (error) {
        console.error("Error deleting item", error);
      }
    };
  
    return <button onClick={handleDelete}>Delete</button>;
  };
  
  export default DeleteButton;