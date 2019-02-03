import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    this.state = {
      imgs: [],
      text: '',
      selectedImg: null
    }
  }
  
  // https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
  //collection ids: https://unsplash.com/collections
  loadImages = () => {
    // axios.get('https://source.unsplash.com/collection/1163637/480x480')
    let imgs = Array(15).fill(0).map(el => {
      el = {id: Math.random().toFixed(3), url: 'https://source.unsplash.com/collection/1163637/200x200', selected: false};
      return el;
    });
    this.setState({imgs});

    // axios.get('https://picsum.photos/list')
    //   .then(res => {
    //     let imgs = res.data.slice(0,15).map(img => {
    //       return {
    //         id: img.id,
    //         url: img.post_url
    //       }
    //     })
    //     this.setState({
    //       imgs
    //     });
    //   });
  }

  componentDidMount() {
    //make API call, load images
    this.loadImages();
  }

  setSelectedImg = (img) => {
    // img.url = img.url.slice(0,-7) + '480x480';
    this.setState({selectedImg: img});
  }

  toggleSelected = (image) => {
    console.log('image clicked: ', image);
    const {imgs} = this.state;
    //locate this img in the array
    let selected = imgs.find(img => img.id === image.id);
    console.log('selected: ', selected);
    //toggle its selected prop, then replace it
    selected.selected = !selected.selected;
    let replaceIdx = imgs.indexOf(selected);
    let newImgs = [...imgs.slice(0,replaceIdx), selected, ...imgs.slice(replaceIdx+1)];
    this.setState({
      imgs: newImgs,
    });
    this.setSelectedImg(selected);
  }

  displayLargeImg = (img) => {
    console.log('hit display img', img);
    //toggle selected property to true
    this.toggleSelected(img);
    //this should then setState of selectedImg to be whichever img has selected = true
    //we then display that
  }

  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onDragOver(e) {
    console.log('dragging evt: ', e);
  }

  onDrop(e) {
    console.log('drop evt: ', e);
  }

  moveText = () => {
    console.log('moveText');
    //get text div by className, apply CSS positioning styles (e.g., increment absolute top position by x pixels for each btn click)
    
  }

  handleUpload = (e) => {
    console.log(e.target.files[0]);
  }

  onUpload = () => {
    console.log('hit upload');
  }

  render() {

    const {imgs, selectedImg} = this.state;
    console.log('imgs: ', this.state.imgs);


    const singleUrl = (selectedImg) ? selectedImg.url : 'nothing';

    const display = imgs ? (
      imgs.map(img => (
        <img 
          className="flex-item" 
          key={img.id} 
          src={`${img.url}`} 
          alt={img.id}
          onClick={()=> this.displayLargeImg(img)}
        />
      ))
    ) : (
      <h4>Loading...</h4>
    );
    

    // const display = <img src={`${imgs[0]}`}/>

    // const display = <h3>Hi</h3>;

    return (
      <div className="container">

        <nav>
          <ul>
            <li>Flyer Creator</li>
            <li>Dbat</li>
            <li>Hello Matt</li>
          </ul>
        </nav>
        <div className="flex-img-container">
          {display}
        </div>

        <hr />

        <div className="large-img-container">
          
          <div className="img-text-container">
            <img src={singleUrl} alt="text"/>
            <div draggable className="overlay-text">{this.state.text}</div>
            
            <div 
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=> this.onDrop(e)}
            >
              Drop here
            </div>
            <button onClick={this.moveText}>Move text up</button>
          </div>

          {/* wrap in form */}

          <label>Type your text</label><br/>
          <input 
            name="text"
            onChange={this.onInputChange}
            value={this.state.text}
          />
          <button>Done</button>
          <h3>You are typing: {this.state.text}</h3>

          <label>Upload images</label><br/>
          <input type="file" onChange={this.handleUpload}/>
          <button onClick={this.onUpload}>Upload</button>

          <div className="footer-btn-container">
            <button>Cancel</button>
            <button>Print</button>
            <button>Save</button>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
