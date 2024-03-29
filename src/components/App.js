import React from 'react';
import Header from  './Header/Header.js';
import Main from './Main/Main.js';
import Footer from './Footer/Footer.js';
import {CurrentUserContext} from '../contexts/currentUserContext.js';
import {api} from '../utils/api.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
        api.getUserInformation('users/me'),
        api.getItems('cards')
    ])
    .then((res) => {
        const [userInfo, firstCards] = res;
        setCards(firstCards);
        setCurrentUser(userInfo);
    })
    .catch((err) => {
        console.log(`Ошибка ${err}`)
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if(isLiked) {
        api.removeLike('cards/likes', card._id).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        });
    }
    else {
        api.putLike('cards/likes', card._id).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        });
    }
  } 

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function deleteCard(card) {
    api.deleteItem('cards', card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
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

  function handleUserUpdate({profileName, profileJob}) {
    api.profileEditing('users/me', profileName, profileJob)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }

  function handleAvatarUpdate(link) {
    api.avatarEditing('users/me/avatar', link)
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }

  function handleCardsUpdate(name, link) {
    api.createItem('cards', name, link)
    .then((res) => {
      setCards([...cards, res]);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }

  return ( 
    <CurrentUserContext.Provider value={
      currentUser
    }>
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
            cards = {cards}
            onDeleteCards = {deleteCard}
            onUpdateUser = {handleUserUpdate}
            onUpdateAvatar = {handleAvatarUpdate}
            onCardLike = {handleCardLike}
            onUpdateCards = {handleCardsUpdate}
          />
          <Footer />    
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
