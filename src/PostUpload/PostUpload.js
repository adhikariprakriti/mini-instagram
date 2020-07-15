import React ,{useState}from 'react';
import {storage, db} from "../Firebase.js";
import {Button} from  '@material-ui/core';
import firebase from "firebase";









function PostUpload(props){
    
    const [image,setImage]=useState(null);
    const[caption,setCaption]=useState('');
    const[url,setUrl]=useState('');
    const[progress,setProgress]=useState(0);
   
    const handleChange= e=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            
        }
    };

    const handleUpload=()=>{
      const uploadTask =storage.ref(`images/${image.name}`).put(image);
       
      uploadTask.on("state_changed",
       (snapShot)=>{
          //progress function
          const progress=Math.round(
              (snapShot.bytesTransferred/snapShot.totalBytes)*100  
          );
          setProgress(progress); 
      },
      (error)=>{
          //this is where we show error occured during upload
          alert(error.message);
      },
      ()=>{
          //this is the section whis shows what is to be done when upload is complete
          storage.ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(
              url=>{
                  //post image inside db
                  db.collection("posts").add({
                      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                      caption:caption,
                      image:url,
                      username: props.username
                  });
                  setProgress(0);
                  setCaption("");
                  setImage(null);

              }
          );

          
      })
    }

    return(

        <div>
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption.." onChange={event=>setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button className="imageUpload__button" onClick={handleUpload}>Upload</Button>
        </div> 

    );
}

export default PostUpload;