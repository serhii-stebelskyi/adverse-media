import classNames from "classnames";
import s from "./Button.module.scss";

const Button = ({ className, children, ...props }) => {
  return (
    <button className={classNames(s.button, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
