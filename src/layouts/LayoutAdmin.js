import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import "./LayoutAdmin.scss";
import Signin from "../pages/Admin/Signin";
import { getAccessToken } from "../api/auth";
export default function LayoutAdmin(props) {
  console.log(props);
  const { Header, Content, Footer } = Layout;
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const user = null;
  const token = getAccessToken();
  if (!user) {
    return (
      <>
        <Route path="/admin/sign" component={Signin} />;
        <Redirect to="/admin/sign" />
      </>
    );
  }
  return (
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed} />
      <Layout
        className="layout-admin"
        style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
      >
        <Header className="layout-admin__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          ></MenuTop>
        </Header>
        <Content className="layout-admin__content">
          <LoadRouter routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">Daniel Tendero García</Footer>
      </Layout>
    </Layout>
  );
}
function LoadRouter({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
