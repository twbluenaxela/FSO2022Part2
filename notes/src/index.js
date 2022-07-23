import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";



// axios
// .get(gitpodBackendUrl + "/notes")
// .then((response) => {
//   const notes = response.data;
//   console.log(notes);
// });

// const promise2 = axios.get(gitpodBackendUrl + "/foobar");
// console.log(promise2);

ReactDOM.createRoot(document.getElementById('root')).render(<App />)


