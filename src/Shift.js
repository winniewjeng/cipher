import React from "react";
import Library from "./cipherLibrary";
import { Input, Button, Tooltip, Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const possibleChars =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Shift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      msg: "",
      encrypted: "",
      decrypted: "",
    };
  }

  handleUserKeyInput = (e) => {
    const str = e.target.value;
    if (Number(str)) {
      this.setState({ key: str });
    }
  };

  handleKeyGeneration = () => {
    const key = Library.generateNumberKey(3);
    this.setState((state) => {
      return { key: key };
    });
  };

  handleUserMessage = (v) => {
    const msg = v.target.value;
    this.setState({ msg: msg });
    this.setState({ encrypted: this.encrypt(msg, this.state.key) });
  };

  // can't handle regex
  encrypt(msg, key) {
    key %= possibleChars.length;
    return msg
      .split("")
      .map((x) => {
        if (possibleChars.search(x) === -1) {
          return x;
        } else if (possibleChars[possibleChars.search(x) + key]) {
          return possibleChars[possibleChars.search(x) + key];
        } else if (possibleChars.search(x) + key >= 0) {
          return possibleChars[
            key - (possibleChars.length - possibleChars.search(x))
          ];
        }
        // decryption case:
        return possibleChars[
          key + (possibleChars.length - possibleChars.search(x))
        ];
      })
      .join("");
  }

  decrypt(msg, key) {
    return this.encrypt(msg, -key);
  }

  render() {
    const encrypted = this.encrypt(this.state.msg, this.state.key);
    const decrypted = this.decrypt(this.state.encrypted, this.state.key);

    return (
      <div className="shift-cipher-content">
        <Row>
          Key
          <Tooltip placement="topLeft" title="key must be a positive integer">
            <InfoCircleOutlined />
          </Tooltip>
        </Row>
        <Row justify={"space-between"} gutter={[16, 8]}>
          <Col flex={"1 1 auto"}>
            <Input
              placeholder="key"
              value={this.state.key ? this.state.key : ""}
              onChange={(e) => this.handleUserKeyInput(e)}
            ></Input>
          </Col>
          <Col flex={"0 1 0"}>
            <Button
              type="primary"
              onClick={this.handleKeyGeneration.bind(this)}
            >
              Generate Random Key
            </Button>
          </Col>
          <Col flex={"0 1 0"}>
            <Button
              onClick={() =>
                this.setState({ msg: "", encrypted: "", decrypted: "" })
              }
            >
              Clear Message
            </Button>
          </Col>
        </Row>
        <Row> Message </Row>
        <Row>
          <TextArea
            rows={2}
            placeholder="message"
            value={this.state.msg}
            onChange={(e) => this.handleUserMessage(e)}
          />
        </Row>
        <Row>Cryptomessage</Row>
        <Row>
          <TextArea
            rows={2}
            placeholder="encrypted message"
            value={encrypted}
          />
        </Row>
        <Row>Decryption</Row>
        <Row>
          <TextArea
            rows={2}
            placeholder="decrypted message"
            value={decrypted}
          />
        </Row>
      </div>
    );
  }
}

export default Shift;
