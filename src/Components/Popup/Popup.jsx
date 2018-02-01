import { h, render, Component } from 'preact';
import cN from 'classnames';
import showdown from 'showdown';

const converter = new showdown.Converter();
import s from '../../../../elections_2018/shared/Components/Popup/Popup.css';

export default class Popup extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
      mounted: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ mounted: true });
      document.body.style.overflow = 'hidden';
    }, 30);

    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount () {
    document.body.removeAttribute('style');
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = ({ key }) => {
    if (key === 'Escape') this.handleClose();
  };

  handleClose = () => {
    this.setState({ mounted: false });
    setTimeout(() => {
      this.props.close();
    }, 430);
  };

  render () {
    const { open, mounted } = this.state;
    const { name, camara, partido, foto, caracter, perfilito, caracterogramaURL, mentirasMasRepetidas, detectorURL, hablanAlOido, relacionesURL, testProgramaticoURL, positions, comparacionDeProgramasURL, apoyos, todosLosActivosURL, proyectosBandera, historiasSobreElCandidatoURL, perfilDeQuienEsQuien, twitter, facebook, paginaWeb } = this.props;
    return (
      <div className={cN(s.root, { [s.mounted]: mounted })}>
        <div className={s.overlay} onClick={this.handleClose} />
        <div className={s.inner}>
          <header className={s.header}>
            <span>{partido}</span>
            <span>{camara}</span>
          </header>

          <div className={s.intro}>
            <div className={s.photo} style={{ backgroundImage: `url(${foto})` }} />
            <div className={s.name}>
              <h4>{name}</h4>
              <ul className={s.links}>
                {perfilDeQuienEsQuien ?
                  <li><a href={perfilDeQuienEsQuien} target="_blank" rel="noopener noreferrer">Quién es quién</a></li>
                  : undefined}
                {twitter ?
                  <li>Twitter: <a href={`https://twitter.com/${twitter}`} target="_blank"
                                  rel="noopener noreferrer">{twitter}</a></li>
                  : undefined}
                {facebook ?
                  <li>Facebook: <a href={facebook} target="_blank" rel="noopener noreferrer">{name}</a></li>
                  : undefined}
                {paginaWeb ?
                  <li><a href={paginaWeb} target="_blank" rel="noopener noreferrer">{paginaWeb}</a></li>
                  : undefined}
              </ul>
            </div>
          </div>

          <button className={s.button} onClick={(e) => {
            this.setState({ open: !open })
          }}>
            LEER PERFIL
          </button>

          {open ?
            <article className={s.content}
                     dangerouslySetInnerHTML={{ __html: converter.makeHtml(perfilito || '*No perfil*') }} />
            : undefined}

          <div className={s.section}>
            <h4>Los que le hablan al oído:</h4>
            <ul className={s.horizontalList}>
              {hablanAlOido.map((item) => {
                if (!item.name) return;
                return (
                  <li key={item.name} className={s.horizontalListItem}>
                    <img src={`${item.photo}?w=100&h=100`}
                         width={50} height={50} alt=''
                         className={s.photo} />
                    <span className={s.tinyName}>{item.name}</span>
                  </li>
                )
              })}
            </ul>
            {relacionesURL ?
              <a href={relacionesURL} className={s.outgoingLink} target="_blank" rel="noopener noreferer">VEA SUS
                RELACIONES</a>
              : undefined}
          </div>

          <div className={cN(s.section, s.section__blank)}>
            <h4>Carácter:</h4>
            <ul className={s.list}>
              {caracter.map((car, i) => {
                if (!car) return;
                return <li key={i}>{car}</li>
              })}
            </ul>
            {caracterogramaURL ?
              <a href={caracterogramaURL} className={s.outgoingLink} target="_blank" rel="noopener noreferer">VEA EL
                CARACTEROGRAMA</a>
              : undefined}
          </div>

          <div className={s.section}>
            <h4>Las mentiras mas repetidas:</h4>
            <ul className={s.list}>
              {mentirasMasRepetidas.map((car, i) => {
                if (!car) return;
                return <li key={i}>{car}</li>
              })}
            </ul>
            {detectorURL ?
              <a href={detectorURL} className={s.outgoingLink} target="_blank" rel="noopener noreferer">VEA EL
                DETECTOR</a>
              : undefined}
          </div>

          <div className={cN(s.section, s.section__blank)}>
            <h4>Su posición frente a:</h4>
            <table className={s.listRows}>
              {positions.map((pos, i) => {
                return (
                  <tr key={i}>
                    <td width={500}>{pos.title}</td>
                    <td><span className={cN(s.posneg, { [s.negative]: !pos.positive })}>{pos.result}</span></td>
                  </tr>
                )
              })}
            </table>
            {testProgramaticoURL ?
              <a href={testProgramaticoURL} className={s.outgoingLink} target="_blank" rel="noopener noreferer">VEA TEST
                PROGRAMÁTICO</a>
              : undefined}
          </div>

          {proyectosBandera ?
            <div className={s.section}>
              <h4>Proyectos bandera:</h4>
              <div className={s.content}>
                <p>{proyectosBandera}</p>
              </div>
              {comparacionDeProgramasURL ?
                <a href={comparacionDeProgramasURL} className={s.outgoingLink} target="_blank" rel="noopener noreferer">COMPARE
                  LOS PROGRAMAS</a>
                : undefined}
            </div>
            : undefined}

          <div className={cN(s.section, s.section__blank)}>
            <h4>Sus principales apoyos:</h4>
            <ul className={s.list}>
              {apoyos.map((apoyo, i) => {
                if (!apoyo) return;
                return <li key={i}>{apoyo}</li>
              })}
            </ul>
            {todosLosActivosURL ?
              <a href={todosLosActivosURL} className={s.outgoingLink} target="_blank" rel="noopener noreferer">VEA TODOS
                SUS ACTIVOS</a>
              : undefined}
          </div>

          <a className={cN(s.button, s.noTopBorder)} href={historiasSobreElCandidatoURL} target="_blank"
             rel="noopener noreferer">MÁS HISTORIAS SOBRE EL CANDIDATO</a>
          <button className={cN(s.button, s.noTopBorder)} onClick={this.handleClose}>Cerrar</button>
        </div>
      </div>
    );
  }
}