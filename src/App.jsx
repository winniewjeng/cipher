import React from 'react';
import Encryption from './encryption';
import { Layout, Menu, Breadcrumb, Input, Button, Tooltip, Row, Col, Divider, Space } from 'antd';
import Library from './cipherLibrary';
import Form from 'antd/lib/form/Form';

const { Header, Content, Footer } = Layout;
const { TextArea, Search } = Input;

function checkStringUniqueness(str) {
  let set = new Set();
  for(let i = 0; i < str.length; ++i) {
    if(set.has(str[i])) {
      return false
    }
    set.add(str[i]);
  }
  return true;
}

function checkStringCharBound(str) {
  const possibleKeyChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(let i = 0; i < str.length; ++i) {
    if(!possibleKeyChars.includes(str[i])) {
      return false;
    }
  }
  return true;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
    }
  }

  handleUserKeyInput = (e) => {
    const str = e.target.value;
    // check if e.target.value has dup char and if e.target.value is within valid bound
    // and update this.setState
    if(checkStringUniqueness(str) && checkStringCharBound(str)) {
      this.setState( {key: str} ); 
    }
    // if reqs aren't met, then don't update key
  }

  handleKeyGeneration = () => {
    const key = Library.generateKey(5, 10);
    this.setState((state) => {
      return { key: key }
    });
  }

  render() {
    console.log(this.state.key);
    return (
      <Layout>
        <Header style={{ backgroundColor: "#fcba03" }}></Header>
        <Content style={{ backgroundColor: "#ffe8e8", padding: "20px" }}>
          <Row>
            Key
          </Row>
          <Row justify={'space-between'} gutter={[16, 8]}>
            <Col flex={'1 1 auto'}>
              <Input
                placeholder="key"
                value = { this.state.key ? this.state.key : "" }
                onChange={(e) => this.handleUserKeyInput(e) }
              ></Input>
            </Col>
            <Col flex={'0 1 0'}>
              <Button 
                type="primary"
                onClick={ this.handleKeyGeneration.bind(this) }
              >Generate Random Key</Button>
            </Col>
          </Row>
          <Row>
            Message
          </Row>
          <Row>
            <TextArea rows={2} placeholder="message" />
          </Row>
          <Row>
            Cryptomessage
          </Row>
          <Row>
            <TextArea rows={2} placeholder="" />
          </Row>


        </Content>
        <Footer style={{ textAlign: "center" }}> Winnie Jeng © 2020 </Footer>
      </Layout>
    );
  }
}

export default App;
