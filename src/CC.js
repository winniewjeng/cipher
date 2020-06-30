import React from 'react';
import Library from './cipherLibrary';
import {Input, Button, Tooltip, Row, Col} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function checkStringUniqueness(str) {
    let set = new Set();
    for (let i = 0; i < str.length; ++i) {
        if (set.has(str[i])) {
            return false
        }
        set.add(str[i]);
    }
    return true;
}

function checkStringCharBound(str) {
    const possibleKeyChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < str.length; ++i) {
        if (!possibleKeyChars.includes(str[i])) {
            return false;
        }
    }
    return true;
}

class CC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "",
            msg: "",
            encrypted: "",
        }
    }

    handleUserKeyInput = (e) => {
        const str = e.target.value;
        // check if e.target.value has dup char and if e.target.value is within valid bound
        // then update this.setState. If reqs aren't met, then don't update key
        if (checkStringUniqueness(str) && checkStringCharBound(str)) {
            this.setState({ key: str });
        }
    }

    handleKeyGeneration = () => {
        const key = Library.generateKey(5, 10);
        this.setState((state) => {
            return { key: key }
        });
    }

    handleUserMessage = (v) => {
        const msg = v.target.value;
        // setState msg 
        this.setState({ msg: msg });
    }



    render() {
        // console.log(window.location);
        // const url = "www.google.com";
        const encrypted = Library.encrypt(this.state.msg, this.state.key);
        return (
            <div className="CC-content">
                <Row>Key
            <Tooltip placement="topLeft" title="key must be a unique combination of alphanumeric characters"><InfoCircleOutlined /></Tooltip>
                </Row>
                <Row justify={'space-between'} gutter={[16, 8]}>
                    <Col flex={'1 1 auto'}>
                        <Input
                            placeholder="key"
                            value={this.state.key ? this.state.key : ""}
                            onChange={(e) => this.handleUserKeyInput(e)}>
                        </Input>
                    </Col>
                    <Col flex={'0 1 0'}>
                        <Button
                            type="primary"
                            onClick={this.handleKeyGeneration.bind(this)}>
                            Generate Random Key
                </Button>
                    </Col>
                    <Col flex={'0 1 0'}>
                        <Button
                            onClick={() => this.setState({ msg: "" })}>
                            Clear Message
                </Button>
                    </Col>
                </Row>
                <Row> Message </Row>
                <Row>
                    <TextArea
                        rows={2} placeholder="message"
                        value={this.state.msg ? this.state.msg : ""}
                        onChange={(e) => this.handleUserMessage(e)} />
                </Row>
                <Row>
                    Cryptomessage
        </Row>
                <Row>
                    <TextArea rows={2}
                        placeholder="encrypted message"
                        value={encrypted ? encrypted : ""} />
                </Row>
            </div>
        );
    }
}
export default CC;
