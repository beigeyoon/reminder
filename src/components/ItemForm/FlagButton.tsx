import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag as unactiveFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlag as activeFlag } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";

const FlagButton = ({ ...props }: FieldValues) => {
  const { name, onBlur, onChange, value } = props;
  const isFlagged = value === true;

  const handleButton = () => {
    onChange(!value);
  };

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
};



export default FlagButton;