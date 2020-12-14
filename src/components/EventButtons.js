//import { Button } from 'reactstrap'
//import { FaTrashAlt } from 'react-icons/fa';

export default function Foo(props){
  return(
    <>
      <button data-foo={props.id} id={props.id} onClick={props.parading} className='btn btn-info btn-md'>
        Parading
      </button>
      <span> &nbsp; </span>
      <button data-foo={props.id} id={props.id} onClick={props.atPost} className='btn btn-warning btn-md'>
        At Post
      </button>
      <span> &nbsp; </span>
      <button data-foo={props.id} id='off' onClick={props.off} className='btn btn-danger btn-md'>
        Off
      </button>
      <span> &nbsp; </span>
      <button data-foo={props.id} className='btn btn-success btn-md' onClick={props.finish}>Finish</button>
      {/* <Button
        data-index={props.dataIndex} 
        className='btn btn-danger btn-sm' 
        style={{marginLeft:'20px'}}
        onClick={props.deleteEvent}
        data-index={props.index}
      >
        <FaTrashAlt size={16}/>
      </Button>  */}
    </>
  )            
}
  