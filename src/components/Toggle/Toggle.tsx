import React, { FC, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useSwitch } from '@react-aria/switch';
import { useToggleState } from '@react-stately/toggle';
import { useFocusRing } from '@react-aria/focus';

import { STYLE } from './Toggle.constants';
import { Props } from './Toggle.types';
import './Toggle.style.scss';

/**
 * The Toggle component. Also known as Switch.
 */
const Toggle = (props: Props, providedRef: RefObject<HTMLInputElement>) => {
  const { id, className, style, isDisabled } = props;

  const internalRef = React.useRef<HTMLInputElement>();
  const ref = providedRef || internalRef;

  const state = useToggleState(props);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-disabled={!!isDisabled}
      data-selected={state.isSelected}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div
        className={classnames(STYLE.toggle, {
          [STYLE.on]: state.isSelected,
          [STYLE.off]: !state.isSelected,
          [STYLE.disabled]: isDisabled,
          [STYLE.focused]: isFocusVisible,
        })}
      />
    </label>
  );
};

const ToggleWithRef = forwardRef(Toggle) as FC<Props>;
ToggleWithRef.displayName = 'Toggle';

export default ToggleWithRef;
