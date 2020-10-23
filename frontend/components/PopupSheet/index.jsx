import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';

const styles = {
  card: css({
    position: 'relative',
    width: '100%',
    background: themeConfig.colors.light,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${themeConfig.colors.shade7}`,
    borderRadius: '5px',
  }),
  notch: css({
    position: 'absolute',
    overflow: 'hidden',
    top: '50%',
    transform: 'translate3d(-6px, -50%, 0)',
    width: 14,
    height: 24,
    background: themeConfig.colors.light,
    borderRadius: '0 50% 50% 0',
    display: 'flex',
    justifyContent: 'flex-end',
    borderLeft: '5px solid white',
  }),
  notchee: css({
    position: 'absolute',
    width: 16,
    height: 24,
    border: '1px solid rgba(0, 0, 0, 0.10)',
    borderRadius: '0 50% 50% 0',
    boxShadow: 'inset -3px 4px 4px rgba(0, 0, 0, 0.05)',
  }),
};

/**
 * @returns {JSX}
 */
const Card = ({ children, className, notch }) => (
  <div className={`${styles.card} ${className}`}>
    {notch && (
      <div className={styles.notch}>
        <div className={styles.notchee} />
      </div>
    )}
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  notch: PropTypes.bool,
};

Card.defaultProps = {
  className: null,
  notch: false,
};

export default Card;
