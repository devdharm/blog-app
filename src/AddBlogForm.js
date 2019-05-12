import React from 'react';
import './AddBlog.css';

class AddBlog extends React.Component{
    constructor(props){
        super(props);
        this.addNewBlog = this.addNewBlog.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.state = {title:'',description:''}
    }
    
    handleTitleChange(e){
        this.setState({title:e.target.value})
    }

    handleDescriptionChange(e){
        this.setState({description:e.target.value})
    }
    
    addNewBlog(){
        let newBlog = {
            id:this.props.id,
            title: this.state.title,
            description: this.state.description
        }
        let addNewBlog = JSON.parse(localStorage.getItem("newBlog")) || [];
        addNewBlog.push(newBlog);
        localStorage.setItem("newBlog", JSON.stringify(addNewBlog));
    }

    render(){
        return (
        <div className = 'add-blog-form-container' style={{display:(this.props.addblog || this.props.editBlog) ? 'block' : 'none'}}>
            <span className="close" onClick={this.props.onHide}>&times;</span>
            <form className='jumbotron'>
                {this.props.addblog && <h3>Add a blog</h3>}
                {this.props.editBlog && <h3>Update a blog</h3>}
                <div class="form-group">
                    <label>Title:</label> 
                    <input type="text" 
                            class="form-control" 
                            id="title"  
                            value={this.props.addblog ? this.state.title : this.props.title}
                            placeholder="Enter title"
                            name="title"
                            onChange={this.handleTitleChange}/>
                </div>
                <div class="form-group">
                <label>Description:</label>
                <textarea class="form-control" 
                    rows="5" 
                    id="description"
                    value={this.props.addblog ?this.state.description : this.props.description}
                    placeholder="Enter description"
                    onChange={this.handleDescriptionChange}>
                </textarea>
                </div>
                <button type="submit" class="btn btn-primary" onClick={this.addNewBlog}>
                {this.props.addblog ? "Add Blog" : "Update Blog"}
                </button>
            </form>     
        </div>
    )
  }
}

export default AddBlog;