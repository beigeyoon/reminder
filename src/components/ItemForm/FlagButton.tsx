import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag as unactiveFlag } from "@fortawesome/free-regular-svg-icons";
import { faFlag as activeFlag } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

interface IFlagButton {
  isActive: boolean;
}

const FlagButton = ({ isActive }: IFlagButton) => {
  return (
    <Button>
      <FontAwesomeIcon icon={isActive ? activeFlag : unactiveFlag} />
    </Button>
  )
}

export default FlagButton;