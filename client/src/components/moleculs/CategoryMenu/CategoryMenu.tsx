import React from "react";
import { Menu, Button, Switch } from "antd";
import cn from "classnames";

import Icons from "../../../utils/icons";

import { ClickParam, SetStateType } from "../../../typescript/common";
import "./style.scss";

type CategoryMenuPropsType = {
    onClick: (e: ClickParam) => void,
    onChange: () => void,
    collapsed: boolean,
    setCollapsed: SetStateType<boolean>,
    isVisible: boolean
}

const CategoryMenu: React.FC<CategoryMenuPropsType> = (
    { 
        onClick, 
        onChange, 
        collapsed,
        setCollapsed,
        isVisible 
    }) => (
    <div className="category-menu-container" >
        <Switch
            className="category-menu-container__switch"
            checkedChildren={ <Icons.CheckOutlined /> }
            unCheckedChildren={ <Icons.CloseOutlined /> }
            onChange={ onChange }

        />
        <div className={ cn("category-menu", { "category-menu--show": isVisible }) } >
            <Button
                type="primary"
                onClick={ () => setCollapsed(!collapsed) }
                className="category-menu__btn"
            >
                { collapsed
                    ? <Icons.MenuUnfoldOutlined />
                    : <Icons.MenuFoldOutlined />
                }
            </Button>
            <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={ collapsed }
                onClick={ onClick }
            >
                <Menu.SubMenu
                    key="Characteristics"
                    title={
                        <span>
                            <Icons.PieChartOutlined  />
                             <span>Characteristics</span>
                        </span>
                    }
                >
                    <Menu.Item key="Popular">
                        <Icons.LikeOutlined />
                        <span>Popular</span>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="Categories"
                    title={
                        <span>
                            <Icons.UnorderedListOutlined  />
                             <span>Categories</span>
                        </span>
                    }
                >
                    <Menu.Item key="Film & Animation">
                        <Icons.EyeOutlined />
                        <span>Film & Animation</span>
                    </Menu.Item>
                    <Menu.Item key="Autos & Vehicles">
                        <Icons.CarOutlined />
                        <span>Autos & Vehicles</span>
                    </Menu.Item>
                    <Menu.Item key="Music">
                        <Icons.CustomerServiceOutlined />
                        <span>Music</span>
                    </Menu.Item>
                    <Menu.Item key="Pets & Animals">
                        <Icons.YuqueOutlined />
                        <span>Pets & Animals</span>
                    </Menu.Item>
                    <Menu.Item key="Sports">
                        <Icons.RiseOutlined />
                        <span>Sports</span>
                    </Menu.Item>
                    <Menu.Item key="Scientific">
                        <Icons.ExperimentOutlined />
                        <span>Scientific</span>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    </div>
);

export default CategoryMenu;
