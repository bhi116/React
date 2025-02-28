
export default function TodoTable({todos, removeTodo}) {
 
  return (
  <>
    <table>
          <thead>
            <tr>
                <th>Description</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {
            todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
              <td><button onClick={() => removeTodo(index)}>Poista</button></td>
            </tr>
            ))}
          </tbody>
         </table>
  </>
  );
}
