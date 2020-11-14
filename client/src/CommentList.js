import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export default ({ comments }) => {
  // const [comments, setComments] = useState([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map(comment => {
    let content 

    if (comment.status === 'accepted'){
      content = comment.content
    }
    if (comment.status === 'rejected'){
      content = 'this content has beeen rejected '
    }
    if (comment.status === 'pending'){
      content = 'This content is waiting for the approval'
    }


    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
