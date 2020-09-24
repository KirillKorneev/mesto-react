import React from 'react';

export default class Card extends React.Component {

    _handleClick = () => {
        this.props.onCardClick(this.props.card);
    }

    render() {
        return (
            <li className="element">
                <img className="element__photo" src={`${this.props.card.link}`} onClick={this._handleClick} alt="Описание фото" />
                <div className="element__info">
                    <h2 className="element__name">{this.props.card.name}</h2>
                    <div className="element__data">
                        <button type="button" className="element__like" aria-label="Лайк"></button>
                        <p className="element__counter">{`${this.props.card.likes.length}`}</p>
                    </div>
                </div>
                <button type="button" className="element__delete" aria-label="Удалить"></button>
            </li> 
        );
    }
}