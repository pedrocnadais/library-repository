// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Sidebar() {
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:4000/')
//       .then(response => {
//         setSuggestions(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching suggestions:', error);
//       });
//   }, []);

//   return (
//     <aside className="sidebar">
//       {suggestions.map((suggestions, index) =>{
//           return (
//             <div className="sidebar-suggestion" key={`${suggestions.title}-${index}`}>
//               <h4>Title: {suggestions.title}</h4>
//               <h4>Author: {suggestions.author}</h4>
//             </div>
//           )
//         })}
//     </aside>
//   );
// }

// export default Sidebar;
