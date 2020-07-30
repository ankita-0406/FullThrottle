import React from "react";
import data from "../data.json";
import Detail from "./detail";
import Style from "../component/style/style.css";
import { ListGroup } from "react-bootstrap";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      index: "",
      item: [],
    };
  }
  onDetail(item) {
    this.setState({
      flag: true,
      item: item,
      //item:item
    });
  }
  render() {
    return (
      <div>
        {this.state.flag == true && (
          <div>
            <Detail
              show={this.state.flag}
              setModal={() => this.setState({ flag: false })}
              item={this.state.item}
            />
          </div>
        )}
        {data.map((item, index) => (
          <div className="detail">
            <ListGroup>
              <ListGroup.Item onClick={() => this.onDetail(item)}>
                {item.real_name}
              </ListGroup.Item>
            </ListGroup>
          </div>
        ))}
      </div>
    );
  }
}

export default User;
