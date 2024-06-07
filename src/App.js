import React, { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [id , setId] = useState('')
  const [isUpdate,setIsUpdate] =useState(false)
  console.log("data",data)
  useEffect(() => {
    setData([])
    axios.get("http://localhost:8000/student/getStudent")
      .then(response => {
        console.log("response",response.data.EmployeeData)
        setData(response.data.EmployeeData);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  },[]);
  

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
        setIsUpdate(true)
        setId(id);
        setFirstName(dt[0].firstName);
        setLastName(dt[0].lastName);
        setAge(dt[0].age);
      }
  }
  const handleDelete = (id) => {
    if(id > 0)
      {
        if (window.confirm('Are you sure to delete this item?')){
          const dt = data.filter(item => item.id !== id);
          setData(dt);
        }
      }
  } 
  const handleSave = () => {
    let error = '';

    if(firstName === '')
      error += 'First Name is required';

    if(lastName === '')
      error += 'Last Name is required';

    if(age <= 0)
      error += 'Age is required';

    if(error === '') 
      {
        const dt = [...data];
        const newobject = {
          id: EmployeeData.length + 1,
          firstName: firstName,
          lastName: lastName,
          age: age
        }
        dt.push(newobject);
        setData(dt);
      }
      else{
        alert(error)
   }
  }
  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;

    setData(dt);
    handleClear();
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  }

  return (
    <div className="App">
    <div style={{display: 'flex', justifyContent:'center', marginTop:"10px",marginBottom:"10px"}}>
    <div>
      <label>FirstName:
      <input type='text' placeholder='Enter First name' onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
      </label>
    </div>
    <div>
      <label>LastName:
      <input type='text' placeholder='Enter Last name' onChange={(e) => setLastName(e.target.value)} value={lastName}/>
      </label>
    </div>
    <div>
      <label>Age:
      <input type='text' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age}/>
      </label>
    </div>
    <div>
    {
      !isUpdate ?
      <button className='btn btn-primary' onClick={() => handleSave()}>Save</button>
      :
      <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
    }
      <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
    </div>
    </div>
       <table className='table table-hover'>
        <thead>
          <tr>
          <td>Sr.No</td>
          <td>Id</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>age</td>
          <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.length>0?data.map((item,index) => {
              return(
                <tr key={index}>
                  <td>{index+ 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger'onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            }):null
          }
        </tbody>
       </table>
    </div>
  );
}

export default App;
