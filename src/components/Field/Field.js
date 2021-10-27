import s from "./Field.module.scss";
import classNames from "classnames";

const Field = ({ className, label, error, ...props }) => {
  return (
    <label
      className={classNames(s.fieldWrap, className, {
        [s.error]: Boolean(error),
      })}
    >
      <span className={s.label} data-type="label">
        {label}
      </span>
      <input className={s.field} {...props} />
      {error && <span className={s.errorMessage}>{error}</span>}
    </label>
  );
};

export default Field;
