//@ts-check
import React, { Component } from "react";
import styled from "styled-components";
import { ONE, DUPLICATE, MISSING } from "../data/const";

const bgColorChooser = status => {
  if (status === ONE) return "green";
  else if (status === DUPLICATE) return "black";
  else if (status === MISSING) return "#444";
};

const Sticker = styled.div`
  display: grid;
  border-radius: 5px;
  padding: 20px;
  margin: 2px;
  border: 1px solid #fff;
  text-align: center;
  font-size: 1.2em;
  cursor: pointer;
  /* background-color: #444;*/
  color: #fff;
  //@ts-ignore
  background-color: ${props => bgColorChooser(props.status)};
`;

export default class StickerItem extends Component {
  render() {
    return (
      <Sticker
        key={this.props.object.id}
        id={this.props.object.id}
        //@ts-ignore
        status={this.props.object.status}
        onClick={() =>
          this.props.updateStateParent(
            this.props.object.id,
            this.props.object.status
          )
        }
      >
        {this.props.object.id}
      </Sticker>
    );
  }
}
