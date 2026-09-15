export function Persons({ filtered }) {
  return (
    <div>
      {filtered.map((person) => (
        <p style={{ margin: 0 }} key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
}
