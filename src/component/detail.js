import React from "react";
import { Button, Modal } from "react-bootstrap";
import Calendar from "react-calendar";
import data from "../data.json";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      presentDate: null,
      presentMonth: null,
      presentYear: null,
      index: null,
    };
  }

  componentDidMount = () => {
    const date = new Date();
    this.setState(
      {
        presentDate: date.getDate(),
        presentMonth: date.getMonth(),
        presentYear: date.getFullYear(),
      },
      () => {
        this.ifExist();
      }
    );
  };

  ifExist = () => {
    let index = null;
    this.props.item["activity_periods"].forEach((x, i) => {
      let sub = x["start_time"].slice(0, 11);
      let date = new Date(sub);
      let newDate = date.getDate();
      let newMonth = date.getMonth();
      let newYear = date.getFullYear();
      if (
        newDate === this.state.presentDate &&
        newMonth === this.state.presentMonth &&
        newYear === this.state.presentYear
      ) {
        index = i;
        return;
      }
    });
    this.setState({
      index: index,
    });
  };
  onCalender(e) {
    let index = null;
    this.props.item["activity_periods"].forEach((x, i) => {
      let sub = x["start_time"].slice(0, 11);
      let date = new Date(sub);
      let newDate = date.getDate();
      let newMonth = date.getMonth();
      let newYear = date.getFullYear();
      let enteredDate = e.getDate();
      let enteredMonth = e.getMonth();
      let enteredYear = e.getFullYear();
      if (
        newDate === enteredDate &&
        newMonth === enteredMonth &&
        newYear === enteredYear
      ) {
        index = i;
        return;
      }
    });
    this.setState({
      index: index,
    });
  }

  handleClose = () => {
    this.props.setModal(false);
  };
  render() {
    return (
      <div>
        {data.map((item, index) => (
          <div>
            <Modal show={this.props.show} onHide={() => this.handleClose()}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.item.real_name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{ display: "flex" }}>
                  {this.state.index != null && (
                    <div>
                      <p>
                        <label style={{ color: "blue" }}> Start Time : </label>{" "}
                        {
                          this.props.item["activity_periods"][this.state.index][
                            "start_time"
                          ]
                        }
                      </p>
                      <p>
                        <label style={{ color: "blue" }}> End Time : </label>{" "}
                        {
                          this.props.item["activity_periods"][this.state.index][
                            "end_time"
                          ]
                        }
                      </p>
                    </div>
                  )}
                  {this.state.index == null && (
                    <div>
                      <p>
                        <label>No activity done that day</label>
                      </p>
                    </div>
                  )}

                  <div>
                    {" "}
                    <label
                      style={{ width: "50%", height: "50%", float: "right" }}
                    >
                      <Calendar onChange={(e) => this.onCalender(e)} />
                    </label>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => this.handleClose()}
                  style={{ marginRight: "6rem" }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>
    );
  }
}

export default Detail;
