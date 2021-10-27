import s from "./CompanyDetails.module.scss";
import { ReactComponent as Back } from "icons/back.svg";
import PropTypes from "prop-types";
import classNames from "classnames";

const CompanyDetails = ({
  data,
  handleGoBack,
  handleChangeLink,
  className,
}) => {
  return (
    <div className={classNames(s.companyDetails, className)}>
      <Back className={s.backBtn} onClick={handleGoBack} />
      <h2 className={s.title}>{data.title}</h2>
      <div className={s.inlineWrap}>
        {!data.media?.length && (
          <span className={s.message}>
            No Adverse Media has been identified.
          </span>
        )}
        {data.media?.length > 0 && (
          <ul className={s.links}>
            {data.media.map((media, index) => (
              <li className={s.link} key={index}>
                Adverse Media -{" "}
                <span
                  className={s.title}
                  onClick={() => handleChangeLink(index)}
                >
                  {media.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
CompanyDetails.propTypes = {
  data: PropTypes.object,
  handleGoBack: PropTypes.func,
  handleChangeLink: PropTypes.func,
};
CompanyDetails.defaultProps = {
  data: {},
  handleGoBack: () => {},
  handleChangeLink: () => {},
};

export default CompanyDetails;
