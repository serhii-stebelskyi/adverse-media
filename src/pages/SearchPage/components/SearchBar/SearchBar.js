import { useState, useRef, useEffect } from "react";
import SearchField from "components/SearchField/SearchField";
import s from "./SearchBar.module.scss";
import { ReactComponent as Search } from "icons/search.svg";
import classNames from "classnames";
import axios from "helpers/axios";
import PropTypes from "prop-types";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import Loader from "components/Loader/Loader";

const SearchBar = ({ handleSelect }) => {
  const [searchedCompanies, setSearchedCompanies] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [visibleSearchedList, setVisibleSearchedList] = useState(false);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchBarRef = useRef(null);

  useOnClickOutside(searchBarRef, () => setVisibleSearchedList(false));

  useEffect(() => {
    axios.get("/companies-count").then((res) => {
      setCompaniesCount(res.data.count);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);
    setVisibleSearchedList(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchVal.length > 0) {
      setSearchLoading(true);
      setVisibleSearchedList(true);
      axios
        .get(`search`, {
          params: {
            query: String(searchVal),
          },
        })
        .then((res) => {
          if (res?.data) {
            setSearchedCompanies(res.data);
          } else if (searchedCompanies.length > 0) {
            setSearchedCompanies([]);
          }
          setSearchLoading(false);
        })
        .catch(() => {
          setSearchLoading(false);
        });
    }
  };
  const visibleSearchedResult = searchVal && visibleSearchedList;
  return (
    <div className={s.searchBar} ref={searchBarRef}>
      <form onSubmit={handleSearch} noValidate autoComplete="off">
        <SearchField
          placeholder={`Search ${String(companiesCount).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )} companies...`}
          value={searchVal}
          onChange={handleChange}
          className={classNames(s.searchField, {
            [s.active]: visibleSearchedResult,
          })}
          onFocus={() => setVisibleSearchedList(true)}
        />
      </form>
      {visibleSearchedResult && (
        <div className={s.searchedResult}>
          {searchedCompanies.length > 0 && !searchLoading && (
            <ul className={s.searchedCompanies}>
              {searchedCompanies.map((company, index) => (
                <li
                  className={s.company}
                  onClick={() => handleSelect(company)}
                  key={index}
                >
                  <Search className={s.icon} />
                  <span className={s.title}>{company.title}</span>
                </li>
              ))}
            </ul>
          )}
          {searchLoading && (
            <div className={s.loaderWrap}>
              <Loader />
            </div>
          )}
          {!searchLoading && !searchedCompanies.length && (
            <span className={s.message}>Companies not found</span>
          )}
        </div>
      )}
    </div>
  );
};
SearchBar.propTypes = {
  handleSelect: PropTypes.func,
};
SearchBar.defaultProps = {
  handleSelect: () => {},
};

export default SearchBar;
