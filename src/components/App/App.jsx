// import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchData } from 'ApiUtils/pixabayApi';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Container, LargeImg } from './App.styled';

// export class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     query: '',
//     error: null,
//     page: 1,
//     showModal: false,
//     largeImageURL: null,
//   };

// componentDidUpdate(prevProps, prevState) {
//   const prevQuery = prevState.query;
//   const nextQuery = this.state.query;
//   const { page } = this.state;

//   if (prevQuery !== nextQuery || (prevState.page !== page && page !== 1)) {
//     this.fetchImages();
//   }
// }

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');


  useEffect(() => {
    const fetchImages = (query, page) => {
      // const { query, page } = this.state;
      const perPage = 12;

      // setState({ isLoading: true });
      setIsLoading(true);

      fetchData(query, page, perPage)
        .then(({ hits, totalHits }) => {
          const totalPages = Math.ceil(totalHits / perPage);

          const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
              tags,
            };
          });

          setImages(images => [...images, ...data]);
          setTotal(totalHits);

          if (hits.length === 0) {
            return toast.error('Sorry, no images found. Please, try again!');
          }

          if (page === 1) {
            toast.success(`Hooray! We found ${totalHits} images.`);
          }

          if (page === totalPages) {
            toast.info("You've reached the end of search results.");
          }

          // this.setState(({ images }) => ({
          //   images: [...images, ...data],
          //   // page: page + 1,
          //   total: totalHits,
          // }));
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
      // .catch(error => setState({ error }))
      // .finally(() => setState({ isLoading: false }));
    };

    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);



  const handleSearch = query => {
    // if (query === query) return;
    // setState({
    //   images: [],
    //   query,
    //   page: 1,
    //   error: null,
    // });
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const onLoadMore = () => {
    // setState(({ page }) => ({
    //   page: page + 1,
    // }));
    setPage(page => page + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    // setState(({ showModal }) => ({
    //   showModal: !showModal,
    //   largeImageURL: largeImageURL,
    // }));
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  // render() {
  // const { images, error, isLoading, showModal, largeImageURL, tags, total } =
  //   this.state;
  const loadImages = images.length !== 0;
  const isLastPage = images.length === total;
  const loadMoreBtn = loadImages && !isLoading && !isLastPage;

  return (
    <Container>
      {/* <SearchBar onSubmit={this.handleSearch} /> */}
      <SearchBar onSubmit={handleSearch} />

      {error && toast.error(error.message)}

      {isLoading && <Loader />}

      {loadImages && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}

      {loadMoreBtn && <Button onClick={onLoadMore}>Load more</Button>}

      {showModal && (
        <Modal onClose={toggleModal}>
          <LargeImg src={largeImageURL} alt={tags} />
        </Modal>
      )}

      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </Container>
  );
  // }
}
