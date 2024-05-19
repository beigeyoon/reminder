import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag as unactiveFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlag as activeFlag } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";

const FlagButton = forwardRef(({ ...props }: FieldValues) => {
  const { name, onBlur, onChange, value, isActive } = props;
  const isFlagged = value === true;

  const handleButton = () => {
    onChange(!value);
  };

  if (!isActive) return <></>;
  return (
    <Button
      onClick={handleButton}
      className='h-[28px] leading-[22px] px-[8px] py-[3px]'
      {...props}
    >
      <FontAwesomeIcon
        icon={isFlagged ? activeFlag : unactiveFlag}
        color={isFlagged ? 'orange' : 'unset'}
      />
    </Button>
  )
});

FlagButton.displayName = 'FlagButton';

export default FlagButton;