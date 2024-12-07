import { useState } from "react";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [search, setSearch] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return toast.error("Please enter a search query!");
    }
    onSubmit(search);
  };
  return (
    <header className={css.header}>
      <form onSubmit={submitHandler} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
