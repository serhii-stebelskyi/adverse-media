import { useState } from "react";
import s from "./PasswordField.module.scss";
import styles from "../Field/Field.module.scss";
import classNames from "classnames";

const PasswordField = ({ className, error, label, ...props }) => {
  const [visible, setVisible] = useState(false);
  return (
    <label
      className={classNames(
        s.fieldWrap,
        styles.fieldWrap,
        { [styles.error]: error },
        className
      )}
    >
      <span className={styles.label} data-type="label">
        {label}
      </span>
      <div className={s.inputWrap}>
        <input
          className={styles.field}
          {...props}
          type={visible ? "text" : "password"}
        />
        <svg
          width="40"
          height="37"
          viewBox="0 0 40 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.eye}
          onClick={() => setVisible((visible) => !visible)}
        >
          <path
            d="M37 18C37 18 29.1923 29 19.5 29C9.80769 29 2 18 2 18C2 18 9.80769 7 19.5 7C29.1923 7 37 18 37 18Z"
            stroke="#666666"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5 24C22.5376 24 25 21.5376 25 18.5C25 15.4624 22.5376 13 19.5 13C16.4624 13 14 15.4624 14 18.5C14 21.5376 16.4624 24 19.5 24Z"
            stroke="#666666"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {visible && (
            <path
              d="M32 5L6 31"
              stroke="#666666"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
};

export default PasswordField;
