import React, { useEffect, useState, useCallback } from 'react';
import { css } from 'glamor';
import {
  Grid, SheetDrawer, RippleButton, HtmlSanitizer,
} from '@shopgate/engage/components';
import { useCurrentProduct } from '@shopgate/engage/core';
import {
  content, header, buttons, styles as configStyles,
} from '../../config';
import cache from '../../cache';

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
const PopupContent = () => {
  const { productId } = useCurrentProduct();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (content && !cache.hasValidItem(productId)) {
      setTimeout(() => setVisible(true), 750);
    }
  }, [productId]);
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
          {buttons.map(button => (
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

export default PopupContent;
