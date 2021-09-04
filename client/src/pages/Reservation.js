import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import ReservationForm from '../components/Post/ReservationForm'
import { isEmpty } from '../components/Utilitaires'
import NavBar from '../components/PageAccueil/NavBar';
import Dropdown from '../components/PageAccueil/Dropdown';

const Reservation = (props) => {
  const posts = useSelector(state => state.postReducer)

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
    <NavBar toggle={toggle}/>
    <Dropdown isOpen={isOpen} toggle={toggle}/>
    <div className="container" style={{paddingTop: '60px'}}>
      {!isEmpty(posts[0]) &&
      posts.map((post, key) => {
        if (`?id=${post._id}` === props.location.search) {
          return <ReservationForm post={post} key={post._id} /> 
        }})}
    </div>
    
    </>
  )
}

export default Reservation
