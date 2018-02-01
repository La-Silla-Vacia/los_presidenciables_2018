import { h, render, Component } from 'preact';
import Popup from '../Popup';
import s from './Graphic.css';

export default class Graphic extends Component {
  constructor (props) {
    super(props);

    this.state = {
      popupOpen: false,
      popupItem: 0
    }
  }

  handlePersonClick = index => {
    if (this.state.popupOpen) return;
    this.setState({ popupOpen: true, popupItem: index });
  };

  handleClosePopup = () => {
    this.setState({ popupOpen: false });
  };

  getCircles () {
    // Get the data from the attribute
    const { data } = this.props;

    // Loop through the data
    return data.map((item, key) => {
        const { id, name, foto } = item;

        // Return the element. If you click on it run the handleClick function
        return (
          <button className={s.circle} key={id} onClick={this.handlePersonClick.bind(false, key)}>
            <img className={s.photo} src={foto} alt='' />
            <span className={s.name}>{name}</span>
          </button>
        )
      }
    );
  }

  render (props, state) {
    const { popupOpen, popupItem } = state;
    const { data } = props;
    const circles = this.getCircles();

    return (
      <div className={s.container}>
        <div className={s.row}>
          {circles}
        </div>

        {popupOpen ?
          <Popup {...data[popupItem]} close={this.handleClosePopup} />
          : undefined}
      </div>
    )
  }
}