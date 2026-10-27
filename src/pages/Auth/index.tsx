import { useState } from 'react';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, Link, useLocation, useModel } from '@umijs/max';
import { Alert, Button, Form, Input, Tabs } from 'antd';

import { login, register } from '@/services/auth';

import styles from './index.less';

interface AuthValues {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export default function AuthPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === '/register' ? 'register' : 'login',
  );
  const [registered, setRegistered] = useState(false);
  const isRegister = activeTab === 'register';
  const { setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (values: AuthValues) => {
    setError('');
    setLoading(true);
    try {
      const result = isRegister
        ? await register({
            name: values.name!.trim(),
            email: values.email.trim(),
            password: values.password,
          })
        : await login({
            email: values.email.trim(),
            password: values.password,
          });
      if (!result.success) {
        setError(result.errorMessage || '操作失败，请重试');
        return;
      }
      if (isRegister) {
        setRegistered(true);
        setActiveTab('login');
        history.replace('/login');
      } else if (result.user) {
        await setInitialState({ currentUser: result.user });
        history.push('/home');
      } else {
        setError('登录响应缺少用户信息，请重试。');
      }
    } catch {
      setError('暂时无法连接服务，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.story} aria-label="平台介绍">
        <Link to="/home" className={styles.brand}>
          <span className={styles.brandMark}>E</span>
          <span>
            Enterprise<span className={styles.brandLight}> / Admin</span>
          </span>
        </Link>
        <div className={styles.storyContent}>
          <div className={styles.eyebrow}>
            <span /> YOUR WORKSPACE, SIMPLIFIED
          </div>
          <h1>
            让每一次协作，
            <br />
            <em>都更进一步。</em>
          </h1>
          <p>一个清晰、高效的工作空间，帮助团队专注于真正重要的事。</p>
          <div className={styles.visual} aria-hidden="true">
            <div className={styles.visualTop}>
              <span>WORKSPACE OVERVIEW</span>
              <span>● ● ●</span>
            </div>
            <div className={styles.visualBody}>
              <div className={styles.visualIcon}>
                <SafetyCertificateOutlined />
              </div>
              <div>
                <strong>一切井然有序</strong>
                <small>为团队的每一步提供支持</small>
              </div>
              <CheckCircleOutlined className={styles.visualCheck} />
            </div>
            <div className={styles.visualLines}>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className={styles.storyFooter}>
          为更好的工作方式而构建 <span>© {new Date().getFullYear()} Enterprise Admin</span>
        </div>
      </section>
      <section className={styles.formSide}>
        <div className={styles.mobileBrand}>
          <span className={styles.brandMark}>E</span> Enterprise / Admin
        </div>
        <div className={styles.formWrap}>
          <div className={styles.formHeading}>
            <div className={styles.kicker}>WELCOME {isRegister ? 'ABOARD' : 'BACK'}</div>
            <h2>{isRegister ? '创建你的账号' : '欢迎回来'}</h2>
            <p>
              {isRegister ? '填写以下信息，开始使用工作空间。' : '登录你的账号，继续今天的工作。'}
            </p>
          </div>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              setError('');
              setRegistered(false);
              if (location.pathname !== '/login') {
                history.replace('/login');
              }
            }}
            items={['login', 'register'].map((key) => ({
              key,
              label: key === 'login' ? '登录' : '注册',
              disabled: loading,
              children:
                key === activeTab ? (
                  <>
                    {registered && !isRegister && (
                      <Alert
                        type="success"
                        showIcon
                        title="注册成功，请使用新账号登录。"
                        className={styles.notice}
                      />
                    )}
                    {error && (
                      <Alert type="error" showIcon title={error} className={styles.notice} />
                    )}
                    <Form<AuthValues>
                      key={isRegister ? 'register' : 'login'}
                      layout="vertical"
                      requiredMark={false}
                      onFinish={submit}
                      size="large"
                    >
                      {isRegister && (
                        <Form.Item
                          name="name"
                          label="姓名"
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: '请输入姓名',
                            },
                            { max: 50, message: '姓名不能超过 50 个字符' },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="请输入姓名"
                            autoComplete="name"
                          />
                        </Form.Item>
                      )}
                      <Form.Item
                        name="email"
                        label="邮箱"
                        normalize={(value: string) => value?.trim()}
                        rules={[
                          { required: true, message: '请输入邮箱' },
                          { type: 'email', message: '请输入有效的邮箱地址' },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="name@company.com"
                          autoComplete="email"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                          { required: true, message: '请输入密码' },
                          ...(isRegister ? [{ min: 8, message: '密码至少需要 8 个字符' }] : []),
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder={isRegister ? '至少 8 个字符' : '请输入密码'}
                          autoComplete={isRegister ? 'new-password' : 'current-password'}
                        />
                      </Form.Item>
                      {isRegister && (
                        <Form.Item
                          name="confirmPassword"
                          label="确认密码"
                          dependencies={['password']}
                          rules={[
                            { required: true, message: '请再次输入密码' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                return !value || getFieldValue('password') === value
                                  ? Promise.resolve()
                                  : Promise.reject(new Error('两次输入的密码不一致'));
                              },
                            }),
                          ]}
                        >
                          <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="请再次输入密码"
                            autoComplete="new-password"
                          />
                        </Form.Item>
                      )}
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        className={styles.submit}
                      >
                        {isRegister ? '创建账号' : '登录工作空间'} <ArrowRightOutlined />
                      </Button>
                    </Form>
                  </>
                ) : null,
            }))}
          />
          <div className={styles.demo}>
            <SafetyCertificateOutlined /> 测试账号 admin@example.com / admin123
            <br />
            测试账号与会话在开发服务器重启后重置。
          </div>
          <Link to="/home" className={styles.back}>
            <ArrowLeftOutlined /> 返回首页
          </Link>
        </div>
        <div className={styles.formFooter}>
          ENTERPRISE ADMIN <span>·</span> WORK BETTER TOGETHER
        </div>
      </section>
    </main>
  );
}
