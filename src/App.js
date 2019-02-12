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
      textLeft: '',
      textTop: '',
      singleImg: '',
      uploadedFile: null,
    }

    this.textRef = React.createRef();
    this.textContainer = React.createRef();

  }
  
  // https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
  //collection ids: https://unsplash.com/collections
  loadImages = () => {
    // axios.get('https://source.unsplash.com/collection/1163637/480x480')
    let imgs = Array(9).fill(0).map(el => {
      el = {id: Math.random().toFixed(5), url: 'https://source.unsplash.com/collection/1163637/200x200', selected: false};
      return el;
    });
    this.setState({
      imgs
    }, ()=> {
      this.setDefaultLargeImg();
    });

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

  // testImg = () => {
  //   console.log('hit testImg');
  //   axios.get('https://source.unsplash.com/random/150x150')
  //     .then(res => this.setState({singleImg: res.request.responseUrl}))
  //     console.log(this.state.singleImg);
  //     // .then(()=> this.setState({
  //     //     imgs: [...this.state.imgs, this.state.singleImg]
  //     // })
    
  //     // .then(res => console.log(res.request.responseUrl));
  //   }

  componentDidMount() {
    //make API call, load images, also set default (as callback to loadImages, after setting state)
    this.loadImages();
    // this.testImg();
  }

  setDefaultLargeImg = () => {
    const { imgs } = this.state;
    let randomIdx = Math.floor(Math.random() * imgs.length);
    let largeImg = imgs[randomIdx];
    this.setState({selectedImg: largeImg});
  }

  setSelectedImg = (img) => {
    // img.url = img.url.slice(0,-7) + '480x480';
    this.setState({selectedImg: img});
  }

  setImgPosition = e => {
    // console.log('container evt: ', e);
    // console.log('container target: ', e.target);
    // console.log('container current target: ', e.currentTarget);

    console.log('container clientWidth', this.textContainer.current.clientWidth);

    // console.log('window width: ', window.document.body.clientWidth);
    // console.log('set position evt', e.pageX, e.pageY);
    // console.log('client position evt', e.clientX, e.clientY);
    // console.log('screen position evt', e.screenX, e.screenY);
    // console.log('window: ', window);
    // console.log('body: ', window.document.body);

    // const leftOffset = window.document.body.clientWidth - e.pageX;
    // console.log('leftOffset', leftOffset);
    const top = e.clientY - e.target.offsetTop - 77;
    this.setState({
      textLeft: `${e.clientX - e.target.offsetLeft - 656}px`,
      // textTop: `${e.screenY}`
      textTop: `${top}px`,
    }, ()=> {
      this.textRef.current.style.backgroundColor = 'red';
      this.textRef.current.style.top = this.state.textTop;
      this.textRef.current.style.left = this.state.textLeft;
    });
    console.log('this.textRef: ', this.textRef);
    console.log('textRef clientWidth', this.textRef.current.clientWidth);
    // console.log('this.textRef style: ', this.textRef.current.style);
    // console.log('this.textRef x: ', this.textRef.current.style.x);
    // this.getSpanPosition(this.textRef);
    // const domNode = ReactDOM.findDOMNode(this.textRef);
    // domNode.getBoundingClientRect();
    console.log('top offset: ', e.clientY - e.target.offsetTop - 77);
    console.log('left offset: ', e.clientX - e.target.offsetLeft - 656);
  }

  getSpanPosition = e => {
    console.log('span position evt', e.pageX, e.pageY);
    console.log('span screen position evt', e.screenX, e.screenY);
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

  moveText = () => {
    console.log('moveText');
    //get text div by className, apply CSS positioning styles (e.g., increment absolute top position by x pixels for each btn click)
  }

  handleUpload = (e) => {
    console.log(e.target.files[0]);
    this.setState({uploadedFile: e.target.files[0]});
  }

  onUpload = () => {
    console.log('hit upload');
    //axios request to Firebase or MongoDB
    const fd = new FormData();
    fd.append('image', this.state.uploadedFile, this.state.uploadedFile.name);
    // axios.post(`${URLGOESHERE}`, fd)
    //   .then(res => console.log('FB response: ', res));
  }

  render() {

    const {imgs, selectedImg, text} = this.state;
    console.log('imgs: ', imgs);

    const largeImg = (selectedImg) ? 
      <img 
        src={selectedImg.url} 
        alt="text"
        onClick={this.setImgPosition}
      /> : 
      null;

    // const textPosition = {left: '90%', top: '10%'};

    // const testImg = singleImg ? <img src={`${singleImg}`} alt="text"/> : <h3>Loading...</h3>;
    // const testImg = <img src={'https://source.unsplash.com/random/150x150'} alt="text"/>;


    const userText = <span 
      ref={this.textRef} 
      onClick={this.getSpanPosition} 
      className="typed-text"
      // style={{textPosition}}
    >
      {this.state.text}
    </span>


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
          
          <div ref={this.textContainer} className="img-text-container">
            {largeImg}
            {userText}
          </div>


          <div className="input-container">
            <label>Type your text</label><br/>
            <input 
              className="large-input"
              name="text"
              onChange={this.onInputChange}
              value={this.state.text}
            />
            <button disabled={!this.state.text} className="blue-btn">Done</button>
            {/* {testImg} */}
          </div>

          {/* <div 
            draggable 
            className={selectedImg ? 'overlay-text' : ''}
            onDrag={(e)=>this.onDrag(e, this.state.text)} 
            onDragStart={(e)=> this.onDragStart(e)}
            onDragEnd={(e) => console.log('end evt: ', e)}
          >
            {this.state.text}
          </div> */}

          <div className="upload-container">
            <label>Upload images</label><br/>
            <input type="file" onChange={this.handleUpload}/>
            <button  className="blue-btn"onClick={this.onUpload}>Upload</button>
          </div>

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
