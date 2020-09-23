import React from 'react';


class PopupWithForm extends React.Component {
    render() {
        return (
            <section className={`popup popup_${this.props.name} ${this.props.isOpen ? `popup_open` : ``}`}>
                <div className={`popup__edit popup__edit_${this.props.type}`}>
                    <form noValidate name="formChange" className={`form form_${this.props.formType}`} action="#" method="post">
                        <h2 className={`form__title ${this.props.agree}`}>{this.props.formTitle}</h2>
                        {this.props.children}
                        <button name="buttonChangeSave" className={`form__button ${this.props.typeButton}`} aria-label={`${this.props.typeButton}`}>{this.props.buttonName}</button>
                    </form>
                    <button onClick={this.props.onClose} name="buttonChangeClose" type="button" className="popup__close"></button>
                </div>
            </section>
        );
    }
}

export default PopupWithForm;