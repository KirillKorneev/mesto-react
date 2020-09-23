import React from 'react';
//import logo from '.logo.svg';
//import './App.css';
import Header from  './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import {api} from '../utils/Api.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  }

  return ( 
    <body className="page">
        <Header />
        <Main 
          onEditAvatar = {handleEditAvatar}
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}  
          onCardClick = {handleCardClick}
          onClose = {closeAllPopups}
          isEditProfilePopupOpen = {isEditProfilePopupOpen}
          isAddPlacePopupOpen = {isAddPlacePopupOpen}
          isEditAvatarPopupOpen = {isEditAvatarPopupOpen}
          selectedCard = {selectedCard}
        />
        <Footer />    
    </body>
  );
}

export default App;
