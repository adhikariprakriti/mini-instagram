 import React ,{useState,useEffect}from 'react';
  import './Post.css';
 import {Avatar} from "@material-ui/core";
 import {db } from '../../Firebase';
 import firebase from "firebase";
 import AddComment from '../../AddComment/AddComment';


 function Post(props) {

const[comments,setComments]=useState([]);
const [comment,setComment]=useState('');

useEffect(()=>{
  let unsubscribe;
  if(props.postId){
        unsubscribe= db.collection('posts')
            .doc(props.postId)
            .collection('comments')
            .onSnapshot((snapshot)=>{
            
              setComments(snapshot.docs.map(doc => doc.data()))
              
            });
    }

    return ()=>{
      unsubscribe();
    };


},[props.postId]);


const postComment=(event)=>{
  event.preventDefault();
       db.collection("posts").doc(props.postId).collection('comments')
      .add({
           timestamp:firebase.firestore.FieldValue.serverTimestamp(),
           text:comment,
            username: props.user

});
setComment('');
}


const eachPostComment= comments.map((cmt) => (<h4  className="comment__text"> <strong>{cmt.username} </strong>    {cmt.text}</h4>))


   return (
     <div className="post">
         <div className="post__heading">
              <Avatar className="post__avatar">P</Avatar>
              <h3>{props.username}</h3>
         </div>
           {/* header -> avatar+username*/}
           <img className="post__image" src={props.image}
                 alt=""/>
       {/* image */}
       {/*username + caption */}
      
    <h4 className="post__text"> <strong>{props.username}</strong>    {props.caption}</h4>

     {
         props.user? ( 
        <AddComment 
        PostId={props.PostId}
        comment={comment}
        onChange={(e)=>setComment(e.target.value)} 
         postComment={postComment}>
         {/*  {
             comments.map((cmt) =>{
             (<h4 className="comment__text"> <strong>{cmt.username}</strong>  {cmt.text}</h4>)
             }) }*/}
             {
               eachPostComment
             }
       </AddComment>
      
       ):
            null
     }
           

     </div>
   ); 
 }
 
 export default Post;
 