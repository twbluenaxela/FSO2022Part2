import Part from "./Part";

const Content = ({ parts }) => {
    console.log("Loading content props...", parts);
    return (
      <div>
        {parts.map((part) => {
          return <Part key={part.id} content={part.name} amount={part.exercises}></Part>;
        })}
      </div>
    );
  };

  export default Content