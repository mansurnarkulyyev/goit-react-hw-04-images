// import { Component } from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdImageSearch } from 'react-icons/md';
import {
  SearchHeader,
  SearchForm,
  SearchFormInput,
  SearchButton,
} from './SearchBar.styled';

// export class SearchBar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func,
//   };

//   state = {
//     query: '',
//   };

export function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  // handleChange = e => {
  //   this.setState({ query: e.currentTarget.value });
  // };
  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.warn('Please specify your query!');
      return;
    }
    // this.props.onSubmit(this.state.query);
    onSubmit(query);
    // this.reset();
    reset();
  };

  const reset = () => {
    // this.setState({ query: '' });
    setQuery('');
  };

  // render() {
  // const { query } = this.state;

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <MdImageSearch style={{ width: 30, height: 30 }} />
        </SearchButton>

        <SearchFormInput
          type="text"
          name="query"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
  // }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};