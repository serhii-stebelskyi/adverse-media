import s from "./SearchField.module.scss";
import styles from "../Field/Field.module.scss";
import classNames from "classnames";
import { ReactComponent as Search } from "icons/search.svg";

const SearchField = ({ className, ...props }) => {
  return (
    <div className={classNames(styles.fieldWrap, s.fieldWrap, className)}>
      <input
        className={classNames(styles.field, s.field)}
        type="email"
        {...props}
      />
      <Search className={s.searchBtn} />
    </div>
  );
};

export default SearchField;
