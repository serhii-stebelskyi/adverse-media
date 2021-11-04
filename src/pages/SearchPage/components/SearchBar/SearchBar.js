import { useState, useRef, useEffect } from "react";
import SearchField from "components/SearchField/SearchField";
import s from "./SearchBar.module.scss";
import { ReactComponent as Search } from "icons/search.svg";
import classNames from "classnames";
import axios from "helpers/axios";
import PropTypes from "prop-types";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useDebounce } from "hooks/useDebounce";
import Loader from "components/Loader/Loader";

const SearchBar = ({ handleSelect, currentCompany }) => {
  const [searchedCompanies, setSearchedCompanies] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [visibleSearchedList, setVisibleSearchedList] = useState(false);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchBarRef = useRef(null);

  useOnClickOutside(searchBarRef, () => setVisibleSearchedList(false));
  const debouncedSearchTerm = useDebounce(searchVal, 1000);
  useEffect(() => {
    axios.get("/companies-count").then((res) => {
      setCompaniesCount(res.data.count);
    });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchLoading(true);
      setVisibleSearchedList(true);
      axios
        .get(`search`, {
          params: {
            query: String(debouncedSearchTerm),
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
  }, [debouncedSearchTerm]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);
    setVisibleSearchedList(false);
  };
  const visibleSearchedResult = searchVal && visibleSearchedList;
  return (
    <div className={s.searchBar} ref={searchBarRef}>
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
      {visibleSearchedResult && (
        <div className={s.searchedResult}>
          {searchedCompanies.length > 0 && !searchLoading && (
            <ul className={s.searchedCompanies}>
              {searchedCompanies.map((company, index) => (
                <li
                  className={classNames(s.company, {
                    [s.active]: currentCompany?.id === company.id,
                  })}
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
  currentCompany: PropTypes.object,
};
SearchBar.defaultProps = {
  handleSelect: () => {},
  currentCompany: {},
};

export default SearchBar;
