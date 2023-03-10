import { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addCart } from "../store";
import Cart from "./Cart.js";

import "../App.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import styled from "styled-components";
import { setAutoFreeze } from "immer";

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;
function Detail(props) {
  let state = useSelector((state) => state);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [fade1, setFade1] = useState("");
  useEffect(() => {
    setFade1("end");
    return () => {
      setFade1("");
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSale(false);
    }, 2000);
  }, []);

  let [count, setCount] = useState(0);
  let [sale, setSale] = useState(true);
  let [수량, 수량입력] = useState("");
  let [탭, 탭변경] = useState(0);

  useEffect(() => {
    if (isNaN(수량) == true) {
      alert("숫자만 입력해주세요");
    }
  }, [수량]);

  let { id } = useParams();
  let serach_id = props.shoes.find(function (x) {
    return x.id == id;
  });

  useEffect(() => {
    let recentView = localStorage.getItem("watched");
    if (recentView == null) {
      recentView = [];
    } else {
      recentView = JSON.parse(recentView);
    }

    recentView.unshift(serach_id.id);
    recentView = new Set(recentView);
    recentView = [...recentView];
    localStorage.setItem("watched", JSON.stringify(recentView));
    console.log(recentView);
  }, []);

  let recentView = localStorage.getItem("watched");
  recentView = JSON.parse(recentView);

  return (
    <div className={"start " + fade1}>
      <div className="container">
        {sale == true ? (
          <div className="alert alert-warning">2초이내 구입시 할인</div>
        ) : null}

        {count}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          버튼
        </button>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                "http://codingapple1.github.io/shop/shoes" +
                (serach_id.id + 1) +
                ".jpg"
              }
              width="100%"
            />
          </div>
          <input
            onChange={(e) => {
              수량입력(e.target.value);
            }}
          />
          <div className="watchedItm">
            <p className="recentName">최근 본 상품</p>
            <div className="recentItm">
              {recentView &&
                recentView.map(function (a, i) {
                  return (
                    <>
                      <img
                        onClick={() => {
                          navigate("/detail/" + a);
                        }}
                        src={
                          "http://codingapple1.github.io/shop/shoes" +
                          (a + 1) +
                          ".jpg"
                        }
                        width="100%"
                      ></img>
                    </>
                  );
                })}
            </div>
          </div>
          수량 입력란
          <div className="col-md-6">
            <h4 className="pt-5">{serach_id.title}</h4>
            <p>{serach_id.content}</p>
            <p>{serach_id.price}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                let confirmItm = state.cart.findIndex(
                  (a) => a.id == serach_id.id
                );
                confirmItm == -1
                  ? dispatch(
                      addCart({
                        id: serach_id.id,
                        name: serach_id.title,
                        count: 1,
                      })
                    )
                  : dispatch(addItem(serach_id.id));
              }}
            >
              주문하기
            </button>
          </div>
        </div>
        <Nav.Link
          onClick={() => {
            navigate("/cart");
          }}
        >
          장바구니 가기
        </Nav.Link>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              eventKey="link0"
              onClick={() => {
                탭변경(0);
              }}
            >
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link1"
              onClick={() => {
                탭변경(1);
              }}
            >
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link2"
              onClick={() => {
                탭변경(2);
              }}
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Routes>
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <TabContent 탭={탭} shoes={props.shoes}></TabContent>
      </div>
    </div>
  );
}
function TabContent({ 탭, shoes }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [탭]);
  return (
    <div className={"start " + fade}>
      {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

export default Detail;
