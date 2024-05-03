import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag as unactiveFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlag as activeFlag } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { FieldValues } from "react-hook-form";

const FlagButton = forwardRef(({ ...props }: FieldValues) => {
  const { name, onBlur, onChange, value } = props;
  const isFlagged = value === true;

  const handleButton = () => {
    onChange(!value);
  };

  return (
    <Button
      onClick={handleButton}
      {...props}
    >
      <FontAwesomeIcon icon={isFlagged ? activeFlag : unactiveFlag} />
    </Button>
  )
});

FlagButton.displayName = 'FlagButton';

export default FlagButton;