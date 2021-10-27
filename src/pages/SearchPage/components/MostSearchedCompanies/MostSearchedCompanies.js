import s from "./MostSearchedCompanies.module.scss";
import PropTypes from "prop-types";
import Loader from "components/Loader/Loader";

const MostSearchedCompanies = ({ data, loading, handleSelect }) => {
  return (
    <div className={s.mostSearchedWrap}>
      <h1 className={s.title}>Most searched companies</h1>
      {loading && (
        <div className={s.loaderWrap}>
          <Loader />
        </div>
      )}
      {!loading && data.length > 0 && (
        <ul className={s.companiesList}>
          {data.map((company, index) => (
            <li
              className={s.company}
              key={index}
              onClick={() => handleSelect(company)}
            >
              {company.title}
            </li>
          ))}
        </ul>
      )}
      {!loading && !data.length && (
        <span className={s.message}>Companies not found</span>
      )}
    </div>
  );
};

MostSearchedCompanies.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};
MostSearchedCompanies.defaultProps = {
  data: [],
  loading: false,
};

export default MostSearchedCompanies;
