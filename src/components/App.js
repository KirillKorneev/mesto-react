import React from 'react';
import Header from  './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';

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
    <div className="page">
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
    </div>
  );
}

export default App;
