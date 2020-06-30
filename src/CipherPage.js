import React from 'react';
import { Layout, Breadcrumb, Row } from 'antd';
import CC from './CC.js';

const { Content } = Layout;

const keys = {
  private: 'Private Key Encryption',
  public: 'Public Key Encryption'
}

const types = {
  column: 'Column Cipher',
  shift: 'Shift Cipher',
  transposition: 'Transposition Cipher',
  rsa: 'RSA',
  dsa: 'DSA',
}


function translateKeyToName(key) {
  return keys[key];
}

function translateTypeToName(type) {
  return types[type];
}

function getCipherPage(type) {
  switch (type) {
    case 'column':
      return <CC />;
    default:
      return null;
  }
}

function CipherPage({ keyType = "", cipherType = "" }) {
  return (
    <Content>
      <Row className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            {translateKeyToName(keyType)}
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {translateTypeToName(cipherType)}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div className="main-content">
        {getCipherPage(cipherType)}
      </div>
    </Content>);
}
export default CipherPage;