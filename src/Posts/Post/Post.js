 import React from 'react';
  import './Post.css';
 import {Avatar} from "@material-ui/core";
 function Post(props) {
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
          <h4 className="post__text"> <strong>{props.username}</strong>{props.caption}</h4>
     </div>
   );
 }
 
 export default Post;
 