// import React, {useEffect, useState} from 'react';
// import {useNavigate} from 'react-router-dom'

// // import {Link} from 'react-router-dom';

// function Tweet() {
//     useEffect( () => {
//         fetchItems();
//     }, []);
//     const Navigate=useNavigate()

//     const [items, setItems] = useState([]);

//     const fetchItems = async () => {
//         const data = await fetch('http://localhost:4000/tweets');
//         const items = await data.json();
//         setItems(items);
//     };
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//       });
    
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//           ...formData,
//           [name]: value
//         });
//       };
    
//       // Event handler for form submission
     

//     const handleSubmit = async (data) => {
//         try {
//           const response = await fetch("http://localhost:4000/addTweet", {
            
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//           });
    
//           const responseData = await response.json();
//           if (response.ok){
//             console.log('f aahe ');
//           }

    
//           console.log(responseData);
//         } catch (err) {
//           console.log(err);
//         }
//       };
//     return(
//         <section>
            
//             <div class="container-fluid">
//                 <h1 class="mt-5">Tweets</h1>
//                 {/* <form  >                   
//                  <div class="input-group justify-content-center">
//                         <div class="input-group-prepend">
//                             <input type="text" name="tweetInput" class="form-control" />
//                             <input type="submit" value="Send" onSubmit={onSubmit}  class="btn btn-primary mb-2" />
//                         </div>
//                     </div>
//                 </form> */}
                
 
//     <form onSubmit={handleSubmit}>
      
      
//       <label>
//         Input:
//         <input
//           type="text"
//           name="tweetInput"
         
//           onChange={handleInputChange}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>


//                 {
//                 items.map(item => (
//                     <div class="row padding">
//                         <div class="alert alert-info rounded-pill" role="alert">
//                             <i class="fa fa-user mr-2"></i> <i>{item.user.fullname} ({item.user.username}): {item.tweet}</i>
//                         </div>
//                     </div>       
//                 ))
//                 }
//             </div>
//         </section>
//     );
// }

// export default Tweet;
import React, { useEffect, useState } from "react";

function Tweet() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const [tweetInput, setTweetInput] = useState("");

  const fetchItems = async () => {
    const data = await fetch("http://localhost:4000/tweets");
    const items = await data.json();
    setItems(items);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      tweetInput: tweetInput,
    };

    const response = await fetch("http://localhost:4000/addTweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response.json());

    if (response.ok) {
      setTweetInput("");
      console.log("submitted");
      window.location.reload()
      //   fetchItems();
    } else {
      console.error("Error submitting tweet");
      // Handle error as needed
    }
  };

  return (
    <section>
      <div className="container-fluid">
        <h1 className="mt-5">Tweets</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group justify-content-center">
            <div className="input-group-prepend">
              <input
                type="text"
                name="tweetInput"
                value={tweetInput}
                onChange={(e) => setTweetInput(e.target.value)}
                className="form-control"
              />
              <input
                type="submit"
                value="Send"
                className="btn btn-primary mb-2"
              />
            </div>
          </div>
        </form>

        {items.map((item) => (
          <div className="row padding" key={item.id}>
            <div className="alert alert-info rounded-pill" role="alert">
              <i className="fa fa-user mr-2"></i>{" "}
              <i>
                {item.user.fullname} ({item.user.username}): {item.tweet}
              </i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tweet;