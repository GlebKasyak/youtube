import React, { useState } from "react";
import { Drawer, Typography } from "antd";
import Icons from "./../../../utils/icons";

import MessageForm from "./MessageForm";
import ErrorMessage from "../../atoms/ErrorMessage/ErrorMessage"
import SuccessMessage from "../../atoms/SuccessMessage/SuccessMessage"

import "./style.scss";

const Message: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    return (
      <div className="message">
       <div className="icon-wrapper" onClick={ () => setVisible(true) } >
         <Icons.MailOutlined />
       </div>
        <Drawer
            className="message-drawer"
            title={ <Typography.Title level={4} >Send us a message</Typography.Title> }
            width={450}
            onClose={ onClose }
            visible={ visible }
         >
        { successMessage &&
            <SuccessMessage text={ successMessage } />
        }
        { errorMessage &&
            <ErrorMessage
                text={ errorMessage }
                style={{ position: "relative" }}
            />
        }
         <MessageForm
             setErrorMessage={ setErrorMessage }
             setSuccessMessage={ setSuccessMessage }
         />
        </Drawer>
      </div>
    );
};

export default Message;

