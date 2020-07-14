import React,{useState,useEffect } from 'react';
import './App.css';
import image from './Assets/Images/instagram.png';
//import images from './Assets/Images/myimage.jpg';
//import img from '. /Assets/Images/image2.JPG';
import {db} from './Firebase';
import Modal from './Modal/Modal';
import Aux from './hoc/Auxilliary';
import Post from './Posts/Post/Post';
import {Button,Input} from  '@material-ui/core';
function App() {
    
    const[posts,setPosts]=useState([]);
    const[show,setShow]=useState(null);
  

useEffect(()=>{

  db.collection('posts').onSnapshot(snapshot=>{

    console.log(snapshot.docs);
    setPosts(snapshot.docs.map(doc =>(
      {
        id: doc.id,
       post: doc.data()
      }
    ) ));

})

},[]);


  return (

    <Aux>

       <Modal show={show} clicked={()=>setShow(!show)}>
            <div>
                <form  className="app__signup">
                   <center>
                   <img 
                        className="app__headerImage"
                        src={image}
                       alt=""
                    />
   
                   </center>
                   <Input 
                       type="text"
                       placeholder="username"
                    />

                    <Input 
                       type="text"
                       placeholder="email"
                    />
                     
                     <Input 
                       type="password"
                       placeholder="password"
                    />
               <Button type="submit" >Sign UP</Button>
                </form> 
            </div>
    </Modal>
    <div className="app">
       <div  className="app__header">
           <img 
              className="app__headerImage"
              src={image}
               alt=""/>
       </div>
       <h3>Hello let's build an instagram clone app with great enthusiasm.</h3>
       <Button onClick={()=>setShow(true)}>SignUp</Button> 
        {
         posts.map(({id,post})=>(
           <Post key={id} username={post.username } image={post.image} caption={post.caption}/>
         )) 
       }


         {/* Header */}

         {/*Posts*/}
         {/*Posts*/}




    </div>
    </Aux>
  );
}

export default App;
