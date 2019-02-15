import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Stock from './Stock';

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
      uploadedFile: '',
      uploadUrl: '',
      // testImg2: ''
    }

    this.spanRef = React.createRef();
    this.spanContainer = React.createRef();

  }
  
  // https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
  //collection ids: https://unsplash.com/collections
  loadImages = () => {
    // axios.get('https://source.unsplash.com/collection/1163637/480x480')
    // let imgs = Array(9).fill(0).map(el => {
    //   el = {id: Math.random().toFixed(5), url: 'https://source.unsplash.com/collection/1163637/200x200', selected: false};
    //   return el;
    // });
    // this.setState({
    //   imgs
    // }, ()=> {
    //   this.setDefaultLargeImg();
    // });

    //ALTERNATIVE:
    let imgs = Array(9).fill(0).map(img => {
      //hit the endpoint (and get new random img) for each time through the loop
      axios.get('http://www.splashbase.co/api/v1/images/random')
        .then(res => {
          img = {
            id: res.data.id,
            url: res.data.url,
            selected: false
          }
          return img;
        })
        .then(img => {
          this.setState({
            imgs: [...this.state.imgs, img]
          }, ()=> {
            this.setDefaultLargeImg();
          })
        })
      })
    // axios.get('http://www.splashbase.co/api/v1/images/random')
    //   .then(res => {
    //     console.log('res: ', res.data);
    //     return res.data.map(item => {
    //       item = {
    //         id: res.data.id,
    //         url: res.data.url,
    //         selected: false
    //       }
    //       return item;
    //     })
    //   })
    //   .then(imgs => {
    //     this.setState({
    //       imgs,
    //     }, ()=> {
    //       this.setDefaultLargeImg();
    //     });
    //   });

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

  // testImg2 = () => {
  //   axios.get('http://www.splashbase.co/api/v1/images/random')
  //     .then(res => this.setState({
  //       testImg2: res.data.url,
  //     }));
  // }

  componentDidMount() {
    //make API call, load images, also set default (as callback to loadImages, after setting state)
    this.loadImages();
    // this.testImg();
    // this.testImg2();
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

    console.log('container clientWidth', this.spanContainer.current.clientWidth);

    // console.log('window width: ', window.document.body.clientWidth);
    // console.log('set position evt', e.pageX, e.pageY);
    // console.log('client position evt', e.clientX, e.clientY);
    // console.log('screen position evt', e.screenX, e.screenY);
    // console.log('window: ', window);
    // console.log('body: ', window.document.body);

    // const leftOffset = window.document.body.clientWidth - e.pageX;
    // console.log('leftOffset', leftOffset);

    //**********NEED TO KNOW HOW FAR FROM ABSOLUTE TOP/LEFT THE IMG BOX IS, TO REPLACE HARD-CODED 39 AND 656 */
    const top = e.clientY - e.target.offsetTop + 58; //rougly distance from h3 to top of img
    //look in devtools to see height of whole container and of each sub-element, dynamically calculate these using refs?
    //NOTE: see notes in OneNote
    const left = e.clientX - e.target.offsetLeft - 670;
    console.log(`top: ${top} is clientY ${e.clientY} - target offsetTop ${e.target.offsetTop}`);
    console.log(`left: ${top} is clientX ${e.clientX} - target offsetLeft ${e.target.offsetLeft}`);

    this.setState({
      textLeft: `${left}px`,
      // textTop: `${e.screenY}`
      textTop: `${top}px`,
    }, ()=> {
      this.spanRef.current.style.backgroundColor = 'red';
      this.spanRef.current.style.top = this.state.textTop;
      this.spanRef.current.style.left = this.state.textLeft;
    });
    console.log('this.spanRef: ', this.spanRef);
    console.log('spanRef clientWidth', this.spanRef.current.clientWidth);
    // console.log('this.spanRef style: ', this.spanRef.current.style);
    // console.log('this.spanRef x: ', this.spanRef.current.style.x);
    // this.getSpanPosition(this.spanRef);
    // const domNode = ReactDOM.findDOMNode(this.spanRef);
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
    e.preventDefault();
    console.log(e.target.files[0]);
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        uploadedFile: file,
        uploadUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  onUpload = e => {
    console.log('hit upload');
    e.preventDefault();
    console.log('file: ', this.state.uploadedFile, this.state.uploadUrl);


    //BACKEND METHOD:
    //axios request to Firebase or MongoDB
    // const fd = new FormData();
    // fd.append('image', this.state.uploadedFile, this.state.uploadedFile.name);
    // axios.post(`${URLGOESHERE}`, fd)
    //   .then(res => console.log('FB response: ', res));
  }

  render() {

    const {imgs, selectedImg, text, uploadUrl} = this.state;
    console.log('imgs: ', imgs);

    const largeImg = (selectedImg) ? 
      <img 
        src={selectedImg.url}
        style={{width: '400px', height: '300px'}} 
        alt="text"
        onClick={this.setImgPosition}
      /> : 
      null;

    // const textPosition = {left: '90%', top: '10%'};

    // const testImg = singleImg ? <img src={`${singleImg}`} alt="text"/> : <h3>Loading...</h3>;
    // const testImg = <img src={'https://source.unsplash.com/random/150x150'} alt="text"/>;
    // const testImg2 = <img src={this.state.testImg2} alt="testImg2"/>;
    // const testImg = uploadUrl ? <img onClick={this.setSelectedImg} src={uploadUrl} alt="img"/> : <h6>Pick an image</h6>;

    const userText = <span 
      ref={this.spanRef} 
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
          style={{width: '150px', height: '150px'}} 
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
          <li className="link-bold">Flyer Creator</li>
          <li className="link-bold link2">Dbat</li>
          <li>Hello Matt</li>
        </ul>
        
        <div className="flex-img-container">
          <h3 className="header">Choose your template</h3>
          {display}
          
        </div>
        <Stock />

        {/* {testImg2} */}

        <hr />

        <div className="large-img-container">
          <div ref={this.spanContainer} className="img-text-container">
            <h3 className="header">Customize your template</h3>
            <p>Click on an area to add text.</p>
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
            <form onSubmit={this.onUpload}>
              <label>Upload images</label><br/>
              <input type="file" onChange={this.handleUpload}/>
              <button  className="blue-btn"onClick={this.onUpload}>Upload</button>
            </form>

            {/* {testImg} */}
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
