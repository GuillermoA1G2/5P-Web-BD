import React from 'react';
import './style.css';

const PlayList: React.FC = () => {
  const togglePlayPause = () => {
    // Lógica para alternar entre reproducir y pausar la canción
  };

  return (
    <article className="screen">
      <input type="checkbox" value="None" id="magicButton" name="check" />
      <label className="main" htmlFor="magicButton"></label>

      <div className="coverImage"></div>
      <div className="search"></div>
      <div className="bodyPlayer"></div>

      <table className="list">
        <tbody>
          <tr className="song">
            <td className="nr">
              <h5>1</h5>
            </td>
            <td className="title">
              <h6>Heavydirtysoul</h6>
            </td>
            <td className="length">
              <h5>3:54</h5>
            </td>
            <td>
              <input type="checkbox" id="heart" />
              <label className="zmr" htmlFor="heart"></label>
            </td>
          </tr>
          {/* Aquí puedes agregar más filas de canciones si es necesario */}
        </tbody>
      </table>

      <div className="shadow"></div>

      <div className="bar"></div>

      <div className="info">
        <h4>STRESSED OUT</h4>
        <h3>twenty one pilots - Blurryface</h3>
      </div>

      <audio preload="auto" id="audio" controls>
        <source src="http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3" />
        <source src="http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.ogg" />
      </audio>

      <table className="player">
        <tbody>
          <tr>
            <td>
              <input type="checkbox" id="backward" />
              <label className="backward" htmlFor="backward"></label>
            </td>
            <td>
              <input type="checkbox" id="play" title="Play" onClick={togglePlayPause} />
              <label className="play" htmlFor="play"></label>
            </td>
            <td>
              <input type="checkbox" id="forward" />
              <label className="forward" htmlFor="forward"></label>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="footer">
        <tbody>
          <tr>
            <td>
              <input type="checkbox" id="love" defaultChecked />
              <label className="love" htmlFor="love"></label>
            </td>
            {/* Aquí puedes agregar más elementos de la barra de pie si es necesario */}
          </tr>
        </tbody>
      </table>

      <div className="current">
        <h2>STRESSED OUT</h2>
      </div>
    </article>
  );
};

export default PlayList;
