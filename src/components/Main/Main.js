import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import Card from '../Card/Card.js'
import avatar from '../../images/avatar.jpg';
import {api} from '../../utils/Api.js';



function Main(props) {

    const [userName, setUserName] = React.useState('Кирилл Корнеев');
    const [userJob, setUserJob] = React.useState('Физик');
    const [userAvatar, setUserAvatar] = React.useState(avatar);
    const [cards, setCards] = React.useState([]);
    

    React.useEffect(() => {
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
    }, []);

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
                    {cards.map((card, i) => <Card 
                        card = {card}
                        key = {i}
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
                        children
                        isOpen = {props.isEditProfilePopupOpen}
                        onClose = {props.onClose}
            > 
                <>
                    <input id="name-input" name="inputChangeName" required className="form__input form__input_el_name" type="text" minLength="2" maxLength="40" placeholder="Введите имя"  />
                    <span id="name-input-error" className="form__input-error form__input-error_el_name"></span>
                    <input id="job-input" name="inputChangeJob" required className="form__input form__input_el_spec" type="text" minLength="2" maxLength="200" placeholder="Специализация"  />
                    <span id="job-input-error" className="form__input-error form__input-error_el_spec"></span>
                </>
            </PopupWithForm>
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
                        children
                        isOpen = {props.isAddPlacePopupOpen} 
                        onClose = {props.onClose}                      
            >
                <>
                    <input id="name-input" name="inputChangeName" required className="form__input form__input_el_name" type="text" minLength="2" maxLength="40" placeholder="Название"  />
                    <span id="name-input-error" className="form__input-error form__input-error_el_name"></span>
                    <input id="job-input" name="inputChangeJob" required className="form__input form__input_el_spec" type="text" minLength="2" maxLength="200" placeholder="Ссылка на картинку"  />
                    <span id="job-input-error" className="form__input-error form__input-error_el_spec"></span>
                </>
            </PopupWithForm>
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
                        children
                        isOpen = {props.isEditAvatarPopupOpen}  
                        onClose = {props.onClose}
            >
                <>
                    <input id="job-input" name="inputChangeJob" required className="form__input form__input_el_spec" type="text" minLength="2" maxLength="200" placeholder="Ссылка"  />
                    <span id="job-input-error" className="form__input-error form__input-error_el_spec"></span>
                </>
            </PopupWithForm>
        </main>
    );
}

export default Main;