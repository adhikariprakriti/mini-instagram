import React from 'react';
import "./AddComment.css";


const AddComment= (props)=>{
    return(
        <div className="comment">
            {props.children}

            <form className="comment__form">
                <input className="comment__input"
                placeholder="Add Comment...."
                type="text"
                value={props.comment}
                onChange={props.onChange}
                />
                <button 
                   className="comment__button"
                   type="submit"
                   onClick={props.postComment}>Post</button>
            </form>
        </div>
    );
}
export default AddComment;