import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const PrivateKeyMenu = function () {
  return (
    <Menu>
      <Menu.Item>
        <Link to="/private/shift">Shift Cipher</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/private/transposition">Transposition Cipher</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/private/column">Column Cipher</Link>
      </Menu.Item>
    </Menu>
  );
};

export default PrivateKeyMenu;