import React, { useState } from "react";
import { Popover } from "antd";

import "./style.scss";

type PopoverComponentPropsType = {
    description: string,
    title: string
}

const PopoverComponent: React.FC<PopoverComponentPropsType> = ({ description, title }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Popover
          title={ title }
          trigger="click"
          visible={ isVisible }
          onVisibleChange={ visible => setIsVisible(visible) }
          className="popover"
          content={
              <div>
                  <p>{ description }</p>
                  <p
                      onClick={ () => setIsVisible(false) }
                      className="popover__close-btn"
                  >
                      Close
                  </p>
              </div>
          }
      >
          <span className="popover__read-more">Read more</span>
      </Popover>
    )
};

export default PopoverComponent;