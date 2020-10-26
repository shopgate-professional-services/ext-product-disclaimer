import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import {
  Grid, SheetDrawer, RippleButton, HtmlSanitizer,
} from '@shopgate/engage/components';
import { withCurrentProduct } from '@shopgate/engage/core';
import { themeConfig } from '@shopgate/engage';
import {
  content, header, buttons, styles as configStyles,
} from '../../config';
import cache from '../../cache';
import { isShownForProduct as isShownForProductSelector } from '../../selectors';

const styles = {
  sheet: css({
    height: 'calc(100vh - var(--safe-area-inset-top))',
    minHeight: 'calc(100vh - var(--safe-area-inset-top))',
    maxHeight: 'calc(100vh - var(--safe-area-inset-top))',
  }).toString(),
  grid: css({
    flexDirection: 'column',
    height: '100%',
  }).toString(),
  header: css({
    fontWeight: 500,
    padding: '0.5rem 1rem',
    boxShadow: '0px 0.5rem 0.5rem rgba(0, 0, 0, 0.12)',
  }, configStyles.header).toString(),
  content: css({
    padding: '1.5rem 1rem 1rem',
    overflowY: 'scroll',
  }, configStyles.content).toString(),
  buttons: css({
    padding: '0 1rem',
    marginTop: '1rem',
  }, configStyles.buttons).toString(),
  button: css({
    '&&': {
      width: '100%',
      marginBottom: '0.25rem',
      textTransform: 'none',
      fontSize: '0.85rem',
      fontWeight: 'normal',
      color: themeConfig.colors.ctaContrast,
      background: themeConfig.colors.cta,
    },
  }, configStyles.button).toString(),
  buttonRippleClassName: css({
    padding: '0 0.25rem',
  }, configStyles.button).toString(),
};

/**
 * @return {React.Element}
 */
const PopupContent = ({ isShownForProduct, productId }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (content && !cache.hasValidItem(productId) && isShownForProduct) {
      setTimeout(() => setVisible(true), 750);
    }
  }, [productId, isShownForProduct]);
  useEffect(() => {
    if (visible) {
      cache.setItem(productId);
    }
  }, [visible, productId]);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <SheetDrawer
      isOpen
      className={styles.sheet}
      contentClassName={styles.sheet}
    >
      <Grid className={styles.grid}>
        {header && (
          <Grid.Item shrink={0} className={styles.header}>
            {header}
          </Grid.Item>
        )}
        <Grid.Item grow={1} className={styles.content}>
          <HtmlSanitizer>
            {content}
          </HtmlSanitizer>
        </Grid.Item>
        <Grid.Item shrink={0} className={styles.buttons}>
          {buttons && !!buttons.length && buttons.map(button => (
            <RippleButton
              type="secondary"
              className={styles.button}
              rippleClassName={styles.buttonRippleClassName}
              key={button.label}
              onClick={close}
            >
              {button.label}
            </RippleButton>
          ))}
        </Grid.Item>
      </Grid>
    </SheetDrawer>
  );
};

PopupContent.propTypes = {
  isShownForProduct: PropTypes.bool,
  productId: PropTypes.string,
};

PopupContent.defaultProps = {
  isShownForProduct: false,
  productId: null,
};

/**
 * @param {Object} state .
 * @param {string} productId .
 * @return {{isShownForProduct: any}}
 */
const connector = connect((state, { productId }) => ({
  isShownForProduct: isShownForProductSelector(state, { productId }),
}));

export default withCurrentProduct(connector(PopupContent));
