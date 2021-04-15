import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils"
import {Layout} from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

const {Footer, Sider, Content} = Layout;
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider><LeftNav></LeftNav></Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'white'}}>Content</Content>
                    <Footer style={{textAlign: 'center', color: '#ccc'}}>Ess'tedd, esse creasa</Footer>
                </Layout>
            </Layout>
        )
    }
}