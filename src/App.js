import React, {useState, useLocation} from 'react';
import './App.css';
import Slider from './components/Slider';
import InfobarItem from './components/InfobarItem';
import downloadAsJpeg from './components/DownloadImg'


//style options
const DEFAULT_OPTIONS =[
  { name:"Brightness", property:"brightness", type:"filter", value: 100, range:{min:0, max:200}, unit: '%'},
  { name:"Contrast", property:"contrast", type:"filter", value: 100, range:{min:0, max:200}, unit: '%'},
  { name:"Saturation", property:"saturate", type:"filter", value: 100, range:{min:0, max:200}, unit: '%'},
  { name:"Greyscale", property:"grayscale", type:"filter", value: 0, range:{min:0, max:100}, unit: '%'},
  { name:"Sepia", property:"sepia", type:"filter", value: 0, range:{min:0, max:100}, unit: '%'},
  { name:"Hue Rotate", property:"hue-rotate", type:"filter", value: 0, range:{min:0, max:360}, unit: 'deg'},
  { name:"Blur", property:"blur", type:"filter", value: 0, range:{min:0, max:20}, unit: 'px'},
  { name:"Invert", property:"invert", type:"filter", value: 0, range:{min:0, max:100}, unit: '%'},
  { name:"Opacity", property:"opacity", type:"filter",value: 100, range:{min:0, max:100}, unit: '%'},
  { name:"Skew", property:"skew", type:"transform",value: 0, range:{min:0, max:360}, unit: 'deg'},
  { name:"Rotate X", property:"rotateX", type:"transform",value: 0, range:{min:0, max:360}, unit: 'deg'},
  { name:"Rotate Y", property:"rotateY", type:"transform",value: 0, range:{min:0, max:360}, unit: 'deg'}
]

function App() {


  //states
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selectedImg, setSelectedImg] = useState(null);
  const [visible, setVisible] = useState(true);
  const selectedOption = options[selectedOptionIndex];


 //Creates styles from default options
  function getImgStyle(){
    const filters = options.map(option=>{
      if(option.type==="filter")
       return `${option.property}(${option.value}${option.unit})`
    })
    const transforms = options.map(option=>{
      if(option.type==="transform")
       return `${option.property}(${option.value}${option.unit})`
    })  
    return [{transform:transforms.join(' ')},  {filter:filters.join(' ')}];
  };

  
  //applys the silder to current style
  function handleSliderChange ({target}){
    setOptions(prevOptions =>{
      return prevOptions.map((option, index)=>{
        if(index!== selectedOptionIndex) return option
        return {...option, value:target.value}
      })
    })
  }

  //restart the page 
  function resetPage(){
    window.location.reload()
  }


  return (
    <div className="container">
      <div className="header">
        <h1>Photo Editor</h1>
      </div>
      <div className="upload-conatiner" style={{display: visible ? 'flex' : 'none'}}>
          <h2>Upload Your Photo To Get Started!</h2>
      <input type="file" onChange={(e) =>{
        setVisible(false)
        setSelectedImg(e.target.files[0])
      }} />
      </div>  
      {selectedImg && (
          <img alt="Your upload" id = "upload-image" className="upload-image" style={{...getImgStyle()[0],...getImgStyle()[1]}} src={URL.createObjectURL(selectedImg)}/>
      )}
      <div className="infobar">
        {options.map((option, index) =>{
         return (<InfobarItem key={index} name={option.name} active={index===selectedOptionIndex} handleClick={()=> setSelectedOptionIndex(index)} />)
        })}
        <button onClick={downloadAsJpeg}>Download Your Image</button>
        <button onClick={resetPage} className="warning">Reset Page</button>
      </div>
      <Slider min={selectedOption.range.min} max={selectedOption.range.max} value={selectedOption.value} handleChange={handleSliderChange}/>
      </div>
  );
}

export default App;
