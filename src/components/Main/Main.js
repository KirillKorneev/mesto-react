import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import Card from '../Card/Card.js'
import avatar from '../../images/avatar.jpg';
import App from '../App.js';
import {api} from '../../utils/Api.js';
//import './Main.css'



function Main(props) {

    const [userName, setUserName] = React.useState('Кирилл Корнеев');
    const [userJob, setUserJob] = React.useState('Физик');
    const [userAvatar, setUserAvatar] = React.useState(avatar);
    const [cards, setCards] = React.useState([]);
    

    Promise.all([
        api.getUserInformation('users/me'),
        api.getItems('cards')
    ])
    .then((res) => {
        const [userInfo, firstCards] = res;
        setUserName(userInfo.name);
        setUserJob(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(firstCards);
    })
    .catch((err) => {
        console.log(`Ошибка ${err}`)
    });

    return (
        <main className="content">
            <section className="profile">
                <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar">
                    <button onClick={props.onEditAvatar} className="profile__changeImageButton"></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button onClick={props.onEditProfile} type="button" className="profile__edit" aria-label="Открытие формы"></button>
                    <p className="profile__about">{userJob}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__button" aria-label="Добавление карточки"></button>
            </section>
            <section className="gallery">
                <ul className="elements">
                    {cards.map((card) => <Card 
                        card = {card}
                        onCardClick = {props.onCardClick}
                    />)}
                </ul>
            </section>
            <PopupWithForm name="info" 
                        type="changeName" 
                        formType="change" 
                        agree="" 
                        formTitle="Редактировать профиль"
                        typeButton="save"
                        buttonName="Сохранить"
                        children= {
                                <>
                                    <input id="name-input" name="inputChangeName" required className="form__input form__input_el_name" type="text" minLength="2" maxLength="40" placeholder="Введите имя" value="" />
                                    <span id="name-input-error" className="form__input-error form__input-error_el_name"></span>
                                    <input id="job-input" name="inputChangeJob" required className="form__input form__input_el_spec" type="text" minLength="2" maxLength="200" placeholder="Специализация" value="" />
                                    <span id="job-input-error" className="form__input-error form__input-error_el_spec"></span>
                                </>
                        }
                        isOpen = {props.isEditProfilePopupOpen}
                        onClose = {props.onClose}
            />
            <ImagePopup card={props.selectedCard}
                    onClose = {props.onClose}
            />
            <PopupWithForm name="new" 
                        type="newPlace" 
                        formType="new" 
                        agree="" 
                        formTitle="Новое место"
                        typeButton="new"
                        buttonName="Создать"
                        children= {
                                <>
                                    <input id="name-input" name="inputChangeName" required className="form__input form__input_el_name" type="text" minLength="2" maxLength="40" placeholder="Название" value="" />
                                    <span id="name-input-error" className="form__input-error form__input-error_el_name"></span>
                                    <input id="job-input" name="inputChangeJob" required className="form__input form__input_el_spec" type="text" minLength="2" maxLength="200" placeholder="Ссылка на картинку" value="" />
                                    <span id="job-input-error" className="form__input-error form__input-error_el_spec"></span>
                                </>
                        }
                        isOpen = {props.isAddPlacePopupOpen} 
                        onClose = {props.onClose}                      
            />
            
            <PopupWithForm name="agreement" 
                        type="agree" 
                        formType="sure" 
                        agree="form__title_agree" 
                        formTitle="Вы уверены?"
                        typeButton="agree"
                        buttonName="Да"
            />
            <PopupWithForm name="updatePhoto" 
                        type="update" 
                        formType="update" 
                        agree="" 
                        formTitle="Обновить аватар"
                        typeButton="update"
                        buttonName="Сохранить"
                        children= {
                                <>
                                    <input id="job-input" name="inputChangeJob" required className="form__input form__input_el_spec" type="text" minLength="2" maxLength="200" placeholder="Ссылка" value="" />
                                    <span id="job-input-error" className="form__input-error form__input-error_el_spec"></span>
                                </>
                        }
                        isOpen = {props.isEditAvatarPopupOpen}  
                        onClose = {props.onClose}
            />
            <template id="tem-element">
                <li className="element">
                    <img className="element__photo" src="#" alt="Описание фото" />
                    <div className="element__info">
                        <h2 className="element__name">Название</h2>
                        <div className="element__data">
                            <button type="button" className="element__like" aria-label="Лайк"></button>
                            <p className="element__counter"></p>
                        </div>
                    </div>
                    <button type="button" className="element__delete" aria-label="Удалить"></button>
                </li>
            </template> 
        </main>
    );
}

export default Main;