import React,{useState,useEffect } from 'react';
import './App.css';
import image from './Assets/Images/instagram.png';
//import images from './Assets/Images/myimage.jpg';
//import img from '. /Assets/Images/image2.JPG';
import {db,auth } from './Firebase';
import Modal from './Modal/Modal';
import Aux from './hoc/Auxilliary';
import Post from './Posts/Post/Post';
import {Button,Input} from  '@material-ui/core';
import PostUpload from './PostUpload/PostUpload';



function App() {
    
    const[posts,setPosts]=useState([]);
    const[show,setShow]=useState(null);
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
     const[user,setUser]=useState(null);
     const[openSignIn,setOpenSignIn]= useState(null); 

useEffect(()=>{
   const unsuscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user is logged in
        console.log(authUser);
        setUser(authUser);

             }else{
        //user has logged out
        setUser(null);
      }
   })

   return ()=>{
     //perform some cleanup actions
     unsuscribe();
   }
},[user,username]);
  

useEffect(()=>{

  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{

    console.log(snapshot.docs);
    setPosts(snapshot.docs.map(doc =>(
      {
        id: doc.id,
       post: doc.data()
      }
    ) ));
  
})

},[]);

 

const signUp=(event)=>{
  event.preventDefault();
 
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    authUser.user.updateProfile({
      displayName: username,
    })
    setShow(!show);
  })
  .catch((error)=>alert(error.message))

}



const signIn=(event)=>{
   event.preventDefault();

   auth.signInWithEmailAndPassword(email,password)
   .catch((error)=> alert(error.message));
    setOpenSignIn(!openSignIn);
}

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
                       value={username}
                       onChange={(e)=>setUsername(e.target.value)}
                    />

                    <Input 
                       type="text"
                       placeholder="email"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}

                    />
                     
                     <Input 
                       type="password"
                       placeholder="password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}

                    />
               <Button type="submit" onClick={signUp}>Sign UP</Button>
                </form> 
            </div>
    </Modal>






    <Modal show={openSignIn} clicked={()=>setOpenSignIn(!openSignIn)}>
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
                       placeholder="email"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}

                    />
                     
                     <Input 
                       type="password"
                       placeholder="password"
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}

                    />
               <Button type="submit" onClick={signIn}>Sign In</Button>
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

       { (user?.displayName)?
       <PostUpload username={user.displayName}/>:
       <h3>Sorry you need to login to Upload</h3>
       }


       <h3>Hello let's build an instagram clone app with great enthusiasm.</h3>
     
     {user?<Button onClick={()=> auth.signOut()}>Log Out</Button> 
         : (
           <div className="app__loginContainer">
         <Button onClick={()=>setShow(true)}>Sign Up</Button>
         <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
         </div>
         ) }
     
      
      
      
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
