export function Persons({ filtered, handleDelete }) {
  return (
    <div>
      {filtered.map((person) => (
        <p style={{ margin: 0 }} key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
}
