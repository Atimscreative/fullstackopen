export function PersonForm({
  handleSubmit,
  newName,
  handleOnChange,
  newNumber,
  handleOnChangeNumber,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleOnChange} />
        <div>
          number: <input value={newNumber} onChange={handleOnChangeNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
