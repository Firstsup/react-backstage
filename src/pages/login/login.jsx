import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './login.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

export default class Login extends Component {
    render() {
        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to='/'/>
        }
        const onFinish = async (values) => {
            const {username, password} = values
            const result = await reqLogin(username, password)
            if (result.status === 0) {
                message.success('success')
                const user = result.data
                memoryUtils.user = user
                storageUtils.saveUser(user)
                this.props.history.replace('/admin')
            } else {
                message.error(result.msg)
            }
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '请输入用户名',
                                }, {
                                    min: 4,
                                    message: '用户名必须大于4位',
                                }, {
                                    max: 12,
                                    message: '用户名必须小于12位'
                                }, {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: '用户名必须是英文、数字或下划线'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                                {
                                    min: 4,
                                    message: '密码长度必须大于4位',
                                }, {
                                    max: 12,
                                    message: '密码长度必须小于12位',
                                }, {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: '密码必须是英文、数字或下划线',
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}