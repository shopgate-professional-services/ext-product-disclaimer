import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import {
  Grid, SheetDrawer, RippleButton, HtmlSanitizer,
} from '@shopgate/engage/components';
import { withCurrentProduct } from '@shopgate/engage/core';
import {
  content, header, buttons, styles as configStyles,
} from '../../config';
import cache from '../../cache';
import { isShownForProduct as isShownForProductSelector } from '../../selectors';

const styles = {
  grid: css({
    flexDirection: 'column',
    height: 'calc(100vh - 56px - var(--safe-area-inset-top))',
  }).toString(),
  content: css({
    padding: '1rem',
    overflowY: 'scroll',
  }, configStyles.content).toString(),
  buttons: css({
    marginTop: '1rem',
  }).toString(),
  button: css({
    '&&': {
      width: '100%',
      marginBottom: '0.25rem',
      textTransform: 'none',
      fontWeight: 'normal',
    },
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
    <SheetDrawer title={header} isOpen onClose={close}>
      <Grid className={styles.grid}>
        <Grid.Item grow={1} className={styles.content}>
          <HtmlSanitizer>
            {content}
          </HtmlSanitizer>
        </Grid.Item>
        <Grid.Item shrink={0} className={styles.buttons}>
          {buttons && !!buttons.length && buttons.map(button => (
            <RippleButton
              type="primary"
              className={styles.button}
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
