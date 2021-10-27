import s from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={s.notFoundPage}>
      <div className={s.content}>
        <span className={s.title}>-ERROR-</span>
        <span className={s.statusCode}>404</span>
        <span className={s.message}>Page not found</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
