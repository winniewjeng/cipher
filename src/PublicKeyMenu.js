import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const PublicKeyMenu = function () {
  return (
    <Menu>
      <Menu.Item>
        <Link to="/public/rsa">RSA</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/public/dsa">DSA</Link>
      </Menu.Item>
    </Menu>
  );
}

export default PublicKeyMenu;