const Hello = (props) => {
  console.log(props, "PROPS");
  return (
    <div>
      Hello {props.name}, you are {props.age} years old
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  );
};

function App() {
  const name = "Peter";
  const age = 10;

  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];

  const friends2 = ["Peter", "Maya"];

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />

      <p>
        {friends[0].name} {friends[0].age}
      </p>
      <p>
        {friends[1].name} {friends[1].age}
      </p>

      <p>{friends2}</p>
    </div>
  );
}

export default App;
