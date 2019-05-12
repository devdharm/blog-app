import React from 'react';
import './Blog.css';
import  AddBlog from './AddBlogForm.js'

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
                  index:null,   
                  addblog:false,
                  blogs:JSON.parse(localStorage.getItem('newBlog')),
                  showAllBlogs:false,
                  editBlog:false,
                  title:'',
                  description:'',
                  id:(JSON.parse(localStorage.getItem('newBlog')).length)
                }
    this.handleAddBlog = this.handleAddBlog.bind(this);
    this.handleShowBlog = this.handleShowBlog.bind(this);
    this.close =this.close.bind(this)
  }

  handleAddBlog(){
   this.setState({addblog:true,id:this.state.id})
  }

  handleShowBlog(){
    if(this.state.blogs.length==0){
      alert("Please add Blog first....")
  }

    let blogs = JSON.parse(localStorage.getItem('newBlog'));
    this.setState({blogs:blogs,showAllBlogs:true});
  }

  deleteBlog(index){
    let totalBlogs=[...this.state.blogs]
    totalBlogs.splice(index,1)
    this.setState({blogs:totalBlogs})
    localStorage.setItem("newBlog", JSON.stringify(totalBlogs));
  }

  updateBlog(index){
   this.setState({editBlog:true,index:index})
   let totalBlogs = [...this.state.blogs]
   let blog=totalBlogs.filter(function(blog){
    return blog.id==index
  })
  this.setState({title:blog.title,description:blog.description})
  }

  close(){
    this.setState({addblog:false,editBlog:false})
  }

 render(){
   return(
     <div class="container">
       <h1>Welcome to developer's blog</h1>
       <button type="button" className="btn btn-primary" onClick={this.handleAddBlog}>Add Blog</button>   
       <button type="button" className="btn btn-primary blog-btn" onClick={this.handleShowBlog}>Get All Posts</button>  
        {this.state.blogs.length ==0 && <h3 className="blog-text">Seems like you didn't add any blog yet...</h3>}
        {this.state.showAllBlogs && this.state.blogs.length>0 ? <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {this.state.blogs.map((blog, i) => {
        return [
            <tr key={i}>
              <td>{i+1}</td>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td><button className="btn btn-primary" onClick={this.deleteBlog.bind(this,i)}>Delete</button></td>
              <td><button className="btn btn-primary" onClick={this.updateBlog.bind(this,i)}>Edit</button></td>
            </tr>
        ];
      })}
        </tbody>
      </table> : null}
       {(this.state.addblog || this.state.editBlog)? <AddBlog index={this.state.index} 
                                                              addblog={this.state.addblog} 
                                                              editBlog={this.state.editBlog}
                                                              id={this.state.id}
                                                              onHide={this.close}
                                                              title={this.state.title}
                                                              description={this.state.description}
                                                              />
                                                              : null}
     </div>
   )
 }
}

export default Blog;
