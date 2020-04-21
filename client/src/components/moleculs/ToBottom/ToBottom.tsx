import React, { useEffect, useState, RefObject } from "react";
import { Button } from "antd";
import cn from "classnames";

import { useHideComponent } from "../../../hooks";
import "./style.scss";

type ToBottomPropsType = {
  bottom: RefObject<HTMLDivElement>
}

const ToBottom: React.FC<ToBottomPropsType> = ({ bottom }) => {
  const hidden = useHideComponent();
  const [isVisible, seIsVisible] = useState(false);
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => setScroll(window.scrollY);

  useEffect(() => {
    const { scrollHeight, offsetHeight } = document.body;

    if(0 === Math.floor(scroll)) {
      seIsVisible(true);
    } else if((scrollHeight - offsetHeight - 600) < scroll) {
      seIsVisible(false);
    } else {
      seIsVisible(true);
    }

    window.addEventListener("scroll", handleScroll);

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
      seIsVisible(false);
    }

  }, [scroll]);

  return (
      <Button
          onClick={ () => {
            bottom!.current!.scrollIntoView({ behavior : "smooth" });
            seIsVisible(false);
          }}
          shape="circle"
          icon="vertical-align-bottom"
          className={ cn("to-bottom", {
            "to-bottom--visible": isVisible,
            "to-bottom--hidden": hidden
          }) }
      />
  )
};

export default ToBottom;
