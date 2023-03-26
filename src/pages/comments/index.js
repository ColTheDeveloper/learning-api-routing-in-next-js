import { useState } from "react"

const CommentsPage=()=>{
    const [comments,setComments]=useState([])
    const [comment,setComment]=useState([])

    const loadComments= async()=>{
        const response= await fetch("/api/comments")
        const data= await response.json()
        setComments(data)
    }
    const submitComment= async ()=>{
        const response= await fetch("/api/comments",{
            method: 'POST',
            body:JSON.stringify({comment}),
            headers:{
                'content-Type':'application/json'
            }
        })
        const data= await response.json()
        console.log(data)
    }
    const deleteComment= async(commentId)=>{
        const response=await fetch(`/api/comments/${commentId}`,{
            method: 'DELETE'
        })
        const data=await response.json()
        console.log(data)
        loadComments()
    }
    return(
        <div>
            <input
                type="text"
                value={comment}
                onChange={(e)=>setComment(e.target.value)} 
            />
            <button onClick={submitComment}>Submit Comment</button>
            <button onClick={loadComments}>Load Comments</button>
            {comments.map(comment=>{
                return(
                    <div key={comment.id}>
                        <h2>{comment.id} | {comment.text} </h2>
                        <button onClick={()=>deleteComment(comment.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}
export default CommentsPage