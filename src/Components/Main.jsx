import {
  Button,
  Card,
  FormElement,
  Grid,
  Modal,
  PageHeader,
  TextField,
} from "@cedcommerce/ounce-ui";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Main = () => {
    // For grid columns data
  const columnsData = [
    {
      align: "center",
      dataIndex: "id",
      key: "id",
      title: "Id",
      width: 100,
    },
    {
      align: "center",
      dataIndex: "name",
      key: "name",
      title: "Name",
      width: 100,
    },
    {
      align: "center",
      dataIndex: "email",
      key: "email",
      title: "Email",
      width: 100,
    },
    {
      align: "center",
      dataIndex: "body",
      key: "body",
      title: "Body",
      width: 100,
    },
  ];

  const [state, setState] = useState({
    username: "",
    password: "",
    login: false,
    data: [],
    auth:{username:'admin@gmail.com',password:'admin@123'}
  });

// modal toggler and toggle details holder state   
  const [toggle, setToggle] = useState({ toggle: false, details: {} });

//   login details verifier
  const Submitted = () => {
    if (state.username === state.auth.username && state.password === state.auth.password) {
      state.username = "";
      state.password = "";
      state.login = true;
      setState({ ...state});
    } else {
      alert("Please Fill Correct Details...!");
    }
  };

//   to fetch data from json placeholder by under useEffect hook
  const myFetch = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((res) =>
        setState({
          ...state,
          data: res.data.map((x) => {
            return { id: x.id, name: x.name, email: x.email, body: x.body };
          }),
        })
      );
  };

//   use effect to deal with sideEfects 
  useEffect(() => {
    myFetch()
  }, []);

// render when user already loggedIn
  if (state.login) {
    return (
      <>
        <Card>
          <PageHeader
            action={
              <Button
                onClick={() => setState({
                  ...state,
                  username: "",
                  password: "",
                  login: false
                })}
                type="TextButton"
              >
                Log Out
              </Button>
            }
            title="Ounce Header & Grid"
          />
        </Card>
        <Grid
          extraClass="myTable"
          columns={[
            ...columnsData,
            {
              align: "center",
              fixed: "right",
              key: "operation",
              render: function noRefCheck(obj) {
                return (
                  <Button
                    onClick={() => {
                      setToggle({ ...toggle, toggle: true, details: obj });
                    }}
                  >
                    View
                  </Button>
                );
              },
              title: "Action",
              width: 100,
            },
          ]}
          dataSource={state.data}
        />

        <Card>
          <Modal
            close={() => setToggle({ toggle: false, details: {} })}
            open={toggle.toggle}
            heading="Modal with Primary Action"
            modalSize="large"
          >
            <Grid
              extraClass="myTable"
              columns={[...columnsData]}
              dataSource={[toggle.details]}
            />
          </Modal>
        </Card>
      </>
    );
  }

//    render for login page
  return (
    <>
      <Card title="Login Form" extraClass="login">
        <FormElement   >
          <TextField
            name="Username"
            onChange={(val) => setState({ ...state, username: val })}
            placeHolder="Enter Username"
            value={state.username}
          />
          <TextField
            name="Password"
            onChange={(val) => setState({ ...state, password: val })}
            strength
            type="password"
            placeHolder="*********"
            value={state.password}
          />
          <Button onClick={(val) => setState({ ...state, password: "" })}>
            Clear Password Value
          </Button>
          <p>NOTE: Email: {state.auth.username} & Password: {state.auth.password}</p>
          <Button  onClick={Submitted}>LogIn</Button>
        </FormElement>
      </Card>
    </>
  );
};

export default Main;
