

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      Total of &nbsp; {parts.reduce((sum, part) => sum + part.exercises, 0)}
      &nbsp; exercises
    </p>
  );
};


const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course