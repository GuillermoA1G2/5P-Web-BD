//import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PlayList.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';

const BASE_URL = 'https://movie-list.alphacamp.io';
const INDEX_URL = BASE_URL + '/api/v1/movies/';//URL de la Lista de peliculas
const POSTER_URL = BASE_URL + '/posters/';//Url de los posters de peliculas
const ITEM_PER_PAGE = 12;//Numeor de elementos por página

function PlayList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');//Termino de busqueda
  const [page, setPage] = useState(1);
  const [isListModel, setIsListModel] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);//Pelicula seleccionada
  const [paginationData, setPaginationData] = useState([]);//Datos de paginación

  useEffect(() => {
    axios.get(INDEX_URL)
      .then(response => {
        setData(response.data.results);//Guardar datos del estado
        setPaginationData(response.data.results);//Guardar Datos de la paginación
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    getPageData(1, data);
  }, [data]);

  //Funcion para mostrar la lista de datos
  const displayDataList = (data) => {
    return data.map(item => (
      <div key={item.id} className={isListModel ? 'col-12' : 'col-sm-3'}>
        <div className="card mb-2 size">
          <img className="card-img-top" src={`${POSTER_URL}${item.image}`} alt="Card image cap" />
          <div className="card-body movie-item-body">
            <h6 className="card-title">{item.title}</h6>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={() => showMovie(item.id)}>More</button>
            <button className="btn btn-info" onClick={() => addFavoriteItem(item.id)}>+</button>
          </div>
        </div>
      </div>
    ));
  };

  //Función para mostrar detalles de una pelicula
  const showMovie = (id) => {
    const url = INDEX_URL + id;
    axios.get(url).then(response => {
      setSelectedMovie(response.data.results);
    });
  };

  //Función para agregar peliculas a favoritos
  const addFavoriteItem = (id) => {
    const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    const movie = data.find(item => item.id === Number(id));

    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your favorite list.`);
    } else {
      list.push(movie);
      alert(`Added ${movie.title} to your favorite list!`);
    }
    localStorage.setItem("favoriteMovies", JSON.stringify(list));
  };

  //Función para calacular el número total de paginas
  const getTotalPages = (data) => {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1;
    let pageItemContent = [];
    for (let i = 0; i < totalPages; i++) {
      pageItemContent.push(
        <li key={i} className="page-item">
          <a className="page-link" href="#" onClick={() => getPageData(i + 1, data)}>{i + 1}</a>
        </li>
      );
    }
    return pageItemContent;
  };

  //Función para obtener datos de una página específica
  const getPageData = (pageNum, data) => {
    setPage(pageNum);
    let offset = (pageNum - 1) * ITEM_PER_PAGE;
    let pageData = data.slice(offset, offset + ITEM_PER_PAGE);
    setPaginationData(pageData);
  };

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    event.preventDefault();
    const regex = new RegExp(searchTerm, 'i');
    const results = data.filter(movie => movie.title.match(regex));// Filtrar datos según el término de búsqueda
    getPageData(1, results);// Mostrar resultados de búsqueda en la primera página
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <div className="viewbox">
          <div className="view" onClick={() => setIsListModel(false)}><FontAwesomeIcon icon={faTh} className={!isListModel ? 'hover-color-change' : ''} /></div>
          <div className="view" onClick={() => setIsListModel(true)}><FontAwesomeIcon icon={faBars} className={isListModel ? 'hover-color-change' : ''} /></div>
        </div>
        <div className="row" id="data-panel">
          {displayDataList(paginationData)}
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center" id="pagination">
            {getTotalPages(data)}
          </ul>
        </nav>
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} />}
    </div>
  );
}

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/index.html">Movie List</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="favorite.html">Favorite</a>
        </li>
      </ul>
    </div>
  </nav>
);

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => (
  <div className="row" id="search-bar">
    <form className="form-inline" onSubmit={handleSearch}>
      <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        id="search"
        placeholder="search name ..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mb-2" id="submit-search">Search</button>
    </form>
  </div>
);

const MovieModal = ({ movie }) => (
  <div className="modal fade show" style={{ display: 'block' }} id="show-movie-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="show-movie-title">{movie.title}</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setSelectedMovie(null)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" id="show-movie-body">
          <div className="row">
            <div className="col-sm-8" id="show-movie-image">
              <img src={`${POSTER_URL}${movie.image}`} className="img-fluid" alt="Responsive image" />
            </div>
            <div className="col-sm-4">
              <p><em id="show-movie-date">Release at : {movie.release_date}</em></p>
              <p id="show-movie-description">{movie.description}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSelectedMovie(null)}>Close</button>
        </div>
      </div>
    </div>
  </div>
);

export default PlayList;