/* global BigInt */
import React from 'react';
import { Layout, Dropdown, Row, Col, Button } from 'antd';
import PublicKeyMenu from './PublicKeyMenu';
import PrivateKeyMenu from './PrivateKeyMenu';
import './App.css';
import RSA from './RSALibrary.js';
import { Route, Link } from "react-router-dom";
import CipherPage from './CipherPage';
const { Header, Footer } = Layout;

const year = new Date().getFullYear();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      type: null,
    }
  }

  render() {

    console.log(BigInt(RSA.generatePublicKey(1000)));
    console.log(RSA.encrypt("abcdefg", BigInt(175)));

    return (
      <Layout>
        <Header>
          <Row gutter={[20, 12]}>
            <div className="title" >
              Cryptosystems
            </div>
            <Col>
              <Dropdown overlay={PrivateKeyMenu} >
                <Link to="/private">
                  <Button className="dropdown-button">Private Key Encryption</Button>
                </Link>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown overlay={PublicKeyMenu} >
                <Link to="/public">
                  <Button className="dropdown-button">Public Key Encryption</Button>
                </Link>
              </Dropdown>
            </Col>
          </Row>
        </Header>

        <Route exact path="/private/">
          <CipherPage keyType="private" ></CipherPage>
        </Route>
        <Route path="/private/shift">
          <CipherPage keyType="private" cipherType="shift" />
        </Route>
        <Route path="/private/transposition">
          <CipherPage keyType="private" cipherType="transposition" />
        </Route>
        <Route path="/private/column">
          <CipherPage keyType="private" cipherType="column" />
        </Route>
        <Route exact path="/public/">
          <CipherPage keyType="public"></CipherPage>
        </Route>
        <Route path="/public/rsa">
          <CipherPage keyType="public" cipherType="rsa"></CipherPage>
        </Route>
        <Route path="/public/dsa">
          <CipherPage keyType="public" cipherType="dsa"></CipherPage>
        </Route>

        <Footer style={{ textAlign: "center" }}> Winnie Jeng {year} </Footer>
      </Layout>
    );
  }
}

export default App;
