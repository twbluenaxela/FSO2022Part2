const Total = ({ parts }) => {
    console.log("Total props: ", parts);
    const total = parts.reduce((sum, currentVal) => {
      console.log("Current sum: ", sum);
      console.log("Current value: ", currentVal.exercises);
      return (sum += currentVal.exercises);
    }, 0);
    return (
      <div>
        <p>Number of exercises {total}</p>
      </div>
    );
  };

  export default Total