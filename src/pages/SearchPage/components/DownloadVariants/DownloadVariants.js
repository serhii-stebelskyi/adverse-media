import s from './DownloadVariants.module.scss'
import { ReactComponent as CSV } from 'icons/csv.svg'
import { ReactComponent as Excel } from 'icons/excel.svg'
import PropTypes from 'prop-types'

const DownloadVariants = ({ handleSelect }) => {
  return (
    <ul className={s.variants}>
      <li className={s.variant} onClick={() => handleSelect('xlsx')}>
        <Excel className={s.icon} />
        <span className={s.label}>Export to Excel format</span>
      </li>
      <li className={s.variant} onClick={() => handleSelect('csv')}>
        <CSV className={s.icon} />
        <span className={s.label}>Export to CSV format</span>
      </li>
    </ul>
  )
}
DownloadVariants.propTypes = {
  handleSelect: PropTypes.func
}
DownloadVariants.defaultProps = {
  handleSelect: () => {}
}

export default DownloadVariants
