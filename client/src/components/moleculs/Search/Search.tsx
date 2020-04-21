import React from "react";
import { Input, Button, Tooltip, Col } from "antd";

import "./style.scss";

import { Handlers } from "../../../typescript/common";

type SearchPropsType = {
    onSubmit: Handlers.SubmitType,
    value: string,
    onChange: Handlers.ChangeType,
    prevValue: string
};

const Search: React.FC<SearchPropsType> = ({ onSubmit, value, onChange, prevValue }) => (
    <Col className="search" xl={8} xs={12} >
        <form onSubmit={ onSubmit } className="search__form" >
            <Input
                value={ value }
                className="search__input"
                placeholder="Enter your request"
                onChange={ onChange }

            />
            <Tooltip title="Search">
                <Button
                    htmlType="submit"
                    className="search__btn"
                    icon="search"
                    type="primary"
                    disabled={!value || prevValue === value}
                />
            </Tooltip>
        </form>
    </Col>
);

export default Search;
