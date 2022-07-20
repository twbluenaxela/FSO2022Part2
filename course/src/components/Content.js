import Part from "./Part";

const Content = ({ parts }) => {
    console.log("Loading content props...", parts);
    return (
      <div>
        {parts.map((part) => {
          return <Part key={part.id} content={part.name} amount={part.exercises}></Part>;
        })}
        {/**
         * <Part content={props.parts[0].name} amount={props.parts[0].exercises} />
        <Part content={props.parts[1].name} amount={props.parts[1].exercises} />
        <Part content={props.parts[2].name} amount={props.parts[2].exercises} />
         * 
         */}
      </div>
    );
  };

  export default Content