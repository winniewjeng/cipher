/* global BigInt */
import React from "react";
import { Layout, Dropdown, Row, Col, Button } from "antd";
import PublicKeyMenu from "./PublicKeyMenu";
import PrivateKeyMenu from "./PrivateKeyMenu";
import "./App.css";
import RSA from "./RSALibrary.js"; // move to CipherPage later
import { Route, Link } from "react-router-dom";
import CipherPage from "./CipherPage";
import { ConsoleSqlOutlined } from "@ant-design/icons";
// import Shift from "./Shift.js"; // move to CipherPage later
const { Header, Footer } = Layout;

const year = new Date().getFullYear();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      type: null,
    };
  }

  render() {
    // let N = BigInt(14); // ex: 57, 14
    // let filtered = RSA.findViableFactorPairs(N).filter((pair) =>
    //   RSA.areCoprime(pair[0], pair[1])
    // );
    // // console.log(RSA.areCoprime(20n, 30n), " not coprime");
    // if (filtered.length === 0) {
    //   console.log("filtered is an empty array. Everything henceforth is wrong");
    // } else {
    //   console.log("filtered is not an empty array, Print filter:");
    //   console.log(filtered); // list all the vialble factored pairs
    //   let t = RSA.totient(filtered[0][0], filtered[0][1]);
    //   console.log(N + " is N and " + t + " is totient");
    //   // console.log(t + " is totient"); // find totient
    //   let e = RSA.pickEncryptionKey(t, N);
    //   console.log(e + " is e");
    //   console.log(Number(RSA.pickDecryptionKey(e, t)), "is d");
    // }

    return (
      <Layout>
        <Header>
          <Row gutter={[20, 12]}>
            <div className="title">Cryptosystems</div>
            <Col>
              <Dropdown overlay={PrivateKeyMenu}>
                <Link to="/private">
                  <Button className="dropdown-button">
                    Private Key Encryption
                  </Button>
                </Link>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown overlay={PublicKeyMenu}>
                <Link to="/public">
                  <Button className="dropdown-button">
                    Public Key Encryption
                  </Button>
                </Link>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Route exact path="/private/">
          <CipherPage keyType="private"></CipherPage>
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
        {/* delete later */}
        {/* <Shift></Shift>; */}
        <Footer style={{ textAlign: "center" }}> Winnie Jeng {year} </Footer>
      </Layout>
    );
  }
}

export default App;
