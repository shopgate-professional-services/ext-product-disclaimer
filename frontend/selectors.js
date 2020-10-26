import { createSelector } from 'reselect';
import { getProductDataById } from '@shopgate/engage/product';
import { triggerProperty } from './config';

const { name, value } = triggerProperty;

/**
 * @returns {null|Object[]}
 */
export const isShownForProduct = createSelector(
  getProductDataById,
  (product) => {
    if (!name || !product) {
      return false;
    }

    const { additionalProperties } = product || {};
    if (!additionalProperties) {
      return false;
    }

    const prop = additionalProperties.find(p => p.label === name);

    return prop && prop.value === value;
  }
);
