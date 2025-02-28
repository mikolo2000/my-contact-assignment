import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import ContactCard from "./components/contactCard";
import Header from "./components/header";
import ContactDetails from "./components/contactDetails";

function App() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    majorError: "",
    minorError: ""
  });
  const [activeUser, setActiveUser] = useState(null);
  const [activeId, setActiveId] = useState(null);

    useEffect(()=>{
      if (activeId){
        async function getUserdetails () {
          try {
            const response = await fetch(`http://localhost:4000/users/${activeId}`);
            const data = await response.json();
            setActiveUser(data);
          } catch (error) { 
            setErrors({...errors, minorError: "user not found"}); 
          }
        }
        getUserdetails();
      }
      

    },[activeId]);

  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getData() {
      try {
        const res = await fetch("http://localhost:4000/users", { signal });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrors({...errors, majorError: error.message});
        }
      }
    }
    getData();

    return ()=>{
      controller.abort();
    }
  }, []);

  return (
    <>
      <Header/>
      <section className="d-inline-flex p-5 container justify-content-start position-relative pt-5 mt-5">
        <div  className="pt-5 m-5 justify-content-start position-relative">
          {errors.majorError && <p>{errors.majorError}</p>}
          {errors.majorError ? "":<div>
            {users.map((user) => {
              return (
                <ContactCard
                  className={activeId === user.id ? 'active card': "card"}
                  key={user.id}
                  name={user.firstName + " " + user.lastName}
                  // number={user.phone}
                  email={user.email}
                  onClick={() => { 
                    setActiveId(user.id);               
                  }}
                />
              );
            })}
          </div>}
        </div>
        <div>
          {errors.minorError ? <div className=" position-relative container mt-5 pt-5"><h1 className="position-fixed bottom-5 start-40">{errors.minorError}</h1></div>: <div>
          {!activeUser  ?    <div className=" position-relative container mt-5 pt-5"><h1 className="position-fixed bottom-5 start-40">Select User</h1></div> : <ContactDetails
            firstName={activeUser.firstName}
            lastName={activeUser.lastName}
            email={activeUser.email}
            age={activeUser.age}
            gender={activeUser.gender}
            phone={activeUser.phone}
          />
        }
        </div> }
        </div>
        
      </section>
    </>
  );
}


export default App;
