import React from "react";
import { Button, Icon, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { History } from "history";

import "./style.scss";

 const Page404: React.FC = (): JSX.Element => {
    const history: History = useHistory();

    return (
        <div className="container page-404">
          <Typography.Title type="warning" >Page 404</Typography.Title>
            <Button.Group>
                <Button type="primary" onClick={ (): void => history.goBack() }>
                    <Icon type="left" />
                    Go back
                </Button>
            </Button.Group>
        </div>
    )
};

export default Page404;


