import s from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={s.loaderWrap}>
      <div className={s.loader}></div>
      <span className={s.message}>Loading...</span>
    </div>
  );
};
export default Loader;
