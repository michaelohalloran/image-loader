import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    this.state = {
      imgs: [],
      text: '',
      selectedImg: null,
      draggedText: ''
    }
  }
  
  // https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
  //collection ids: https://unsplash.com/collections
  loadImages = () => {
    // axios.get('https://source.unsplash.com/collection/1163637/480x480')
    let imgs = Array(9).fill(0).map(el => {
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

  // https://medium.com/the-andela-way/react-drag-and-drop-7411d14894b9

  onDrag = (e, text) => {
    e.preventDefault();
    this.setState({draggedText: text});
  }

  onDragStart = (e)=> {
    console.log('dragSTart evt: ', e);
  }

  onDragOver = (e)=> {
    console.log('dragging evt: ', e);
    e.dataTransfer.setData('data', this.state.text);
  }

  onDrop = (e) => {
    e.preventDefault();
    console.log('drop evt: ', e);
    let text = e.dataTransfer.getData('data');
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


    const largeImg = (selectedImg) ? 
      <img 
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=> this.onDrop(e)} 
        src={selectedImg.url} 
        alt="text"
      /> : 
      null;

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

        <ul className="links">
          <li>Flyer Creator</li>
          <li className="link2">Dbat</li>
          <li>Hello Matt</li>
        </ul>
        <div className="flex-img-container">
          {display}
        </div>

        <hr />

        <div className="large-img-container">
          
          <div className="img-text-container">
            {largeImg}
            <div 
              // onDragOver={(e)=>this.onDragOver(e)}
              // onDrop={(e)=> this.onDrop(e)}
              style={{backgroundColor: 'red'}}
            >
              {this.state.draggedText ? (<span className="dragged">{this.state.draggedText}</span>) : ''}
            </div>
          </div>


          <label>Type your text</label><br/>
          <input 
            name="text"
            onChange={this.onInputChange}
            value={this.state.text}
          />
          <br/>
            
          <button disabled={!this.state.text} className="blue-btn">Done</button>

          <div 
            draggable 
            className={selectedImg ? 'overlay-text' : ''}
            onDrag={(e)=>this.onDrag(e, this.state.text)} 
            onDragStart={(e)=> this.onDragStart(e)}
            onDragEnd={(e) => console.log('end evt: ', e)}
          >
            {this.state.text}
          </div>

          <label>Upload images</label><br/>
          <input type="file" onChange={this.handleUpload}/>
          <br/>
          <button  className="blue-btn"onClick={this.onUpload}>Upload</button>

          <div className="footer-btn-container">
            <button className="footer-btn blue-btn">Cancel</button>
            <button className="print-btn">Print</button>
            <button className="footer-btn blue-btn">Save</button>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
